const router = require('express').Router()

//model
const User = require('../model/user')

router.get('/',(req,res)=>{
    res.json('router 2.0')
})

//liste all users
router.get('/all', async (req,res)=>{
    const users = await User.find({})
    res.json(users)
})

//delete user
router.post('/delete/', async (req, res) => {
  const { id } = req.body;
  // Restante do código para lidar com o formulário enviado via POST
  
  // res.status(200).json({id})
  
  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    // res.json({ message: 'Usuário deletado com sucesso.' })
    return res.redirect(req.headers.referer || '/');
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Ocorreu um erro ao deletar o usuário.' })
  }
});


//update user
router.post('/update', async (req, res) => {
  const { id, name, pwd } = req.body;
  
  try {
    const user = await User.findByIdAndUpdate(id, { name, pwd });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.redirect(req.headers.referer || '/');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário.' });
  }
});


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
    return res.redirect(req.headers.referer || '/');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário.' });
  }
});

  

module.exports = router