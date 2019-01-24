(function () {
    // Click Controller
    var boxPayment = document.querySelector('.box.payment')
    var boxBuyer = document.querySelector('.box.buyer')
    var boxStatus = document.querySelector('.box.status')
    var statusbox = document.querySelector('.statusResponse')

    function listener(event, element, callback) {
        document.querySelector(element)
            .addEventListener(event, callback, false)

    }

    listener('click', '.box.payment .box_top .close', closePayment)
    listener('click', '.box.buyer .box_top .close', closeBuyer)
    listener('click', '.box.status .box_top .close', closeStatus)
    listener('click', '.btn_payment', openPayment)
    listener('click', '.btn_buyer', openBuyer)
    listener('click', '.btn_status', openStatus)
    listener('click', '.btn_choose.boleto', selectPayment)
    listener('click', '.btn_choose.credit_card', selectPayment)
    listener('click', '.content .statusResponse .close', closeResponse)

    function selectPayment(el) {
        var btnBoleto = document.querySelector('.btn_choose.boleto')
        var btnCard = document.querySelector('.btn_choose.credit_card')
        var contentCard = document.querySelector('.payment-complete-send')

        if(el.target.classList.contains('boleto')) {
            btnCard.classList.remove('-active')
            contentCard.classList.remove('-active')
            btnBoleto.classList.add('-active')
        }

        if (el.target.classList.contains('credit_card')) {
            btnBoleto.classList.remove('-active')
            contentCard.classList.add('-active')
            btnCard.classList.add('-active')
        }

    }

    function closeResponse() {
        event.stopPropagation()
        statusbox.classList.remove('-active')
    }

    function closePayment() {
        event.stopPropagation()
        boxPayment.classList.remove('-active')
    }

    function closeBuyer() {
        event.stopPropagation()
        boxBuyer.classList.remove('-active')
    }

    function closeStatus() {
        event.stopPropagation()
        boxStatus.classList.remove('-active')
    }

    function openPayment() {
        event.stopPropagation()
        closeBuyer()
        closeStatus()
        boxPayment.classList.add('-active')
    }

    function openBuyer() {
        event.stopPropagation()
        closePayment()
        closeStatus()
        boxBuyer.classList.add('-active')
    }

    function openStatus() {
        event.stopPropagation()
        closePayment()
        closeBuyer()
        boxStatus.classList.add('-active')
    }

})();
(function () {
    // Payment
    //getters
    var cpf = document.querySelector('#cpf')
    var amount = document.querySelector('#amount')
    var card_name = document.querySelector('#card_name')
    var card_number = document.querySelector('#card_number')
    var card_expiration = document.querySelector('#card_expiration')
    var card_cvv = document.querySelector('#card_cvv')
    var statustitle = document.querySelector('#textStatus')
    var statusbox = document.querySelector('.statusResponse')
    var statuscodebar = document.querySelector('#textCodebar')


    function listener(event, element, callback) {
        document.querySelector(element)
            .addEventListener(event, callback, false)

    }

    listener('click', '#confirmPayment', sendPayment)
    listener('click', '.btn_choose.boleto', typePayment)
    listener('click', '.btn_choose.credit_card', typePayment)


    function sendPayment() {
        console.log(cpf.value)
        var ajax = new XMLHttpRequest()
        ajax.open('POST', 'http://localhost:8002/payment/register')
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        ajax.send(`id_client=32&cpf_buyer=${cpf.value}&amount_payment=${amount.value}&type_payment=${typePayment}&card_name=${card_name.value}&card_number=${card_number.value}&card_expiration=${card_expiration.value}&card_cvv=${card_cvv.value}`)
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                var data = JSON.parse(ajax.response)
                console.log('Resposta: ' + data)
                console.log('Resposta: ' + data.IsOk)
                console.log('Resposta: ' + data.codebar)
                statusbox.classList.add('-active')
                if (data.IsOk == true ) {
                    statustitle.innerHTML = 'Operação realizada com sucesso!'
                }
                if (data.IsOk == false) {
                    statustitle.innerHTML = 'Ops! Ocorreu um problema!'
                    statustitle.innerHTML = data.message
                }
                if (data.codebar !== undefined) {
                    statuscodebar.innerHTML = data.codebar
                }

            }
        }
    }

    function typePayment(el) {
        typePayment = el.target.getAttribute('data-value')
    }

})();



(function () {
    // register buyer
    var name_buyer = document.querySelector('#name_buyer')
    var cpf_buyer = document.querySelector('#cpf_buyer')
    var email_buyer = document.querySelector('#email_buyer')
    var statustitle = document.querySelector('#textStatus')
    var statusbox = document.querySelector('.statusResponse')
    var statuscodebar = document.querySelector('#textCodebar')



    function listener(event, element, callback) {
        document.querySelector(element)
            .addEventListener(event, callback, false)

    }

    listener('click', '#sendBuyer', registerBuyer)

    function registerBuyer() {
        var ajax = new XMLHttpRequest()
        ajax.open('POST', 'http://localhost:8002/buyer/register')
        // quando for post precisa passar o header
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // ajax.send('username=keanu&age=54')
        ajax.send(`cpf_buyer=${cpf_buyer}&name_buyer=${name_buyer}&email_buyer=${email_buyer}`)
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                var data = JSON.parse(ajax.response)
                console.log('Resposta: ' + data)
                console.log('Resposta: ' + data.IsOk)
                console.log('Resposta: ' + data.codebar)
                statusbox.classList.add('-active')
                if (data.IsOk == true) {
                    statustitle.innerHTML = data.message
                }
                if (data.IsOk == false) {
                    statustitle.innerHTML = 'Ops! Ocorreu um problema!'
                    statustitle.innerHTML = data.message
                }
                if (data.codebar !== undefined) {
                    statuscodebar.innerHTML = data.codebar
                }

            }
        }
    }
})();
