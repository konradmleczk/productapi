import {ERROR_MESSAGE} from "../data/text.constant";


export class Validator {
    isSuccess: boolean;
    message: string;
    code: number;

    constructor(isSuccess: boolean, message: string, code: number) {
        this.isSuccess = isSuccess
        this.message = message
        this.code = code
    }

    set(message: string) {
        this.isSuccess = false
        this.message = message
        this.code = 400
    }

    is(typeOfData: string | number | undefined, message: string) {
        if (!typeOfData) {
            this.set(message)
            return true
        }
        return false
    }

    maxSign(typeOfData: string, message: string, numberOfSign: number) {
        if (typeOfData.length > numberOfSign) {
            this.set(message)
            return true
        }
        return false
    }

    isSaved(typeOfData: number, message: string) {
        if (typeOfData === 0) {
            this.set(message)
        }
    }

    isFound(typeOfData: [], message: string) {
        if (typeOfData.length === 0) {
            this.set(message)
        }
    }


    checkData({name, price}: { name: string, price: number }) {
        if (this.is(name, ERROR_MESSAGE.nameIs)) return
        if (this.is(price, ERROR_MESSAGE.priceIs)) return
        if (this.maxSign(name, ERROR_MESSAGE.nameMax, 100)) return
    }

    checkSave(typeOfData: number) {
        this.isSaved(typeOfData, ERROR_MESSAGE.savedData)
    }

    checkFind(typeOfData: []) {
        this.isFound(typeOfData, ERROR_MESSAGE.foundData)
    }
}