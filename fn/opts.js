var opts = {
    GENERAL: {
        EMPLOYEE_PER_PAGE: 6,
        PAY_PER_PAGE: 6,
        DEP_PER_PAGE: 6,
        JOB_PER_PAGE: 6
    },

    ACCESS_TOKEN: {
        SECRET_KEY: 'secret',
        LIFETIME: 600 // in seconds
    },

    REFRESH_TOKEN: {
        SIZE: 80
    },

    DB: {
        HOST: '127.0.0.1',
        PORT: '3306',
        USER: 'root',
        PWD: 'nmp@123',
        DB_NAME: 'hrm_db'
    }
}

module.exports = opts;