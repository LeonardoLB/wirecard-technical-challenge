const Database = require('./database/mongodb')
const creditCardValidation = require('credit-card-validation')
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

    doBoletoPayment(dataPayment){

        if(!this.validateEmptyData(dataPayment)){
            return console.error( 'Está faltando informação' )
        }

        let codebar = this.generatorBoletoCodebar()

        dataPayment = {
            ...dataPayment,
            boleto_codebar: codebar
        }

        let { boleto_codebar } = database.insertPayment(dataPayment)
        return boleto_codebar

    }

    doCardPayment(dataPayment){

        if (!this.validateEmptyData(dataPayment)) {
            throw('Está faltando informação')
        }

        if (!this.validateCard(dataPayment)) {
            throw('Numero de cartão invalido')
        }

        dataPayment = {
            ...dataPayment,
            card_issuer: this.identifyIssuerCard(dataPayment)
        }

        let resultInsert = database.insertPayment(dataPayment)
        return resultInsert
    }

    validateCard(dataPayment){

        let card = creditCardValidation(dataPayment.card_number)

        if (!card.isValid()) {
            throw('cartão invalido')
        }

        return true

    }

    identifyIssuerCard(dataPayment){

        let card = creditCardValidation(dataPayment.card_number)

        return card.getType()

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

    generatorBoletoCodebar(){
        let avaibleBoletos = {
            0: '001910000700302122304055711936102401070078012682',
            1: '001900000500302122304033321936104401070043243102',
            2: '789900000300302122304074541936104401070034243123',
            3: '111900000200302122304086661936104401070010243226',
            4: '121900000900302122304098171936104401070045243787',
            5: '021450000000302122304009281936104401070009243658',
            6: '941980000600302122304011941936104401070089243900',
            7: '081910003400302122304030051936104401070056243450',
            8: '051920006000302122304044671936104401070023243764',
            9: '341917900101043510047910201500085776895833333330'
        }

        let randomNumber = Math.floor(Math.random() * 10)

        return avaibleBoletos[randomNumber]

    }


}

module.exports = Service
