'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Payment = require('./payment')
const Buyer = require('./buyer')

// run express
var app = express()

// instance my Payment Class
var paymentMethod = new Payment()
var BuyerMethod = new Buyer()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.post( '/payment/register' , async function ( request, response ) {

    let objPayment = {
        id_client: request.body.id_client,
        cpf_buyer: request.body.cpf_buyer,
        amount_payment: request.body.amount_payment,
        type_payment: request.body.type_payment
    }

    if ( objPayment.type_payment === 'boleto') {
        let res = await paymentMethod.boleto(objPayment)
        response.send( res )
    }

    if ( objPayment.type_payment === 'card') {
        objPayment = {
            ...objPayment,
            card_information: {
                card_name: request.body.card_name,
                card_number: request.body.card_number,
                card_expiration: request.body.card_expiration,
                card_cvv: request.body.card_cvv
            }
        }

        let res = await paymentMethod.creditCard(objPayment)
        response.send( res )
    }

    if ( objPayment.type_payment === '' ) {
        response.send( { Error: 'Por Favor informar o tipo de pagamento' } )
    }

} )

app.post( '/buyer/register', async function (request, response) {
    let objBuyer = {
        name_buyer: request.body.name_buyer,
        email_buyer: request.body.email_buyer,
        cpf_buyer: request.body.cpf_buyer
    }

    let res = await BuyerMethod.RegisterBuyer(objBuyer)
    response.send( res )

} )

app.get( '/payment/status/:payment_id' , async function (request, response) {

    let id = request.params.payment_id
    let res = await paymentMethod.StatusPayment(id)
    response.json( res )

} )


// the door where our api should work, acess like: localhost:8002
app.listen(8002)
