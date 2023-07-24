export const useValidation = (inputObject, schema) => {
    let isValid = true;
    let errors = {};
    const value = schema.validate(inputObject ,{abortEarly: false});
      
    if (value.error) {
        isValid = false;
        const errorList = value.error.details;
        errorList.forEach(errorItem => { console.log('errorItem', errorItem);
            if (errorItem.context.key === "repeat_password") {
                errors[errorItem.context.key] = "Password & confirm password must match";
            } else {
                errors[errorItem.context.key] = errorItem.message;
            }
        })
    }
    return { isValid, errors };
}