'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Payment = require('./payment')

// run express
var app = express()

// instance my Payment Class
var paymentMethod = new Payment()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.post( '/payment' , function ( request, response ) {

    let objPayment = {
        id_client: request.body.id_client,
        name_buyer: request.body.name_buyer,
        email_buyer: request.body.email_buyer,
        cpf_buyer: request.body.cpf_buyer,
        amount_payment: request.body.amount_payment,
        type_payment: request.body.type_payment
    }

    if ( objPayment.type_payment == 'boleto') {
        response.send(paymentMethod.boleto(objPayment))
    }

    if ( objPayment.type_payment == 'card') {
        objPayment = {
            ...objPayment,
            card_flag: request.body.card_flag,
            card_name: request.body.card_name,
            card_number: request.body.card_number,
            card_expiration: request.body.card_expiration,
            card_cvv: request.body.card_cvv
        }
        response.send( paymentMethod.creditCard(objPayment) )
    }

} )

// the door where our api should work, acess like: localhost:8002
app.listen(8002)
