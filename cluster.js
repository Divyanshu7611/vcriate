const cluster = require("cluster");
const os = require("os");
const app = require("./index");

require("dotenv").config();
const { connect } = require("./config/dbConnect");
// get the number of cpu cores
const numCores = os.cpus().length;
const PORT = process.env.PORT || 4000;
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  //fork workers
  for (let i = 0; i < numCores; i++) {}
  cluster.fork();
  //listen for dying workers & spawn new ones if any exist
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. spawing  a new worker...`);
    cluster.fork();
  });
} else {
  connect();

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
