class APIError extends Error {
    constructor(
        statuscode,
        message = "something went wrong",
        Error = [],
        statck = ""
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null,
        this.message = message,
        this.sucess = false;
        this.Error = this.Errors

        if(statck) {
            this.stack = statck
        } else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}

export {APIError}