## 검증 및 제약
 - ex)
````js
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  hashedPassword: {
    type: DataTypes.STRING(64),
    validate: {
      is: /^[0-9a-f]{64}$/i
    }
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();
````
 - 유효성 검사는 자바스크립트와 시퀄라이즈 수준에서 수행됨. 유효성 검사가 실패하면 데이터베이스에 쿼리가 전송되지않음
 - 반면 제약조건은 sql수준에서 정의된 규칙 제약조건의 기본적인 예는 Unique 조건. 
 - 제약조건 검사가 실패하면 데이터베이스에서 오류가 발생하고 Sequelize는 이 오류를 자바스크립트로 전달 던져줌 SequelizeUniqueConstraintError 
 - 유효성 검사와는 다르게 쿼리도 던져줌

### Unique
````js
/* ... */ {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
} /* ... */
````
 - 이 모델이 동기화되면 username 필드가 테이블에 생기고 unique 도 생겨서 이미 존재하는 사용자 이름을 삽입하려하면 SequelizeUniqueConstraintError 뜸

### null
 - 알쥐


### Validators   링크 - https://github.com/validatorjs/validator.js
 - create이랑 update할 때 자동으로 유효성검증해줌 validator.js(10.11.0)
````js
sequelize.define('foo', {
  bar: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z]+$/i,          // matches this RegExp
      is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
      not: /^[a-z]+$/i,         // does not match this RegExp
      not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isCreditCard: true,       // check for valid credit card numbers

      // Examples of custom validators:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
    }
  }
});
````
 - 내장 유효성 검사 함수에 여러 인수를 전달해야 하는 경우 전달할 인수가 배열에 있어야함.
 - 예를 들어 허용되는 문자열배열 isIn 하나의 배열 인수 대신 여러 문자열 인수로 해석됨. -> [['foo', 'bar']] 같이 전달하면됨.

 - 인수가 필요없는경우는 msg만 보내주면됨
````js
isInt: {
  msg: "Must be an integer number of pennies"
}
````
- 인수가 필요한 경우에는 arg속성을 추가해주면됨.
````js
isIn: {
  args: [['en', 'zh']],
  msg: "Must be English or Chinese"
}
````
 - 이거 다 error 객체가 가지고 있어서 상관없다함


### null+valdator
````js
class User extends Model {}
User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [5, 10]
    }
  }
}, { sequelize });
````
 - 이렇게도 가능하고

````js
class User extends Model {}
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your name'
      }
    }
  }
}, { sequelize });
````
 - msg 도 커스터마이징 가눙

# 중요 모델전체! Model-wide validations  필드-> 모델   (나중에 위도 경도 할 때 쓰면될듯)
 - 필드별 유효성 검사기 이후에 모델을 확인하기 위해 유효성검사를 정의할 수 있음 
 - 예를 들어 둘 중 하나가 설정되지 않았거나 둘 다 설정되었는지 확인하고 둘 중 latitude하나 longitude가 설정되고 다른 하나는 설정되지 않은 경우 실패할 수 있음
 - 모델 유효성 검사기 메서드는 모델 개체의 컨텍스트와 함께 호출되며 오류가 발생하면 실패한 것으로 간주되고 그렇지 않으면 통과합니
 - 이것은 사용자 정의 필드별 유효성 검사기와 동일합니다.

````js
class Place extends Model {}
Place.init({
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  latitude: {
    type: DataTypes.INTEGER,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitude: {
    type: DataTypes.INTEGER,
    validate: {
      min: -180,
      max: 180
    }
  },
}, {
  sequelize,
  validate: {
    bothCoordsOrNone() {
      if ((this.latitude === null) !== (this.longitude === null)) {
        throw new Error('Either both latitude and longitude, or neither!');
      }
    }
  }
})
````
 - 이 경우 하나가 제공 되지만 둘 다 제공되지 않으면 개체가 유효성 검사에 실패됨. 위도가 범위를 벗어나고 경도가 없는 항목을 만들려고 하면  somePlace.validate() 반환
````js
{
  'latitude': ['Invalid number: latitude'],
  'bothCoordsOrNone': ['Either both latitude and longitude, or neither!']
}
````

















