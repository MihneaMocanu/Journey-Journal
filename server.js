import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors()); 
app.use("/api", router);

let serverPort = 8080; 

app.listen(serverPort); 

console.log("App is running"); 