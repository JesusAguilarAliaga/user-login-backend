import express from "express";
//import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors"
import router from "./routes/index.js";
import errorHandler from "./utils/errorHandler.js";

//config();
const app = express()

app.use(express.json());
app.use(helmet({
    crossOriginEmbedderPolicy: false
}))
app.use(cors())
app.use(router)

app.get("/", (req, res) => {
    return res.send("welcome to express api")
})

app.use(errorHandler)



export default app;