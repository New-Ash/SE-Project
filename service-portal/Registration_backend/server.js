const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeURL = require('./Routes/route')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const professionals = require('./Routes/professionals');
const PORT=process.env.PORT || 4000;
let corsOptions = {
  origin: 'http://localhost:4000/' 
};




app.disable("x-powered-by");
//config
dotenv.config()

const routes=require('./Routes/api');
const routes1=require('./Routes/api1');
const routes2=require('./Routes/api2');

mongoose.connect(process.env.ACCESS_NIKHIL, () => console.log('database connected') )

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use('/professionals',professionals)
app.use('/app',routeURL)
app.use('/api',routes);
app.use('/api1',routes1);
app.use('/api2',routes2);
app.listen(PORT,console.log(`Server open at  ${PORT}`));