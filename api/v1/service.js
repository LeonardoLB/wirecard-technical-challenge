const Database = require('./database/mongodb')

const database = new Database()

class Service {

    constructor() {

    }

    async status() {

        /*
            simlation status:
            0 = awaiting
            1 = aproved
            2 = not aproved
        */

        return 1

    }

    doPayment(dataPayment){

        this.validateEmptyData(dataPayment)

        let resultInsert = database.insert(dataPayment)
        return resultInsert
    }

    async validateCard(number){
        return await true
    }

    async identifyBuyer(){

    }

    validateEmptyData(dataPayment){
        for (const key in dataPayment) {
            if (dataPayment[key] === '') {
                return false
            }
        }
        return true
    }



}

module.exports = Service
