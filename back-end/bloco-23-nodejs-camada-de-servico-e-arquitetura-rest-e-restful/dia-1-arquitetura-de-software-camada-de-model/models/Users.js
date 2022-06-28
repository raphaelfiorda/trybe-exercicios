const connection = require('./connection');

// Refatorar: usar switch(true)
const isInvalid = (firstName, lastName, email, password) => {
  if (!firstName || typeof firstName !== 'string') return { error: true, field: 'firstname'};
  if (!lastName || typeof lastName !== 'string') return { error: true, field: 'lastName'};
  if (!email || typeof email !== 'string') return { error: true, field: 'email'};
  if (!password || typeof password !== 'string') return { error: true, field: 'password'};

  return false;
}

const hasMinCharPassword = (password) => {
  if (password.length < 6) return false;
  return true;
}

const getUsers = async () => {
  const [users] = await connection.execute(
    'SELECT * FROM users'
  )

  return users;
};

const create = async (firstName, lastName, email, password) => connection.execute(
  'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
  [firstName, lastName, email, password]
)

module.exports = {
  create,
  isInvalid,
  hasMinCharPassword,
  getUsers
}