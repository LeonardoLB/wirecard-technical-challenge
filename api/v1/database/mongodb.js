const Mongoose = require('mongoose')


class MongoDB {

    constructor(){

        this._Paymentschema = null
        this._modelPayment = null

    }



    connectDatabase(){

        Mongoose.connect('mongodb://myuser:mypassword@localhost:27017/wirecard', { useNewUrlParser: true }, function (error) {
            if (!error) {
                return
            }
            console.log('Falha na Conexão: ', error)
        })

        const connection = Mongoose.connection
        connection.once('open', function () {
            console.log('database rodando')
        })
    }



    definePaymentCardSchema(){

        this.connectDatabase()

        this._Paymentschema = new Mongoose.Schema({
            id_client: {
                type: Number,
                required: true
            },
            name_buyer: {
                type: String,
                required: true
            },
            email_buyer: {
                type: String,
                required: true
            },
            cpf_buyer: {
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
            card_expiration: {
                type: Number,
                required: true
            },
            card_cvv: {
                type: Number,
                required: true
            },
            payment_status: {
                type: Number,
                require: true,
                default: 0
            }
        })

        this._modelPayment = Mongoose.model('payment', this._Paymentschema)

    }

    definePaymentBoletoSchema(){

        this.connectDatabase()

        this._Paymentschema = new Mongoose.Schema({
            id_client: {
                type: Number,
                required: true
            },
            name_buyer: {
                type: String,
                required: true
            },
            email_buyer: {
                type: String,
                required: true
            },
            cpf_buyer: {
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
            payment_status: {
                type: Number,
                require: true,
                default: 0
            }
        })

        this._modelPayment = Mongoose.model('payment', this._Paymentschema)
    }


    async insert(dataPayment){

        let resulInsert = null

        switch (dataPayment.type_payment) {


            case 'card':
                console.log( 'conteudo a ser inserido: ', dataPayment )
                this.definePaymentCardSchema()
                resulInsert = await this._modelPayment.create(dataPayment)
                break

            case 'boleto':
                this.definePaymentBoletoSchema()
                resulInsert = await this._modelPayment.create(dataPayment)
                break

            default:
                resulInsert = 'Esse metodo de pagamento não existe'
                break
        }

        console.log( 'Retorno do ResultInsert: ', resulInsert )
        return resulInsert
    }

}

module.exports = MongoDB
