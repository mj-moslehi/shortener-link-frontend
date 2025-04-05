import Joi, {CustomHelpers} from "joi";

const noOnlySpaces = (value: string, helpers: CustomHelpers) => {
    if (value.trim().length === 0) {
        return helpers.error("string.empty");
    }
    return value;
};

const schema = Joi.object({
    password: Joi.string()
        .empty("")
        .required()
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)"))
        .min(5)
        .max(20)
        .messages({
            "string.pattern.base": "Password must contain at least one letter and one number",
            "string.min": "Password must be at least 5 characters long",
            "string.max": "Password must be less than or equal to 20 characters",
            "any.required": "Password is required",
        }),

    username: Joi.string()
        .empty("")
        .required()
        .custom(noOnlySpaces)
        .pattern(new RegExp("^[A-Za-z0-9]+$"))
        .min(5)
        .max(30)
        .messages({
            "string.pattern.base": "Username must contain only letters and numbers",
            "string.min": "Username must be at least 5 characters long",
            "string.max": "Username must be less than or equal to 30 characters",
            "any.required": "Username is required",
            "string.empty": "Username cannot contain only spaces",
        }),
});

export default schema;
