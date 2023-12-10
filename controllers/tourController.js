/* eslint-disable prefer-object-spread */
const Tour=require("../models/tourModel");

// const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.getAllTours= async (req,res)=>{
  try{
    //BUILD QUERY
    //1)Filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = {...req.query};
    const excludedFields = ['page','sort','limit','fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //2)Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);

    
    const query = Tour.find(JSON.parse(queryStr));
    //EXCUTE QUERY
    const tours= await query;

    // const query =  Tour.find()
    //     .where('duration')
    //     .equals(5)
    //     .where('difficulty')
    //     .equals('easy');
    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results:tours.length,
        data:{
            tours
        }
        
    });
  }catch(err){
    res.status(404).json({
        status:'fail',
        message:err
    });
  }
};
exports.getTour=async(req,res)=>{
    try{
        const tour=await Tour.findById(req.params.id);
        res.status(200).json({
            status:'succes',
            data:{
                tour
            }
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        });
    }
    // const id=+req.params.id;
    // const tour=tours.find(el=>el.id===id);
    // res.status(200).json({
    //     status: 'success',
    //     // results:tours.length,
    //     // data:{
    //     //     tours
    //     // }
    //     data:{
    //         tour
    //     }
    // });
};
exports.createNewTour= async (req,res)=>{
    try{
    // const newTour= new Tour({});
    // newTour.save();
    const newTour=await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
            data:{
             tour:newTour
            }
    });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message: 'INVALID DATA'
        });
    }
   
    // const newID=tours[tours.length-1].id+1;
    // const newTour=Object.assign({
    //     id:newID},
    //     req.body);
    // tours.push(newTour);
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    //     res.status(201).json({
    //         status: 'success',
    //         results:tours.length,
    //         data:{
    //             tour:newTour
    //         }
    //     });
    // });
};
exports.updateTour=async (req,res)=>{
    try{
        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message: 'INVALID DATA'
        });
    }
    
};
exports.deleteTour=async(req,res)=>{
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:'success',
            data:null
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message: 'INVALID DATA'
        });
    }
    
};

