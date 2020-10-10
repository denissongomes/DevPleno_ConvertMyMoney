const axios = require('axios')
const url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='05-04-2020'&$top=100&$format=json"

// axios.get(url).then( res => console.log (res.data.value[0].cotacaoVenda))

const getToday = () => {
    //retorna a data full
    const today = new Date()
    return `${today.getMonth()}-${today.getDate()}-${today.getFullYear()}`

}
 
console.log(getToday())