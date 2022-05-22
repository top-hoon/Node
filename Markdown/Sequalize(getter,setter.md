### getter 
 - 모델의 속성에 대한 사용자지정 getter, setter 정의가능
 - sql테이블에 실재로 존재하지않지만 sequelize 모델의 속성(가상속성)을 지정해서 코드를 단순화 할 수 있는 사용자 지정속성을 만드는데 유용함

````js
const User = sequelize.define('user', {
  // Let's say we wanted to see every username in uppercase, even
  // though they are not necessarily uppercase in the database itself
  username: {
    type: DataTypes.STRING,
    get() {
      const rawValue = this.getDataValue('username');
      return rawValue ? rawValue.toUpperCase() : null;
    }
  }
});
````
 - 이 get()은 자바스크립트 getter와 마찬가지로 필드값을 읽을 때 자동으로 호출됨
````js
const user = User.build({ username: 'SuperUser123' });
console.log(user.username); // 'SUPERUSER123'
console.log(user.getDataValue('username')); // 'SuperUser123'
````
 - 위에서 볼 수 있듯이 데이터베이스에는 SuperUser123 라고 저장되지만  get에 Uppercase()로 설정해놔서  SUPERUSER123 라고 나옴 
 - getDataValeu를 쓰면 raw 데이터가 나옴
 - 대신 getter에서 사용하려고 했다면 this.username은 무한루프가 발생할것임 -> getDatavalue를 그래서 제공함!

### setter
````js
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('password', hash(value));
    }
  }
});

//찍어보면
const user = User.build({ username: 'someone', password: 'NotSo§tr0ngP4$SW0RD!' });
console.log(user.password); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
console.log(user.getDataValue('password')); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
````
 - 데이터베이스에 데이터를 보내기전에 Sequelize가 setter를 호출함 데이터베이스가 본 값은 이미 해시된 값
 - 모델 인스턴스의 다른 필드를 계산에 포함시키는방법
````js
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      // Using the username as a salt is better.
      this.setDataValue('password', hash(this.username + value));
    }
  }
});
````
 - 보안에는 안좋으니 이렇게 쓰지는 말자 그냥 예시임


### getter+setter 같이 쓰기
 - content 의 메모리 사용을 개선하기 위해 콘텐츠의 gzip버전을 저장할때라고 가정한 상황인데 최신 데이터베이스는 이런경우 자동으로 압축해야함 예시니까 쓰진말좌
 - 이건 잘 이해가안감,, gzip
````js
const { gzipSync, gunzipSync } = require('zlib');

const Post = sequelize.define('post', {
  content: {
    type: DataTypes.TEXT,
    get() {
      const storedValue = this.getDataValue('content');
      const gzippedBuffer = Buffer.from(storedValue, 'base64');
      const unzippedBuffer = gunzipSync(gzippedBuffer);
      return unzippedBuffer.toString();
    },
    set(value) {
      const gzippedBuffer = gzipSync(value);
      this.setDataValue('content', gzippedBuffer.toString('base64'));
    }
  }
});
````
 - content 위의 설정을 사용하면 모델의 필드와 상호작용을 시도할때 마다 PostSequelize가 getter와 setter를 처리
````js
const post = await Post.create({ content: 'Hello everyone!' });

console.log(post.content); // 'Hello everyone!'
// Everything is happening under the hood, so we can even forget that the
// content is actually being stored as a gzipped base64 string!

// However, if we are really curious, we can get the 'raw' data...
console.log(post.getDataValue('content'));
// Output: 'H4sIAAAAAAAACvNIzcnJV0gtSy2qzM9LVQQAUuk9jQ8AAAA='
````

### 가상!!! - 데이터베이스에는 존재하지않지만 sequelize 에는 내부적으로 채움
 - https://runebook.dev/ko/docs/sequelize/class/lib/data-types.js~virtual   VIRTUAL 예제 한개 더
````js
const { DataTypes } = require("sequelize");

const User = sequelize.define('user', {
  firstName: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  }
});
````
 - VIRTUAL 로 인해서 테이블의 열은 존재하지않음 하지만 getter로 볼 수있음
````js
const user = await User.create({ firstName: 'John', lastName: 'Doe' });
console.log(user.fullName); // 'John Doe'
````





























