// console.log("Hello from TypeScript Node.js app!");

import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import connectToDB from "./libs/mongoose";

const app: Application = express();
connectToDB();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});


export default app;
