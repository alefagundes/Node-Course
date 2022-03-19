const x = '10'

//checar se x eh um numero 
if(!Number.isInteger(x)){
    throw new ("O valor de x n eh um numero inteiro")
}else{
    console.log(`seu numero eh: ${x}`)
}