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
router.post('/register', async (req, res, next) => {
    const { name, pwd } = req.body;
  
    if (!name || !pwd) {
      return res.status(400).json({ message: 'Nome e senha são campos obrigatórios.' });
    }
  
    try {
      const newUser = new User({ name, pwd });
      const savedUser = await newUser.save();
      console.log(`Usuário ${name} salvo com sucesso.`);
      return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário.' });
    }
});
  

module.exports = router