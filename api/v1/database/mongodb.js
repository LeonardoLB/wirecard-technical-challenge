const Mongoose = require('mongoose')


class MongoDB {

    constructor(){

        this._BuyerSchema = null
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



    async definePaymentCardSchema(){
        try {
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
                card_name: {
                    type: String,
                    required: true
                },
                card_expiration: {
                    type: Number,
                    required: true
                },
                card_number: {
                    type: String,
                    required: true
                },
                card_issuer: {
                    type: String,
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
                },
            })
            this._modelPayment = Mongoose.model('payment', this._Paymentschema)
            return true

        } catch (error) {
            throw ('Ocorreu um erro ao conectar o banco e definir o Schema do cartão')
        }
    }



    async definePaymentBoletoSchema(){
        try {
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
                boleto_codebar:{
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
            return true

        } catch (error) {
            throw ('Ocorreu um problema ao conectar ao banco e definir o Schema do Boleto', error)
        }
    }



    defineBuyerSchema(){

        try {
            this.connectDatabase()
            this._BuyerSchema = new Mongoose.Schema({
                name_buyer: {
                    type: String,
                    require: true
                },
                email_buyer: {
                    type: String,
                    require: true
                },
                cpf_buyer: {
                    type: String,
                    require: true
                }
            })
            return true

        } catch (error) {
            throw ('Ocorreu um problema o conectar ao banco e definir o Schema: ', error)
        }

    }


    async insertPayment(dataPayment){
        switch (dataPayment.type_payment) {

            case 'card':
                try {
                    this.definePaymentCardSchema()
                    await this._modelPayment.create(dataPayment)
                    return true
                } catch (error) {
                    throw ('Ocorreu um erro ao inserir no banco: ', error)
                }

            case 'boleto':
                try {
                    this.definePaymentBoletoSchema()
                    await this._modelPayment.create(dataPayment)
                    return true
                } catch (error) {
                    throw ('Ocorreu um erro ao inserir no banco: ', error)
                }

            default:
                throw ('Esse metodo de pagamento não existe')
        }
    }
}

module.exports = MongoDB
