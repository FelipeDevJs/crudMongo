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

  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    res.json({ message: 'Usuário deletado com sucesso.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Ocorreu um erro ao deletar o usuário.' })
  }
})

//update user
router.post('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, pwd } = req.body;

    // Verificar se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualizar o usuário
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { name, pwd } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});


//list one user
router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});


//registre user
router.post('/register', async (req,res,next)=>{
    const {name, pwd} = req.body

    const newuser = await new User({
        name, pwd
    })
    try{
        const usernew = await newuser.save()
        console.log('user '+name+ ' salvo com sucesso')
        res.status(200).send('Cadastrado com sucesso')
    }catch(error){
        console.error(error)
        res.status(500).send('Erro ao realizar o cadastro')
    }
})

module.exports = router
