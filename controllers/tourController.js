/* eslint-disable prefer-object-spread */
const Tour=require("../models/tourModel");

// const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.getAllTours=(req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt:req.requestTime,
        // results:tours.length,
        // data:{
        //     tours
        // }
        
    });
};
exports.getTour=(req,res)=>{
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
        })
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
exports.updateTour=(req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tour:'Updated tour'
        }
    });
};
exports.deleteTour=(req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tour:'Updated tour'
        }
    });
};

