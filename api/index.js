'use strict'

const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')

// run express
var app = express()

app.use(bodyParse.urlencoded( {extend: false} ))
app.use(cors())

app.get( '/boleto', function ( request, response ) {

    response.send({ codebar: '341917900101043510047910201500085776895833333330026000' } )

} )

app.get( '/credit-card' , function ( resquest, response ) {

} )
// the door where our api should work, acess like: localhost:8002
app.listen(8002)
