const  express  =  require('express');
const app =  express();
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

//Routers




app.listen(process.env.PORT);