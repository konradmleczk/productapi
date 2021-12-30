import express = require('express')
import {ERROR_MESSAGE} from "../data/text.constant";

export class AppError extends Error {}

const handleErr = (err:express.ErrorRequestHandler, req: express.Request, res: express.Response) => {

    res
        .status(err instanceof AppError ? 400 : 500)
        .json({
            message: err instanceof AppError ? err.message : ERROR_MESSAGE.default,
        });
};

module.exports = {
    handleErr,
    AppError,
};