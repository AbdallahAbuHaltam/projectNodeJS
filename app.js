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
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            users
        }
        
    });
}
const createUser=(req,res)=>{
    const newID=users[users.length-1].id+1;
    const newUser=Object.assign({
        id:newID},
        req.body);
    users.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`,JSON.stringify(users),err=>{
        res.status(201).json({
            status: 'success',
            results:users.length,
            data:{
                user:newUser
            }
        });
    });
};
const getUser=(req,res)=>{
    const id=+req.params.id;
    const user=users.find(el=>el.id===id);
    if(id>users.length){
        return res.status(404).json({
            status:'fail',
            message:`User with ID ${id} not found.`
        });
    }

    res.status(200).json({
        status: 'success',
        // results:tours.length,
        // data:{
        //     tours
        // }
        data:{
            user
        }
    });
};
const updateUser=(req,res)=>{
    const id=+req.params.id;
    if(id>users.length){
        return res.status(404).json({
            status:'fail',
            message:`User with ID ${id} not found.`
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            user:'Updated user'
        }
    });
};
const deleteUser=(req,res)=>{
    const id=+req.params.id;
    if(id>users.length){
        return res.status(404).json({
            status:'fail',
            message:`User with ID ${id} not found.`
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            user:'Deleted user'
        }
    });
};

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const users=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));


// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createNewTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);
//3 Route
app.route('/api/v1/tours').get(getAllTours).post(createNewTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);


//Server listen
const port=3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}....`);
});
