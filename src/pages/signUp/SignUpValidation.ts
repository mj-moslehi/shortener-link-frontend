import Joi, {CustomHelpers} from 'joi' ;

const noOnlySpaces = (value: string, helpers: CustomHelpers) => {
    if (value.trim().length === 0) {
        return helpers.error('string.empty');
    }
    return value;
};

const userSchema = Joi.object({
    email: Joi.string().email({tlds: {allow: false}}),
    password: Joi.string()
        .empty("")
        .required()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,20}$'))
        .messages({
            'string.pattern.base': 'Password must contain at least one letter, one number, and be at least 5 and at most 20 characters long',
            'any.required': 'Password is required'
        }),
    first_name: Joi.string()
        .empty("")
        .required()
        .custom(noOnlySpaces)
        .pattern(new RegExp('^[A-Za-z ]+$'))
        .min(3)
        .max(20)
        .messages({
            'string.pattern.base': 'First name must contain only letters and spaces',
            'string.min': 'First name must be at least 3 characters long',
            'string.max': 'First name must be less than or equal to 20 characters',
            'any.required': 'First name is required',
            'string.empty': 'First name cannot contain only spaces'
        }),
    last_name: Joi.string()
        .empty("")
        .required()
        .custom(noOnlySpaces)
        .pattern(new RegExp('^[A-Za-z ]+$'))
        .min(3)
        .max(20)
        .messages({
            'string.pattern.base': 'Last name must contain only letters and spaces',
            'string.min': 'Last name must be at least 3 characters long',
            'string.max': 'Last name must be less than or equal to 20 characters',
            'any.required': 'Last name is required',
            'string.empty': 'Last name cannot contain only spaces'
        }),
    username: Joi.string()
        .empty("")
        .required()
        .custom(noOnlySpaces)
        .pattern(new RegExp('^[A-Za-z0-9]+$'))
        .min(5)
        .max(30)
        .messages({
            'string.pattern.base': 'Username must contain only letters and numbers',
            'string.min': 'Username must be at least 5 characters long',
            'string.max': 'Username must be less than or equal to 30 characters',
            'any.required': 'Username is required',
            'string.empty': 'Username cannot contain only spaces'
        })
});

export default userSchema;