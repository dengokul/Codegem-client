import { object, string, mixed, addMethod, ref, array } from "yup";

addMethod(mixed, "isDateValid", isDateValid);

function getErrorsFromValidationError(validationError: any) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors: any, error: any) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}

function handleErrorMeg(msg: string, schema: any) {
  try {
    schema.validateSync(msg, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}

function isDateValid(msg: string) {
  return mixed().test("isDateValid", msg, function (value: any) {
    value = parseInt(value, 10);
    if (!value || isNaN(value)) return false;
    var isValid = new Date(value).getTime() > 0;
    return isValid;
  });
}

// Validation section

// Login Validation
export function loginValidate(values: any) {
  return handleErrorMeg(values, loginSchema);
}

const loginSchema = object().shape({
  username: string().required("Username cannot be empty"),
  password: string().required("Password cannot be empty"),
});
