const express=require('express')
const router=express.Router();
const {Todo}=require('../models');

//GET all todos
router.get('/', async (req,res)  =>{
try {
    const todos=await Todo.findAll();
    res.json(todos);
} catch (error) {
    res.status(500).json({error:error.message})
}
})

//GET a single todo by ID
router.get('/:id', async (req,res)  =>{
try {
    const todo=await Todo.findByPk(req.params.id);
    if(todo){
        res.json(todo);
    }else{
        res.status(404).json({message:'Todo not found'})
    }
    
} catch (error) {
    res.status(500).json({error:error.message})
}
})

//CREATE a new todo
router.post('/', async (req,res)  =>{
try {
    const {title,description}= req.body;
    if(!title){
        return res.status(400).json({message:'Title is required'});
    }
    const newTodo=await Todo.create({title,description});
    res.status(201).json(newTodo)
} catch (error) {
    res.status(500).json({error:error.message})
}
})
//UPDATE a todo

router.put('/:id', async (req,res)  =>{
try {
    const {title,description,completed}= req.body;
    const todo=await Todo.findByPk(req.params.id);
    if(todo){
        todo.title=title||todo.title;
        todo.description=description||todo.description;
        todo.completed=typeof completed==='boolean'?completed:todo.completed;//Handle boolean explicity
        await todo.save();
        res.json(todo);
    }else{
        res.status(404).json({message:'Todo not found'})
    }
    if(!title){
        return res.status(400).json({message:'Title is required'});
    }
    const newTodo=await Todo.create({title,description});
    res.status(201).json(newTodo)
} catch (error) {
    res.status(500).json({error:error.message})
}
})

//DELETE a todo
router.delete('/:id', async (req,res)  =>{
try {
    const todo=await Todo.findByPk(req.params.id);
    if(todo){
        await todo.destroy()
        res.status(204).send()//No content
    }else{
        res.status(404).json({message:'Todo not found'})
    }
    
} catch (error) {
    res.status(500).json({error:error.message})
}
})
module.exports=router;

