## 관계정의
 - ex) user모델과 comment 모델 간의 관계를 정의
 - 1:N 관계 (사용자한명이 댓글 여러개)
    - 시퀄라이즈에서는 1:N 관계를 hasMany 로 표현(user.hasMany(comment))
    - 반대입장에서는 belongsTo(user)
    - belongsTo가 있는 테이블에 컬럼이 생기고 댓글테이블에 comnmenter 컬럼이 생김

````js
// 유저쪽
static.associate(db){
 db.User.hasMany(db.Comment,{foreignKey : 'commenter', sourceKey : 'id});
 }
};

// 댓글쪽
static.associate(db){
 db.User.belongsTo(db.User,{foreignKey : 'commenter', sourceKey : 'id});
 }
};
````
 - 1:1도 비슷비슷
## 시퀄라이즈 쿼리 
 - 예시1
````sql
insert into table(name, age, married) values('top',24,1)
````
````js
const {table} = require('../models');
table.create({
 name:'top',
 age:24,
 married: true,
});
````
 - 예시 2
````sql
select * from table;
````
````js
table.findAll({});
````

 - 예시 3 
````sql
select naem, married from table;
````
````js
table.findAll({
 attributes:['name', 'married'],
});
````
 - 예시 4
````sql
select name, age from table where married = 1 and age>30;
````
````js
const {Op} = require('sequelize');
const {table} = require('../models');

table.findAll({
 attributes:['name', 'married'],
 where : {
  married: 1,
  age:{[Op.gt]:30},
 }
});
````
 - 예시 4 update
````sql
update table set comment = 'good' where id =2;
````
````js
table.update({
 comment : 'good',
},{
  where : {id:2},
});
````
 - 예시 5 delete
````sql
delete from table  where id =2;
````
````js
table.destroy({
  where : {id:2},
});
````
## 관계쿼리
 - 결과값이 자바스크립트 객체임
````js
const user = await User.findOne({});
console.log(user.nick); // 사용자 닉네임
````
 - include로 join과 비슷한 기능 수행가능(관계 있는 것 엮기 가능)
````js
const user = await User.findOne({
  include:[{
   model: Comment,
  }]
 )};
 console.log(user.Comments);
````
 - 다대다 모델은 다음과 같이 접근 가능
````js
db.sequelize.models.PostHashtag
````
 - get+모델명으로 관계있는 데이터 로딩 가능
````js
const user = await User.findOne({});
const comment = await user.getComments();
console.log(comments); // 사용자의 댓글
````


 - 직접 sql 쓰는것도 가능
````js
const[result, metadata] = await sequelize.query('SELECT * from comments');
console.log(result);
````
























