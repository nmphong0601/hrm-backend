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
        HOST: 'db4free.net',
        PORT: '3306',
        USER: 'nmp_admin',
        PWD: 'nmp_admin',
        DB_NAME: 'hrm_db'
    }
}

module.exports = opts;