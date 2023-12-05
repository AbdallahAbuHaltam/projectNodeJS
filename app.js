const fs=require('fs');
const express =require('express');
const morgan=require('morgan');

//1 Middleware
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use((req,res,next)=>{
    console.log('Hellp from the Middleware');
    next();
});
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
});


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
const updateTour=(req,res)=>{
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
const deleteTour=(req,res)=>{
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

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));



// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createNewTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);
app.route('/api/v1/tours').get(getAllTours).post(createNewTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);


//Server listen
const port=3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}....`);
});