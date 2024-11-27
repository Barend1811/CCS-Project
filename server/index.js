import express from 'express'
const app = express()
app.use(express.json());
import cookieParser from 'cookie-parser';
app.use(cookieParser());
import cors from 'cors';
app.use(cors({ credentials: true, origin: true, allowedHeaders: 'origin, content-type, accept, authorisation, set-cookie', exposedHeaders: 'set-cookie' }));
import Router from "./routes.js"
import 'dotenv/config'
const port = process.env.PORT
app.use("/", Router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});