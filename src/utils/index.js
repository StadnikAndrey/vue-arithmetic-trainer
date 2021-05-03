function randomInt(min, max){
    let from = null;
    let to = null;
    if (min < max) {
        from = Math.ceil(min);
        to = Math.floor(max);
    }else{
        from = Math.ceil(max);
        to = Math.floor(min);
    }     
    let int = Math.floor(Math.random() * (to - from + 1)) + from;     
    return int;
}
function randomFloat(min, max) {
    let from = null;
    let to = null;
    let res = null;
    if (min < max) {
        from = Math.ceil(min);
        to = Math.floor(max);
    } else {
        from = Math.ceil(max);
        to = Math.floor(min);
    }
    let float = Math.random() * (to - from) + from;
    Number.isInteger(float) ? res = float : res = float.toFixed(3);
    return res;
}
export default { randomInt, randomFloat};