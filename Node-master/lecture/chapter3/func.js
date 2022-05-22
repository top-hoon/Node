// const value = require('./var');
// console.log(value);
const {odd,even} = require('./var');

function check(number){
    if(number % 2){
        return odd;
    }else {
        return even;
    }
}

// module.exports = {
//     check,          // -> 함수자체를 넘겨주기 가능
//     odd,            // -> 다른곳에서 넘겨받은것을 다시 다른곳으로 넘겨주기도 가능
//     even
// }
module.exports = check;

