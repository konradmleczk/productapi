const {createPool} = require("mysql2/promise");

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.BASENAME,
    namedPlaceholders: true,
    decimalNumbers: true,
});

module.exports = {
    pool,
};
