const  express  =  require('express');
const app =  express();
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

//Routers
const userRouter = require('./routers/userRouter');
const sellerRouter =  require('./routers/sellerRouter');

app.use('/user',userRouter);
app.use('/seller',sellerRouter);



app.listen(process.env.PORT);