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

    doPayment(data){
        return { value: 'Pagamento realizado' }
    }

    async validateCard(number){
        return await true
    }

    async identifyBuyer(){

    }



}

module.exports = Service
