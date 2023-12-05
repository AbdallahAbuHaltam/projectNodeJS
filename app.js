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