//importa modulo axios
const axios = require('axios')

//url da api do banco central com a data desejada
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json`
// faz a requisição na api do bbc, retornando uma promise
const getCotacaoAPI = url => axios.get(url)
// testa se o valor que procuramos existe
const extractCotacao = res => res.data.value[0].cotacaoVenda
//Peda o dia atual para aplicar na url
const getToday = () => {
    //retorna a data full
    var dateOffset = (24*60*60*1000) * 1; //para atualizar com a cotação do dia anterior)
    var today = new Date();
    today.setTime(today.getTime() - dateOffset);
   // const today = new Date()
   // console.log(today)
    return `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`
}

//chama a API fazendo a junção das partes acima
const getCotacao = async() => {

    //Tenta fazer a requisição, caso contrário trata o erro
    try{
        // Qual é o dia de hoje?
        const today = getToday()
        const url = getUrl(today)
        //retorna resultado da api na data solicitada
        const res =  await getCotacaoAPI(url)
        //extrai a cotação do res
        const cotacao = extractCotacao(res)
        return cotacao
   // trata o erro retornando vazio 
    } catch(err) {
        return ''
    }  

}

module.exports = {
    getCotacao,
    extractCotacao,
    getCotacaoAPI,
    getToday,
    getUrl
}
 
 