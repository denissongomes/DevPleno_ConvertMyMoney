// Calcula o valor da cotação
const convert = (cotacao, quantidade) => {  
    return cotacao * quantidade
}

//Converte valor para duas casas decimais
const toMoney = valor => {
    return valor.toFixed(2)
}



module.exports = {
    convert,
    toMoney
}