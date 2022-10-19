let temp = ''
for(let i = 1; i <= 25; i++){
    if(i % 5 == 0){
        temp = temp + i
        console.log(temp)
        let temp2 = (i/5) + 1
        temp = '' + temp2 + ' '
    }else{
        temp = temp + i + ' '
    }
}