const express = require('express')
const app = express()
const path = require('path')
const port =  3000
const convert = require('./lib/convert')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req,res) => {
    const cotacao  = 1
 

    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req,res) => {
    const { cotacao, quantidade } = req.query
    const conversao = convert.convert(cotacao, quantidade)
    res.render('cotacao', {
        cotacao,
        conversao,
        quantidade
    })
})


app.listen(port, err => {
    if(err){
        console.log('Não foi possível conectar ao servidor')

    } else {
        console.log('ConvertMyMoney está online')
        
    }
})