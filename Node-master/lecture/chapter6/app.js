const express = require('express');
const path = require('path');
const app = express();

app.set('port',process.env.PORT || 3000);

app.use('/',(req,res, next)=>{
    console.log('모든 요청에 실행')
    next();
},(req,res,next) => {
    throw new Error('에러가남')
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
