const calc = require('./calculator');

const genNum = () => Math.floor(Math.random() * 10 + 1);

async function calcRandomNumbers() {
  try {
    const response = await calc(genNum(), genNum(), genNum());
    console.log(response);
  } catch (err) {
    console.log(err.message)
  }
}

calcRandomNumbers();
// calc(genNum(), genNum(), genNum())
//     .then((promise) => console.log(promise))
//     .catch((err) => console.log(err.message));