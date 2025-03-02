import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { ICorsOptionsType } from './interfaces/serverInterfaces';
import  { closePool } from "./config/mySqlConfig";
import  "./modals/CategoryModal";
import  "./modals/SubCategoryModal";
import  "./modals/AdminModal";
import  "./modals/SellerModal";
import  "./modals/UserModel";
import  "./modals/ProductModal";
import  "./modals/OrderModal";
import  "./modals/CommentModal";
import {createDefaultAdmin}  from "./seeders/adminSeeder";

import adminRouter  from "./routers/adminRouter";
import userRouter  from "./routers/userRouter";
import mainRouter  from "./routers/mainRouter";
import sellerRouter  from "./routers/sellerRouter";
import productRouter  from "./routers/productRouter";
import orderRouter  from "./routers/orderRouter";
import commentRouter  from "./routers/commentRouter";
import path from 'path';
import 'dotenv/config'

const initServer  = () => {
    const  app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    const  allowedOrigins:string[] = [process.env.ADMIN_DASHBOARD_PORT ||  '' ,process.env.SELLER_DASHBOARD_PORT ||  '',process.env.CLIENT_PORT ||  '' ];

    const corsOptions:ICorsOptionsType = {
        methods: "GET,POST",
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              // console.log(origin,allowedOrigins);
              callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));
    //static  files
    app.use("/api/main/v1",express.static(path.join(process.cwd(),"/public/assets/mainAssets")));
    app.use("/api/others/v1",express.static(path.join(process.cwd(),"/public/assets/mainAssets/others")));
    app.use("/api/user/v1",express.static(path.join(process.cwd(),"/public/assets/userAssets")));
    app.use("/api/seller/v1",express.static(path.join(process.cwd(),"/public/assets/sellerAssets")));
    app.use("/api/product/v1",express.static(path.join(process.cwd(),"/public/assets/productAssets")));
    app.use("/api/admin/v1",express.static(path.join(process.cwd(),"/public/assets/adminAssets")));


    const port = process.env.APP_PORT  ||  8000;

    app.use('/api/v1/admin',adminRouter);
    app.use('/api/v1/user',userRouter);
    app.use('/api/v1/main',mainRouter);
    app.use('/api/v1/seller',sellerRouter);
    app.use('/api/v1/product',productRouter);
    app.use('/api/v1/order',orderRouter);
    app.use('/api/v1/comment',commentRouter);



    app.listen(port,() =>{
        console.log('Server is running on ',port);
        createDefaultAdmin();
    });

    process.on("SIGINT", closePool);
    process.on("SIGTERM", closePool);
}

initServer();