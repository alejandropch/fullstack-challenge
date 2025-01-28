import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import "module-alias/register"
import cors from 'cors'
import { dashboardRoute } from './routes/dashboard.route'
import bodyParser from 'body-parser';

process.on('uncaughtException', (error) => {
  console.error(error)
})

const app = express()
const port = process.env.BACKEND_PORT || 5000

// global middlewares
app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}))
app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/dashboard',dashboardRoute)
app.listen(port, ()=> {
  console.log("listening port:", port);  
})

