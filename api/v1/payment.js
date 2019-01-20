const service = require('./service')

const Service = new service()

class Payment {

    async boleto(dataPayment){
        return await Service.doBoletoPayment(dataPayment)
    }

    async creditCard(dataPayment){
        return await Service.doCardPayment(dataPayment)
    }

    async StatusPayment(id){
        return await Service.status(id)
    }

}

module.exports = Payment
