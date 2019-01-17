const service = require('./service')

const PaymentService = new service()

class Payment {

    constructor(){

    }

    boleto( dataPayment ){
        return { codebar: '341917900101043510047910201500085776895833333330026000' }
    }

    creditCard(dataPayment){
        return PaymentService.doPayment(dataPayment)
    }

}

module.exports = Payment
