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
                return true
            }
            return false
        })

    }

    verifyConnection(){

        const states = {
            0: 'desconectado',
            1: 'conectado',
            2: 'conectando',
            3: 'desconectado'
        }

        const state = states[Mongoose.connection.readyState]

        if (state === 'conectado') {
            return true
        }

        if (state === 'conectando'){
            setTimeout( function () {}, 2000)
        }

        if (state === 'desconectando') {
            return false
        }

        if (state === 'desconectado') {
            return false
        }

        return true

    }



    async definePaymentSchema(){
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
                card_information: {
                    card_name: {
                        type: String,
                        default: null
                    },
                    card_expiration: {
                        type: Number,
                        default: null
                    },
                    card_number: {
                        type: String,
                        default: null
                    },
                    card_issuer: {
                        type: String,
                        default: null
                    },
                    card_cvv: {
                        type: Number,
                        default: null
                    }
                },
                boleto_information: {
                    boleto_codebar: {
                        type: Mongoose.Schema.Types.Decimal128,
                        default: null
                    }
                },
                payment_status: {
                    type: Number,
                    require: true,
                    default: 0
                }
            })
            this._modelPayment = Mongoose.model('payment', this._Paymentschema)
            if (!this._modelPayment) {
                return false
            }
            return true
    }



    async insertPayment(dataPayment){
        this.connectDatabase()
        let isConnected = this.verifyConnection()
        if (!isConnected){
            return { IsOk: false, problem: 'Ocorreu um erro ao conectar ao banco', type: 'database' }
        }
        if(!this.definePaymentSchema()){
            return { IsOk: false , problem: 'Ocorreu um erro em definir o Schema', type: 'schema'}
        }
        try {
            let responseInsert = await this._modelPayment.create(dataPayment)
            return { IsOk: true, responseInsert }
        } catch (error) {
            return { IsOk: false, problem: 'Ocorreu um erro em Inserir no banco', type: 'model' }
        }
    }
}



module.exports = MongoDB
