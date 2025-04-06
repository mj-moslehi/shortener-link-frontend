import joi, { CustomHelpers } from 'joi';

// Helper to reject strings with only spaces
const noOnlySpaces = (value: string, helpers: CustomHelpers) => {
    if (value.trim().length === 0) {
        return helpers.error('string.empty');
    }
    return value;
};

const validTagTitlePattern = /^[A-Za-z0-9.,;:-]+$/;

const linkSchema = joi.object({
    raw_link: joi.string().uri().required().messages({
        "any.required": "link is required",
        "string.uri": "link must be a valid URL"
    }),

    new_domain: joi.string()
        .pattern(/^[^/\s].*[^/\s]$/)
        .optional()
        .messages({
            "string.pattern.base": "Domain must not start or end with / and must not contain spaces"
        }),

    new_path: joi.string()
        .pattern(/^[^/\s].*[^/\s]$/)
        .optional()
        .messages({
            "string.pattern.base": "Path must not start or end with / and must not contain spaces"
        }),

    tag: joi.string()
        .pattern(validTagTitlePattern)
        .custom(noOnlySpaces, 'No only spaces validation')
        .optional()
        .messages({
            "string.pattern.base": "Tag can only contain letters, numbers, commas, periods, and semicolons",
            "string.empty": "Tag must not be only spaces"
        }),

    start_expiration: joi.date().iso().greater('now').optional().messages({
        "date.iso": "start expiration must be a valid date",
        "date.greater": "start expiration must be greater than now"
    }),

    end_expiration: joi.date().iso().greater(joi.ref('start_expiration')).optional().messages({
        "date.iso": "end expiration must be a valid date",
        "date.greater": "end expiration must be greater than start expiration"
    }),

    title: joi.string()
        .pattern(validTagTitlePattern)
        .custom(noOnlySpaces, 'No only spaces validation')
        .optional()
        .messages({
            "string.pattern.base": "Title can only contain letters, numbers, commas, periods, and semicolons",
            "string.empty": "Title must not be only spaces"
        }),

    private_status: joi.boolean().required().messages({
        "any.required": "private status is required"
    }),

    password: joi.when('private_status', {
        is: true,
        then: joi.string()
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,20}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one letter, one number, and be at least 5 and at most 20 characters long',
                'any.required': 'Password is required when private status is true'
            }),
        otherwise: joi.forbidden().messages({
            'any.unknown': 'Password should not be provided when private status is false'
        })
    }),
});

export default linkSchema;
