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

const isEmptyOrInvalid = (data, field) => {
  try {
    if (data === undefined) return { message: `'${field}' is required` };
    if (data === '') return { message: `'${field}' is not allowed to be empty` };
  } catch(err) {
    return err.message;
  }
}

const isEmailInvalid = (email) => {
  const validFormat = /\S+@\S+\.\S+/;
  if (!email.match(validFormat)) return true;

  return false;
}

const validateUserUpdate = (firstName, lastName, email, password) => {
  switch(true) {
    case (!firstName || firstName === ''): return isEmptyOrInvalid(firstName, 'firstName');
    case (!lastName || lastName === ''): return isEmptyOrInvalid(lastName, 'lastName');
    case (!email || email === ''): return isEmptyOrInvalid(email, 'email');
    case (isEmailInvalid(email)): return { message: "'email' must be a valid email" };
    case (!password || password === ''): return isEmptyOrInvalid(password, 'password');
    case (!hasMinCharPassword(password)): return { message: "'password' length must be at least 6 characters long" }
    default: return {}
  }
}

const updateUser = async (firstName, lastName, email, password, id) => {
  const [{ affectedRows }] = await connection.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE users.id = ?',
    [firstName, lastName, email, password, id]
  );

  return affectedRows;
}

const userExists = async (id) => {
  const [[exists]] = await connection.query(
    'SELECT 1 FROM users WHERE id = ?', 
    [id]
  )

  return !!exists;
}

const getUsers = async () => {
  const [users] = await connection.execute(
    'SELECT * FROM users'
  )

  return users;
};

const getUser = async (id) => {
  const [[user]] = await connection.execute(
    'SELECT * FROM users WHERE users.id = ?',
    [id]
  )
  return user;
}

const create = async (firstName, lastName, email, password) => connection.execute(
  'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
  [firstName, lastName, email, password]
)

module.exports = {
  create,
  validateUserUpdate,
  isInvalid,
  userExists,
  hasMinCharPassword,
  updateUser,
  getUser,
  getUsers
}