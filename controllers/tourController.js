/* eslint-disable prefer-object-spread */
const Tour=require("../models/tourModel");
const APIFeatures= require("../utils/apiFeatures")

// const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.aliasTopTours=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,difficulty,price,ratingsAverage,summary';

    next();
};



exports.getAllTours= async (req,res)=>{
  try{
    // console.log(req.query);
    //EXCUTE QUERY
    const features = new APIFeatures(Tour.find(),req.query).sort().limit().pagination();
    const tours= await features.query;

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
                tour:tour
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

exports.getTourStats=async(req,res)=>{
    try{
        const stats = await Tour.aggregate([
            {
                $match:{ ratingsAverage:{$gte:4.5} },
            },
            {
                $group:{
                    _id:{$toUpper:'$difficulty'},
                    numTours:{$sum:1},
                    numRatings:{$sum:'$ratingsQuantity'},
                    avgRating:{$avg:'$ratingsAverage'},
                    avgPrice:{$avg:'$price'},
                    minPrice:{$min:'$price'},
                    maxPrice:{$max:'$price'},

                },
            },
            {
                $sort:{avgPrice:1}
            },
            // {
            //     $match:{
            //         _id:{$ne:'EASY'},
            //     }
            // }
        ]); 
        res.status(200).json({
            status: 'success',
            data:{
                stats
            }
            
        });

    }catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        });
    }

};

exports.getMonthlyPlan = async (req,res)=>{

    try{
        const year = +req.params.year;

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$month:'$startDates'},
                    numToursStarts:{$sum:1},
                    tours: {$push:'$name'}
                }
            },
            {
                $addFields:{
                    month:'$_id'
                }
            },
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort:{
                    numToursStarts:-1,
                }
            },
            // {
            //     $limit:6
            // }
        ]);
        res.status(200).json({
            status: 'success',
            data:{
                plan
            }
            
        });

    }catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        });
    }
}