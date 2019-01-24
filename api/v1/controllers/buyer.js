const service = require('../services/service')

const Service = new service()

class Buyer {

    async RegisterBuyer(dataBuyer){
        return await Service.registerBuyer(dataBuyer)
    }

}

module.exports = Buyer
