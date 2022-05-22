const {odd,even}=require('./var')   //  구조분해 할당할때는 속성명이랑 변수명이랑 같아야함
const checkNum =require('./func')    // 이건 달라도됨

function checkSTR(str){
    if(str.length % 2){
        return odd;
    }else {
        return even;
    }
}

console.log(checkNum(10));
console.log(checkSTR('hello'));
