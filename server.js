const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');


// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
