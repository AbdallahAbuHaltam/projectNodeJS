const fs=require('fs');

const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours=(req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
        
    });
};
exports.getTour=(req,res)=>{
    const id=+req.params.id;
    const tour=tours.find(el=>el.id===id);
    if(id>tours.length){
        return res.status(404).json({
            status:'fail',
            message:`Tour with ID ${id} not found.`
        });
    }

    res.status(200).json({
        status: 'success',
        // results:tours.length,
        // data:{
        //     tours
        // }
        data:{
            tour
        }
    });
};
exports.createNewTour=(req,res)=>{
    const newID=tours[tours.length-1].id+1;
    const newTour=Object.assign({
        id:newID},
        req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status: 'success',
            results:tours.length,
            data:{
                tour:newTour
            }
        });
    });
};
exports.updateTour=(req,res)=>{
    const id=+req.params.id;
    if(id>tours.length){
        return res.status(404).json({
            status:'fail',
            message:`Tour with ID ${id} not found.`
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'Updated tour'
        }
    });
};
exports.deleteTour=(req,res)=>{
    const id=+req.params.id;
    if(id>tours.length){
        return res.status(404).json({
            status:'fail',
            message:`Tour with ID ${id} not found.`
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'Updated tour'
        }
    });
};
