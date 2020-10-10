const api = require('./api-bcb')
const axios = require('axios')
//informamos ao jest que o axios será simulado (mockado), 
//para que nosso teste continue sendo unitário.
jest.mock('axios')
 
// Testa url OK
test('getCotacaoAPI', ()=> {
    //valor simulado de resposta da API falsa do axios
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.50 }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    // Testa url
    api.getCotacaoAPI('url').then(resp => {
        expect(resp).toEqual(res) 
        expect(axios.get.mock.calls[0][0]).toBe('url') 
    })
}) 

//Testa se o resultado da extração devolve a cotação
test('extractCotacao', () => {
  const cotacao = api.extractCotacao({
    data: {
        value: [
            { cotacaoVenda: 5.50 }
        ]
    }
})
expect(cotacao).toBe(5.50)
})

//agrupa varios testes
describe('getToday', () => {
    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
  
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2020-01-01T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('1-1-2020')

    })

})

test('getUrl', () => {
    const url = api.getUrl('Minha-Data')
    expect(url).toBe("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='Minha-Data'&$top=100&$format=json")
})

test('getCotacao', () => {
   
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.50 }
            ]
        }
    }

  const getToday = jest.fn()
  getToday.mockReturnValue('01-01-2020')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockResolvedValue(res)
  
  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(5.50)

  api.pure
        .getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao})()
        .then( res => {
            console.log('res', res)
        })
        
})