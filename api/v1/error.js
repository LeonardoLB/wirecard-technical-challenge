class ErrorHandling {

    constructor(type, message){

        return {
            Error: {
                type: type,
                message: message
            }
        }

    }

}

module.exports = ErrorHandling
