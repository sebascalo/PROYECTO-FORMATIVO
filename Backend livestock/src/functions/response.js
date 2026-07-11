class Response {
    constructor(message, info, error) {
        this.message = message;
        this.info = info;
        this.error = error;
    }

    get json() {
        return {
            success: this.error ? false : true,
            message: this.message,
            info: this.info ? this.info : {},
            error: this.error || null
        };
    }

    get success() {
        return {
            success: true,
            code: 200,
            message: this.message,
            info: this.info ? this.info : {},
            error: null
        };
    }

    get failed() {
        return {
            success: false,
            code: 400,
            message: this.message,
            info: this.info ? this.info : {},
            error: this.error
        };
    };
};
module.exports = Response;