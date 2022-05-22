## Associations One-To-One, One-To-Many and Many-To-Many
 - HasOne
 - BelongTo
 - HasMany
 - BelonsTomany

````js
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B); // A HasOne B  1:1
A.belongsTo(B); // A BelongsTo B
A.hasMany(B); // A HasMany B  1:N
A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C N:M
````
 - 옵션객체는 항상 두 번째 매개변수로 받아들임
````js
A.hasOne(B, { /* options */ });
A.belongsTo(B, { /* options */ });
A.hasMany(B, { /* options */ });
A.belongsToMany(B, { through: 'C', /* options */ });
````
### 표준
````js
// 이런식으로 정의를 하고
Foo.hasOne(Bar);
Bar.belongsTo(Foo);

// 쿼리는 이런식으로 생기게됨 
CREATE TABLE IF NOT EXISTS "foos" (
  /* ... */
);
CREATE TABLE IF NOT EXISTS "bars" (
  /* ... */
  "fooId" INTEGER REFERENCES "foos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
  /* ... */
);
````

 - 연관 호출 할때 두번째 매개변수로 다양한 옵션을 전달할 수 있음
````js
Foo.hasOne(Bar, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});
Bar.belongsTo(Foo);
````
- 가능한 선택은 RESTRICT, CASCADE, NO ACTION, SET DEFAULT, SET NULL

````js
// Option 1
Foo.hasOne(Bar, {
  foreignKey: 'myFooId'
});
Bar.belongsTo(Foo);

// Option 2
Foo.hasOne(Bar, {
  foreignKey: {
    name: 'myFooId'
  }
});
Bar.belongsTo(Foo);

// Option 3
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: 'myFooId'
});

// Option 4
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'myFooId'
  }
});
````
 - 위에 표시된 것처럼 foreignKey옵션은 문자열 또는 개체를 허용

#### Mandatory versus optional associations
 - 위의 예에서는 하나의 Bar가 Foo 없이도 존재할 수 있음 근뒈 그러면 안되니까 allowNull: false 를 지정해주자
````js
Foo.hasOne(Bar, {
  foreignKey: {
    allowNull: false
  }
});
// "fooId" INTEGER NOT NULL REFERENCES "foos" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
````

### n:m (1:n스킵)
````js
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });

CREATE TABLE IF NOT EXISTS "ActorMovies" (
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "MovieId" INTEGER REFERENCES "Movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "ActorId" INTEGER REFERENCES "Actors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("MovieId","ActorId")
);


// actorMovie
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
const ActorMovies = sequelize.define('ActorMovies', {
  MovieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie, // 'Movies' would also work
      key: 'id'
    }
  },
  ActorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Actor, // 'Actors' would also work
      key: 'id'
    }
  }
});
Movie.belongsToMany(Actor, { through: ActorMovies });
Actor.belongsToMany(Movie, { through: ActorMovies });
````
 - 1:1, 1:n과는 다르게 onUpdate, onDelete에 cascade가 디폴트값임

````js
Project.belongsToMany(User, { through: UserProjects, uniqueKey: 'my_custom_unique' })
````
 - Belongs-To-Many는 모델을 통해 고유한 키를 생성합니다. 이 고유 키 이름은 uniqueKey 옵션을 사용하여 재정의할 수 있음. 이 고유 키 생성을 방지하려면 unique: false 옵션을 사용하십시오.
 - 자동생성말고 왠만하면 정의허자


### Eager Loading vs Lazy Loding
 - Lazy는 원하는것만 
 - Eager 처음부터 큰걸로 가져오는거
 - 여기부터 다시 보기



 - 예시 참고해서보기 나중에 https://velog.io/@usaindream/Sequelize-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC13Lazy-loading-vs-Eager-loading
 - https://sequelize.org/docs/v6/core-concepts/assocs/#lazy-loading-example





























