'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Payment = require('./payment')

// run express
var app = express()
var paymentMethod = new Payment()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get( '/payment/boleto', function ( request, response ) {
    response.send( paymentMethod.Boleto() )
} )

app.post( '/payment/credit-card' , function ( resquest, response ) {

} )

// the door where our api should work, acess like: localhost:8002
app.listen(8002)
