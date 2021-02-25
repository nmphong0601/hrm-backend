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
        HOST: 'ec2-18-207-95-219.compute-1.amazonaws.com',
        PORT: '5432',
        USER: 'uturzzlsbciqdl',
        PWD: '464e57b73a278c460918dff6126c8094f997273406a87a3adce35594188a1124',
        DB_NAME: 'dcaf8ftun17t2m'
    }
}

module.exports = opts;