(function () {

    'use strict'

    var ajax = new XMLHttpRequest()

    // ajax.open( 'GET' , 'http://localhost:8000/pessoa/kley' )
    // ajax.send()
    // ajax.addEventListener('readystatechange', function () {
    //     if (ajax.readyState === 4 && ajax.status === 200 ) {
    //         console.log( ajax.response )
    //     }
    // }, false)

    ajax.open('POST', 'http://localhost:8002/payment')
    // quando for post precisa passar o header
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // ajax.send('username=keanu&age=54')
    ajax.send('id_client=2&name_buyer=leo&email_buyer=leo@leo.com.br&cpf_buyer=453.726.048-32&amount_payment=3000&type_payment=card&card_flag=visa&card_name=Leonardo l bufalo&card_number=53612789346237829&card_expiration=0320&card_cvv=678')
    ajax.onreadystatechange = function (params) {
        if (ajax.readyState == 4) {
            // console.log( 'usuario cadastrado!', ajax.status )
            console.log('Resposta: ' + ajax.response)
        }
    }

})()
