const fs=require('fs');
const express =require('express');



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