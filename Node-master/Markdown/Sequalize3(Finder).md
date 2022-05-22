## finder
 - 기본적으로 select 쿼리 생성하는 메서드
 - 데이터베이스가 결과를 반환한 후 sequelize가 적절한 인스턴스 개체로 래핑하는것을 의미 결과가 너무많으면 비효율적일수있다
 - 래핑을 비활성화하고 일반응담을 받으려면 {raw:true} 로 finder 메소드에 옵션으로 전달하면됨

#### findAll
 - 알거고

#### findByPk - pk로 가져오기
````js
const project = await Project.findByPk(123);
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  // Its primary key is 123
}
````
#### findOne
 - 메서드는 찾은 첫 findOne번째 항목을 얻음
````js
const project = await Project.findOne({ where: { title: 'My Title' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  console.log(project.title); // 'My Title'
}
````
#### findOrCreate -> 조금 더 다시
 - 쿼리 옵션을 충족하는 항목을 찾을 수 없는 경우 테이블에 항목을 생성함
 - 두 경우 모두 인스턴스(찾은 인스턴스 또는 생성된 인스턴스)와 해당 인스턴스가 생성되었거나 이미 존재했는지 여부를 나타내는 것을 boolean으로 반환
 - where은 항목을 찾기 위해 고려되고, 옵션 default는 하옥을 찾지 못했을때 생성되어야 하는 항목을 정의
 - default는 모든 컬럼에대한 값을 가지고 있지않으며, Sequelize는 지정된 값을 넣어줌 where절에 있는 값
````js
const [user, created] = await User.findOrCreate({
  where: { username: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript'
  }
});
console.log(user.username); // 'sdepold'
console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
console.log(created); // The boolean indicating whether this instance was just created
if (created) {
  console.log(user.job); // This will certainly be 'Technical Lead JavaScript'
}
````
#### findAndCountAll
 - findAll+count 인 메서드임 페이지네이션 할 때 편함
    - group가 제공되지 않으면 두 가지 속성이 있는 개체를 반환함
      - 1. count- 정수 - 쿼리와 일치하는 총 레코드 수
      - 2. rows- 객체 배열 - 획득한 레코드
    - group이 있을 경우
      - count- 객체 배열 - 각 그룹의 개수와 예상 속성을 포함.
      - rows- 객체 배열 - 획득한 레코드

````js
const { count, rows } = await Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: 'foo%'
    }
  },
  offset: 10,
  limit: 2
});
console.log(count);
console.log(rows);
````




























