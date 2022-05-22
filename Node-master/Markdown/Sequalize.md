## Sequalize
 - 먼저 ORM(Object-Relational Mapping)은 객체지향 패러다임을 활용하여 관계형 데이터베이스(RDB)의 데이터를 조작하게 하는 기술이다. 이를 활용하면 쿼리를 작성하지 않고도 객체의 메서드를 활용하는 것처럼 쿼리 로직을 작성할 수 있다.
Sequelize는 MySQL, PostgreSQL, MariaDB 등 많은 RDBMS를 지원하고 Promise 기반으로 구현되었기 때문에 비동기 로직을 편리하게 작성할 수 있다.
````js
npm install sequelize // 시퀄라이즈 설치
npm install mysql2 // mysql2 설치
npm install -g sequelize-cli // 전역
// 설치하고
sequelize init
````
 - 초기화를 하게되면 config, models, migrations, seeders 와 같은 폴더들이 생긴다.
 - config : 데이터베이스 설정 파일, 사용자 이름, DB 이름, 비밀번호 등의 정보 들어있다.
 - migrations : git과 비슷하게, 데이터베이스 변화하는 과정들을 추적해나가는 정보로, 실제 데이터베이스에 반영할 수도 있고 변화를 취소할 수도 있다.
 - models : 데이터베이스 각 테이블의 정보 및 필드타입을 정의하고 하나의 객체로 모은다.
 - seeders : 테이블에 기본 데이터를 넣고 싶은 경우에 사용한다
 
 - https://resilient-923.tistory.com/276
 
 
 ### typeORM , Sequalize 비교
 https://velog.io/@josworks27/%EC%84%9C%EB%B2%84%EA%B5%AC%EC%B6%95-2%ED%8E%B8
 
 https://kyungyeon.dev/posts/3
 


## 시작
 - config.json 설정
 - 1. npx sequelize init - > 시쿼라이즈 구조 생성
 - 2. npx sequelize db:create -> db생성
 - model/index.js 수정
````js
cosnt sequelize = require('Sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(config 위치)[env];
const db={};

const sequelize = new Sequelize(config.database, config.username, config.password, config);   // Sequelize 의 필요한 매개변수들이 무엇인지
db.sequelize = sequelize;

module.exports = db;
````
 - app.js 작성
 - sequelize sync 로 연결!
````js
...

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view','html');
...

sequelize.sync({force:false}) //-> force true로 설정해주게되면 만약 그 테이블이 존재시에 원래있던 테이블을 삭제하고 새로만들게 되면서 데이터가 날아갈 수 있음 default 값은 false
 .then(()=>{
  console.log('연결성공');
 })
 .cahch((err) =>{
  console.error(err);
 });
````
 - npm start!

## 모델생성
 - 생성하는 방법은알고 추가적으로 define 메서드의 세번째 인자는 테이블 옵션
   - timestamp: true면 createdAt(생성시간), updatedAt(수정시간), 컬럼을 자동으로 만듬
   - 직접만들려면 false해주면됨
   - paranoid 옵션은 true면 deleteAt(삭제시간) 컬럼을 만들고 로우복구를 위해 완전히 삭제 하지않고 표시만 해줌
   - underscored 옵션은 카멜케이스로 생성되는 컬럼을 스네이크케이스로 바꿔줌
   - modelName은 모델이름 tableName은 테이블이름
   - charset과 collate 는 한글 설정을 위해 필요
## 모델 활성화
 - index.js 연결
 - init으로 sequelize와 연결
 - associate로 관계설정
````js
const sequelize = require('Sequelize');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require(config 위치)[env];
const db={};

const sequelize = new Sequelize(config.database, config.username, config.password, config);   // Sequelize 의 필요한 매개변수들이 무엇인지
db.sequelize = sequelize;
db.User = User;

User.init(sequelize); // 시작

User.associate(db);
module.exports = db;
````
 - model DB와의 연결성공





























