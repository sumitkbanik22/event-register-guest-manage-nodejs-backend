const env = require('dotenv').config().parsed;
const mongoose = require("mongoose");

const username = env.DB_USERNAME;
const password = env.DB_PASSWORD;
const cluster = env.DB_CLUSTER;
const dbname = env.DB_NAME;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log("Database connected!"))
.catch(err => console.log(err));;

mongoose.Promise = global.Promise;

module.exports =  mongoose;