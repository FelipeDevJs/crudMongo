const router = require('express').Router()

//model
const User = require('../model/user')

router.get('/',(req,res)=>{
    res.json('router')
})

//liste all users
router.get('/all', async (req,res)=>{
    const users = await User.find({})
    res.json(users)
})

//delete user
router.get('/delete/:id', async (req,res)=>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    res.json('user deletado')
})

//update user
router.post('/update/:id', async (req,res)=>{
    const id = req.params.id
    const {name, pwd} = req.body
    const user = await User.findByIdAndUpdate(id, {name, pwd})
    res.json(user)
})

//list one user
router.get('/user/:id', async (req,res)=>{
    const id = req.params.id
    const user = await User.findOne({id})
    res.json(user)
})

//registre user
router.post('/register', async (req,res,next)=>{
    const {name, pwd} = req.body

    const newuser = await new User({
        name, pwd
    })
    try{
        const usernew = await newuser.save()
        console.log('user '+name+ ' salvo com sucesso')
    }catch(error){
        console.error(error)
    }
})

module.exports = router