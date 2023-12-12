const express= require('express')//import cors from "cors";
const http = require("http");
const NodeCache = require('node-cache');
const morgan = require("morgan");
const { connectDB } = require('./src/config/db')
const  errorHandler  = require('./src/app/middlewares/errorMiddleware')
const cookieParser = require('cookie-parser');
const app= express();
const port= 3000
const server = http.createServer(app);


app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.use('/user', require('./src/app/routes/userRoutes'))
app.use('/post', require('./src/app/routes/postRoutes'))
app.use(errorHandler)


server.listen(port, () => {
    console.log('app is listening at port ' + port)
})