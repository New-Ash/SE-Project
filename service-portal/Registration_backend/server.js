const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeURL = require('./Routes/route')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const professionals = require('./Routes/professionals');
const PORT=process.env.PORT || 4000;
const customerroute = require('./Routes/profileretrieve') ;
// const customerupdateroute = require('./Routes/update-profile');
const professionalroute = require('./Routes/profileretrieve_prof') ;




app.disable("x-powered-by");
//config
dotenv.config()

const routes=require('./Routes/api');
const routes1=require('./Routes/api1');
const routes2=require('./Routes/api2');
const routes3=require('./Routes/api3');
const routes4=require('./Routes/api4');
const routes5=require('./Routes/api5');

mongoose.connect(process.env.ACCESS_FINAL, () => console.log('database connected') )

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use('/profileretrieve',customerroute)
// app.use('/update-profile',customerupdateroute)
app.use('/profileretrieve_prof',professionalroute)
app.use('/professionals',professionals)
app.use('/app',routeURL)
app.use('/api',routes);
app.use('/api1',routes1);
app.use('/api2',routes2);
app.use('/api3',routes3);
app.use('/api4',routes4);
app.use('/api5',routes5);
app.listen(PORT,console.log(`Server open at  ${PORT}`));