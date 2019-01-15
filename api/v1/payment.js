const service = require('./service')

const PaymentService = new service()

class Payment {

    constructor(){

    }

    boleto(){
        return { codebar: '341917900101043510047910201500085776895833333330026000' }
    }

    creditCard( dataPayment ){

        if (dataPayment.card_flag == '' || dataPayment.card_name == '' || dataPayment.card_number == '' || dataPayment.card_expiration == '' || dataPayment.card_cvv == '' ) {
            throw Error( 'Não foram passadas todas as informações do cartão' )
        }

        return PaymentService.doPayment(dataPayment)
    }

}

module.exports = Payment
