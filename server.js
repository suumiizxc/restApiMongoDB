const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
var rfs = require('rotating-file-stream');
var colors = require('colors');
const errorHandler = require('./middleware/error');

const connectDB = require("./config/db");
const categoriesRouter = require("./routes/categories");
const logger = require("./middleware/logger");
const { connect } = require("http2");

// Аппын тохиргоог proccess гэх өмнөх тохиргооны object руу шилжүүлэв
dotenv.config({ path: "./config/config.env" });
connectDB();

// create a write stream (in append mode)
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})


// Morgan log creater default time zone 
morgan.token('date', function() {
  var p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
  return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
});

// setup the logger



const app = express();

// Body parser json ogogdliig huleej avahad parser hiij tusladag bogood ene bhgui bol
// Jisheelbel post req irkue 
app.use(express.json());


app.use(logger); // categories router omno ajillaj bval user.id uusgeed router luu shuud holboj user id hevlene
app.use(morgan('combined', { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRouter);
app.use(errorHandler);

// app.use(logger) // Hervee door ni bairlaval turuuleed router ajlaad daraa ni logger ajillah uchir data shidehgui bhnee 

const server = app.listen(process.env.PORT, () => {
  console.log("Express server running ".blue + ` ${process.env.PORT} port`.underline.cyan);
});


process.on("unhandledRejection", (err, promise)=>{
  console.log(`Алдаа гарлаа ${err.message}`.underline.red);
  server.close(() => {
    process.exit(1);
  })
})