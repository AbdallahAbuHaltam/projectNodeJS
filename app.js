const fs=require('fs');
const express =require('express');


//2 Route Handlers
const getAllTours=(req,res)=>{
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
const getTour=(req,res)=>{
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
const createNewTour=(req,res)=>{
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


// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createNewTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

//Server listen
const port=3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}....`);
});