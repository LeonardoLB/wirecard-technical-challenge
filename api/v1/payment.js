const service = require('./service')

const PaymentService = new service()

class Payment {

    constructor(){

    }

    boleto( dataPayment ){
        return PaymentService.doBoletoPayment(dataPayment)
    }

    creditCard(dataPayment){
        return PaymentService.doCardPayment(dataPayment)
    }

}

module.exports = Payment
