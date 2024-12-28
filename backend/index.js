const  express  =  require('express');
const  cors =   require('cors');
const app =  express();
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

//cross origin resource  sharing
app.use(cors({origin: "http://localhost:3000"}))

//Routers
const userRouter = require('./v1/routers/userRouter');
const sellerRouter =  require('./v1/routers/sellerRouter');
const productRouter = require('./v1/routers/productRouter');

app.use('/api/v1/user',userRouter);
app.use('/api/v1/seller',sellerRouter);
app.use('/api/v1/product',productRouter);

app.listen(process.env.PORT);