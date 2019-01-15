const Mongoose = require('mongoose')

Mongoose.connect('mongodb://myuser:mypassword@localhost:27017/wirecard', { useNewUrlParser: true }, function (error) {
    if (!error) {
        return
    }
    console.log('Falha na Conexão: ', error)
})

// atravez desta propriedade do Mongoose podemos verificar o status da conexão
const connection = Mongoose.connection

connection.once('open', function () {
    console.log('database rodando')
})
