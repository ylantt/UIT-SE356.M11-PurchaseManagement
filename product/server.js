const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cluster = require('cluster')
const app = require('./app')

const numCPUs = require('os').cpus().length;

dotenv.config({ path: '../config.env' })
const port = process.env.PRODUCT_PORT || 5003

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log(err))

// For Master process
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
 
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
 
  // This event is firs when worker died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
 
// For Worker
else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(port, err => {
    err ?
      console.log("Error in server setup") :
      console.log(`Worker ${process.pid} started on port ${port}`);
  });
 
}

