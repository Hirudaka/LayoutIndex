//import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

//app
const app = express();

//db
mongoose.connect(process.env.MONGO_URI,{})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERROR", err))

//middlewares
//app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin:true, credentials: true})); //communicate from backend to fornt end

//routes
const deviceRoutes = require('./routes/deviceRoutes');
const locationRoutes = require('./routes/locationRoutes');

app.use((req, res, next) => {
    // next is used to move to the next piece of middleware
    //console.log(req.path, req.method);
    next();
});

app.use("/locations",locationRoutes);
app.use("/devices",deviceRoutes);


//port
const port = process.env.PORT || 8080;

//listener
const backend = app.listen(port, ()=> console.log(`server is running ${port}`));
