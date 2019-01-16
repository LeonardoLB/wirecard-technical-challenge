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

const paymentSchema = new Mongoose.Schema({
    id_client:{
        type: Number,
        required: true
    },
    name_buyer:{
        type: String,
        required: true
    },
    email_buyer:{
        type: String,
        required: true
    },
    cpf_buyer:{
        type: String,
        required: true
    },
    amount_payment: {
        type: Number,
        required: true
    },
    type_payment: {
        type: String,
        required: true
    },
    card_flag: {
        type: String,
        required: true
    },
    card_name: {
        type: String,
        required: true
    },
    card_name: {
        type: Number,
        required: true
    },
    card_expiration: {
        type: Number,
        required: true
    },
    card_cvv: {
        type: Number,
        required: true
    }


})

const modelPayment = Mongoose.model('payment', paymentSchema)

async function insert(obj) {
    const result = await modelPayment.create(obj)

    return result

}

async function list() {
    const result = await modelPayment.find({})

    console.log( result )
    return result
}

list()
