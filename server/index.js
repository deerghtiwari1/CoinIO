const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const subscriptionRouter = require('./routes/subscriptionRoute')

const authRouter = require('./routes/authRoute')
const limitRouter = require('./routes/limitsRoute')
const userRouter = require('./routes/userRoute')

// deerghtiwari
// KIxtB4px6E4yVOGp
// mongodb+srv://deerghtiwari:<password>@coinio.s8fxs2d.mongodb.net/

mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb+srv://deerghtiwari:KIxtB4px6E4yVOGp@coinio.s8fxs2d.mongodb.net/coins", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        
        require('./controllers/notify24h')
        require('./controllers/checklimit')

    })
    .catch((err) => {
        console.log(err);
    });

require('./models/user')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/notify', subscriptionRouter);
app.use('/user', authRouter);
app.use('/currency', limitRouter);
app.use('/user', userRouter);

app.get("/", (req, res)=>{
    res.send("Currency web app backend.")
})

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server Running🚀: http://localhost:5000/");
})