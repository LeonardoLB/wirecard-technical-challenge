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

    ajax.open('POST', 'http://localhost:8002/payment/register')
    // quando for post precisa passar o header
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // ajax.send('username=keanu&age=54')
    ajax.send('id_client=17&cpf_buyer=45372604831&amount_payment=2000&type_payment=boleto&card_name=Leonardo l bufalo&card_number=6011454931724887&card_expiration=1020&card_cvv=345')
    ajax.onreadystatechange = function (params) {
        if (ajax.readyState == 4) {
            // console.log( 'usuario cadastrado!', ajax.status )
            console.log('Resposta: ' + ajax.response)
        }
    }

    // ajax.open('POST', 'http://localhost:8002/buyer/register')
    // // quando for post precisa passar o header
    // ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // // ajax.send('username=keanu&age=54')
    // ajax.send('cpf_buyer=45372604831&name_buyer=leonardo lemes bufalo&email_buyer=leonardolsbufalo@gmail.com')
    // ajax.onreadystatechange = function (params) {
    //     if (ajax.readyState == 4) {
    //         // console.log( 'usuario cadastrado!', ajax.status )
    //         console.log('Resposta: ' + ajax.response)
    //     }
    // }

})()
