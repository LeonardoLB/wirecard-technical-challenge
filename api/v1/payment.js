const service = require('./service')

const PaymentService = new service()

class Payment {

    async boleto(dataPayment){
        return await PaymentService.doBoletoPayment(dataPayment)
    }

    creditCard(dataPayment){
        return PaymentService.doCardPayment(dataPayment)
    }

}

module.exports = Payment
