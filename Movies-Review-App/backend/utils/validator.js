import { body, validationResult } from "express-validator";

// Custom email validation
const validateEmail = (email) => {
  // Simple email format validation
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

// Validate if the password meets minimum requirements (e.g., at least 8 characters)
const validatePassword = (password) => {
  return password.length >= 8;
};

// Validator for the registration fields using express-validator
const registerValidators = [
  body("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name can only contain letters and spaces"),

  // Validate last name
  body("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last name can only contain letters and spaces"),

  // Validate email
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) => {
      if (!validateEmail(value)) {
        throw new Error("Email format is not valid");
      }
      return true;
    })
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    .withMessage("Email format is not valid"), // Disallow invalid email characters
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      if (!validatePassword(value)) {
        throw new Error("Password must be at least 8 characters long");
      }
      return true;
    }),
];

const loginValidators = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      if (!validatePassword(value)) {
        throw new Error("Invalid Password");
      }
      return true;
    }),
];

// Validate the incoming data
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Export the validators and the validation function
export { registerValidators, loginValidators, validate };
