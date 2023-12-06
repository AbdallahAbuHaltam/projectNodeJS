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

const getAllUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
       });
    };
const createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
       });
};
const getUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
       });
};
const updateUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
       });
};
const deleteUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
       });
};

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//3 Route
const tourRouter=express.Router();
const userRouter=express.Router();


tourRouter.route('/').get(getAllTours).post(createNewTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

//Server listen
const port=3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}....`);
});
