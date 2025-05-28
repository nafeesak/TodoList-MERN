require('dotenv').config();
const express=require('express')
const cors=require('cors')//for allowing cross-origin request from React app
const {sequelize}=require('./models')
const todoRouter=require('./routes/todos')

const app=express();
const PORT=process.env.PORT||5000;

//Middleware

app.use(cors()) //allow all CORS for development
app.use(express.json())//Body parser for JSON request

//Routes
app.use('/api/todos',todoRouter)

sequelize.sync({force:false})
.then(()=>{
    console.log("Database Synced")
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})
.catch(err=>{
    console.error('Error syning databse',err)
})