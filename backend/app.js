const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')
const colors = require('colors');
const userRoutes = require('./routes/userRoute')
const blogRoutes = require('./routes/blogRoute')
// const cookieParser = require('cookie-parser')



const { PORT } = process.env

//connect to database
connectDB()


const app = express();


app.use(cors())
// app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);



// PORT
const port = process.env.PORT || PORT



// listen to connections
app.listen(port, ()=>console.log(`:::> listening on http://localhost:${port}`.cyan.underline))