import {AppError} from "./errors";
import {ERROR_MESSAGE} from "../data/text.constant";


export class ValidationEngine {

    is(typeOfData: string | number | undefined, message: string) {
        if (!typeOfData) {
            throw new AppError(message)
        }
    }

    maxSign(typeOfData: string, message: string, numberOfSign: number) {
        if (typeOfData.length > numberOfSign) {
            throw new AppError(message)
        }
    }

    isSaved(typeOfData: number, message: string) {
        if (typeOfData === 0) {
            throw new AppError(message)
        }
    }

    isFound(typeOfData: [], message: string) {
        if (typeOfData.length === 0) {
            throw new AppError(message)
        }
    }


    static checkData({name, price}: { name: string, price: number }) {
        const instanceValidation = new ValidationEngine()
        instanceValidation.is(name, ERROR_MESSAGE.nameIs)
        instanceValidation.is(price, ERROR_MESSAGE.priceIs)
        instanceValidation.maxSign(name, ERROR_MESSAGE.nameMax, 100)
    }

    static checkSave(typeOfData: number) {
        const instanceValidation = new ValidationEngine()
        instanceValidation.isSaved(typeOfData, ERROR_MESSAGE.savedData)
    }

    static checkFind(typeOfData: []) {
        const instanceValidation = new ValidationEngine()
        instanceValidation.isFound(typeOfData, ERROR_MESSAGE.foundData)
    }
}