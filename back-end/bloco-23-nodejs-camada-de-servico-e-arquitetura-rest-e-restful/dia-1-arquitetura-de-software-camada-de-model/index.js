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

// app.get('/user/:id', async () => {

// });

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