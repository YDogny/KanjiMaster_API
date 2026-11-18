export class ErrorResponse extends Error {
    constructor(
        public readonly code: number,
        message: string,
        public readonly errId: string,
        public readonly meta?: Record<string, unknown>
    ){
        super(message)
        this.name = this.constructor.name
    }
    
    toJSON() {
        return {
            code: this.code,
            message: this.message,
            errId: this.errId,
            ...(this.meta != undefined && { meta: this.meta })
        }
    }
}
