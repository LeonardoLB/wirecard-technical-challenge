(function () {
    // Click Controller
    var boxPayment = document.querySelector('.box.payment')
    var boxBuyer = document.querySelector('.box.buyer')
    var boxStatus = document.querySelector('.box.status')

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
    // APi integrate
})();
