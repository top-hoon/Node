const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');

dotenv.config();
const app = express();

app.set('port',process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());    // bodyParser 대신...
app.use(express.urlencoded({extended: true}));
app.use('/',(req,res, next)=>{
    console.log('모든 요청에 실행')
    next();
});

app.get('/test', (req,res)=> {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/category/:name',(req,res)=>{  // 저 name이 많아졌을 때를 생각하면 힘듬 이런식으로 할 수 있음 route parameter 라고한다.
    res.send(`hello ${req.params.name}`);
});

app.get('/category/js',(req,res)=>{  //
    res.send(`hello `);
});

app.use((err,req,res,next) => {
   console.error(err);
   res.status(404).send('에러남');
});

app.listen(app.get('port'),()=>{
    console.log('서버 실행!');
});
