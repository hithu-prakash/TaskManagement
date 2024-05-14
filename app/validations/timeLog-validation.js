const timeLogValidations = {
    taskId: {
        in: ['body'],
        exists:{
            errorMessage:"task Id is required"
        },
    notEmpty:{
        errorMessage: 'User ID cannot be empty'
        }
    },
    timeSpent: {
        in: ['body'],
        exists:{
            errorMessage:"task Id is required"
        },
        notEmpty:{
            errorMessage: 'User ID cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Time spent must be a numeric value'
        },
        custom: {
            options: (value) => {
                if (value <= 0) {
                    throw new Error("Time spent must be greater than zero");
                }
                return true;
            },
            errorMessage: 'Time spent must be greater than zero'
        }
    }
}

const timeLogUpdateValidations = {
    timeSpent: {
        in: ['body'],
        exists:{
            errorMessage:"task Id is required"
        },
        notEmpty:{
            errorMessage: 'User ID cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Time spent must be a numeric value'
        },
        custom: {
            options: (value) => {
                if (value <= 0) {
                    throw new Error("Time spent must be greater than zero");
                }
                return true;
            },
            errorMessage: 'Time spent must be greater than zero'
        }
    }
}

module.exports = {timeLogValidations,timeLogUpdateValidations};