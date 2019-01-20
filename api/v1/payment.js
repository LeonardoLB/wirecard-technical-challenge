const service = require('./service')

const PaymentService = new service()

class Payment {

    async boleto(dataPayment){
        return await PaymentService.doBoletoPayment(dataPayment)
    }

    async creditCard(dataPayment){
        return await PaymentService.doCardPayment(dataPayment)
    }

}

module.exports = Payment
