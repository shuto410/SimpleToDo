const obj = { first: { 1 : "one", 2 : "two" }, second: { 1 : "one" } };

// 第二引数に obj を渡す
for(let k of Object.keys(obj)){
    for(let l of Object.keys(obj[k])){
        console.log(obj[k][l]);
    }
}