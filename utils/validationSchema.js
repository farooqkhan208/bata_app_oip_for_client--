const Joi = require("joi");

exports.Validator = class Validator {
    constructor() { }

    //********************** User Register Validate************************************* */
    validateUserRegisterJoi(data) {
        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
            language: Joi.array().required(),
            service_type: Joi.string().required(),
            plan: Joi.string(),
        });
        return schema.validateAsync(data);
    }

    //********************** User Login Validate************************************* */
    validateUserLoginJoi(data) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** User Verification Validate************************************* */
    validateUserVerifyJoi(data) {
        const schema = Joi.object({
            phone: Joi.string().required(),
            code: Joi.number().required().min(4),
        });
        return schema.validateAsync(data);
    }

    //********************** User Forget Password Validate************************************* */
    validateForgetPasswordJoi(data) {
        const schema = Joi.object({
            phone: Joi.number().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** User Forget Password Validate************************************* */
    validateResetPasswordJoi(data) {
        const schema = Joi.object({
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
            userId: Joi.number(),
        });
        return schema.validateAsync(data);
    }

    //********************** User Forget Password VERIFY CODE Validate************************************* */
    validateVerifyCodeJoi(data) {
        const schema = Joi.object({
            code: Joi.number().required(),
            phone: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** Role Validate************************************* */
    validateCreateRoleJoi(data) {
        const schema = Joi.object({
            role_name: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** Occation Validate************************************* */
    validateCreateOccationJoi(data) {
        const schema = Joi.object({
            name: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** Category Validate************************************* */
    validateCreateCategoryJoi(data) {
        const schema = Joi.object({
            category_name: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** Language Validate************************************* */
    validateCreateLanguageJoi(data) {
        const schema = Joi.object({
            language_name: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** CHANGE PASSWORD Validate************************************* */
    validateUserChangePassword(data) {
        const schema = Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** USER UPDATE Validate************************************* */
    validateUserUpdateJoi(data) {
        const schema = Joi.object({
            first_name: Joi.string(),
            last_name: Joi.string(),
            language: Joi.array(),
            profile_image: Joi.string().allow("", null)
        });
        return schema.validateAsync(data);
    }

    //********************** PACKAGE Validate************************************* */
    validateCreatePackage(data) {
        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            description: Joi.array(),
            package_limit: Joi.number().required()
        });
        return schema.validateAsync(data);
    }

    //********************** PACKAGE UESER CREATE Validate************************************* */
    validateUserCreatePackageJoi(data) {
        const schema = Joi.object({
            price: Joi.number().required(),
            package_limit: Joi.number().required()
        });
        return schema.validateAsync(data);
    }

    //********************** BOOKING INTERPRETER Validate************************************* */
    validateCreateBokkingInterpretterJoi(data) {
        const schema = Joi.object({
            translation_address: Joi.string().required(),
            additional_info: Joi.string().allow(null, ''),
            start_date: Joi.string().required(),
            end_date: Joi.string().required(),
            lat: Joi.string().required(),
            longe: Joi.string().required(),
            primary_language: Joi.array().required(),
            translating_language: Joi.array().required(),
            occasion: Joi.number().allow(null, ''),
            note_to_translator: Joi.string().allow(null, ''),
        });
        return schema.validateAsync(data);
    }

    //********************** SUBSCRIPTION Validate************************************* */
    validateSubscription(data) {
        const schema = Joi.object({
            package_id: Joi.string().required(),
            stripeToken: Joi.string().required(),
        });
        return schema.validateAsync(data);
    }

    //********************** SUBSCRIPTION Validate************************************* */
    validateCreateInterpreterJoi(data) {
        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
            language: Joi.array().required(),
            role_id: Joi.string(),
        });
        return schema.validateAsync(data);
    }

    //********************** COMMENT AND RATING Validate************************************* */
    validateCreateCommentAndRatingJoi(data) {
        const schema = Joi.object({
            booking: Joi.number().required(),
            comment: Joi.string().allow(""),
            rate: Joi.number().allow("", null),
        });
        return schema.validateAsync(data);
    }

    //********************** BOOKING ACCEPTED BY ADMIN Validate************************************* */
    validateBookingAcceptByAdminJoi(data) {
        const schema = Joi.object({
            interpreters: Joi.array().required(),
        });
        return schema.validateAsync(data);
    }

}
