const express = require('express');
const bodyParser = require('body-parser')
const User = require('./models/Users');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/user', async (_req, res) => {
  const users = await User.getUsers();

  res.status(200).json(users);
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.getUser(id);

  if (!user) return res.status(404).json({ message: 'User not found'});

  res.status(200).json(user);
});

app.put('/user/:id', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { id } = req.params;

  const exists = await User.userExists(id);

  if (!exists) return res.status(404).json({ message: 'User not found' });

  const { message } = User.validateUserUpdate(firstName, lastName, email, password);

  if (message) return res.status(400).json({ message })

  await User.updateUser(firstName, lastName, email, password, id);

  const updatedUser = await User.getUser(id);

  res.status(200).json(updatedUser);
})

app.post('/user', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
  
  if (User.isInvalid(firstName, lastName, email, password).error) {
    const { field } = User.isInvalid(firstName, lastName, email, password);
		return res.status(400).json({ error: true, message: `O campo ${field} é obrigatório` });
	}

  if (!User.hasMinCharPassword(password))
    return res.status(400).json({ error: true, message: "O campo 'password' deve ter pelo menos 6 caracteres" })

	const [user] = await User.create(firstName, lastName, email, password);

	res.status(201).json({ id: user.id, firstName, lastName, email });
});

app.listen(PORT, () => {
	console.log(`Ouvindo a porta ${PORT}`);
});