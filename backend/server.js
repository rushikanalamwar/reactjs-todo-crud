const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose=require('mongoose')
const todoRoutes = express.Router();
const PORT = 4000;
const mongo = require('mongodb')

let todo = require('./todo.model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos' , {useUnifiedTopology: true , useNewUrlParser: true} )
const connection = mongoose.connection;

connection.once('open' , function(){
    console.log('mongodb database connected rushikkkkaaaaaaa')
})

app.use('/todos', todoRoutes);


todoRoutes.route('/').get((req,res)=>{
    todo.find((err , todos)=>{
        if(err){
            console.log("errrooooorrrrrrrrrr")
        } else {
            res.json(todos)
        }
    })
})


todoRoutes.route('/:id').get((req,res)=>{
    let id = req.params.id;
    todo.findById(id , (err , todom)=>{
        res.json(todom);
    })
})


todoRoutes.route('/update/:id').post((req,res)=>{
    todo.findById(req.params.id , function(err, todo){
        if(!todo)
            res.status(404).send("no data found")
        else 
            todo.description= req.body.description;
            todo.responsible = req.body.responsible;
            todo.completed = req.body.completed;


            todo.save().then(todo => {
                res.json('todo updated successfully')
            })
            .catch(err =>{
                res.status(401).send("update failed")
            });
    });
});


todoRoutes.route('/delete/:id').post((req,res,next)=>{
    todo.findByIdAndRemove(req.params.id , (err , todo)=>{
        if (err) {
            return next(err);
          } else {
            res.status(200).json({
              msg: todo
            })
          }
    })
    
        
})


todoRoutes.route('/add').post((req,res)=>{
    let todonew = new todo(req.body);
    todonew.save()
        .then(todo =>{
            res.status(200).json({'todo': 'added'})
        })
        .catch(err =>{
            res.status(500).send('adding failed')
        });
});



app.listen(PORT , function(){
    console.log('server is started :' + PORT)
});