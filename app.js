// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();



const express = require('express')
require('./src/mongoose')
const Quote = require('./src/quoteModel')

const app = express()
const port = process.env.PORT || 8080
//const port = ''
app.use(express.json())

app.get('/help', (req, res) => res.send("Hello World!"));


app.post('/quotes', async (req, res) => {
    const quote = new Quote(req.body)

    try {
        await quote.save()
        res.status(201).send(quote)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/quote', async (req, res) => {
    let quoteID = req.query.quote
    try {
        const quote = await Quote.findOne({ quoteID })

        if (!quote) {
            throw new Error('Unable to login')
        }
        
        res.send(quote)
    } catch (e) {
        res.status(500).send(e)
    }
    

    
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})