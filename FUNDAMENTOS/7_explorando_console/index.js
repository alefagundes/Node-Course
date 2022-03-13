const x = 10
const y = 'algum texto'
const z = [1,2]

console.log(x, y, z)

//contagem de impressoens
console.count(`o valor de x eh: ${x} contagem`)

//variavel com string
console.log("%s", y)

//limpar console

setTimeout(()=> {
    console.clear()
}, 2000)