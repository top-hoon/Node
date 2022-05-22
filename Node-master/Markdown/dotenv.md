## dotenv
 - dotenv.config(); 해서 가져오는데
 - console.log(process.env.PORT); 해도 port가 안떠서 이게 왜이러나 싶었는데 undefined...
 - .env 파일이 같은경로에 지정되어있지않아서 dotenv.config()안에 path를 지정해주든지 아니면 .env 파일을 옴겨줘야했다
