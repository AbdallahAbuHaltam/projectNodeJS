/* eslint-disable prefer-object-spread */
const Tour=require("../models/tourModel");

// const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkBody=(req,res,next)=>{
    if(!req.body.name||!req.body.price){
        return res.status(404).json({
            status:'fail',
            message:"Name and price are missing."
        });
    }
    next();
};

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
exports.createNewTour=(req,res)=>{
    res.status(201).json({
        status: 'success',
        // results:tours.length,
        // data:{
        //     tour:newTour
        // }
    });
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

