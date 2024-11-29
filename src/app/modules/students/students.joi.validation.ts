import Joi from 'joi';

// Define individual schemas for modular validation
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(50)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      "string.empty": "First name is required",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base": "First name should be in capitalized format",
    }),
  middleName: Joi.string()
    .trim()
    .max(50)
    .allow("")
    .messages({
      "string.max": "Middle name cannot exceed 50 characters",
    }),
  lastName: Joi.string()
    .trim()
    .max(50)
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.empty": "Last name is required",
      "string.max": "Last name cannot exceed 50 characters",
      "string.pattern.base": "Last name must contain only alphabets",
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Father's name is required",
      "string.max": "Father's name cannot exceed 100 characters",
    }),
  fatherOccupation: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Father's occupation is required",
      "string.max": "Father's occupation cannot exceed 100 characters",
    }),
  fatherContactNo: Joi.string()
    .trim()
    .max(15)
    .required()
    .messages({
      "string.empty": "Father's contact number is required",
      "string.max": "Father's contact number cannot exceed 15 characters",
    }),
  motherName: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Mother's name is required",
      "string.max": "Mother's name cannot exceed 100 characters",
    }),
  motherOccupation: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Mother's occupation is required",
      "string.max": "Mother's occupation cannot exceed 100 characters",
    }),
  motherContactNo: Joi.string()
    .trim()
    .max(15)
    .required()
    .messages({
      "string.empty": "Mother's contact number is required",
      "string.max": "Mother's contact number cannot exceed 15 characters",
    }),
});

const localGuardianSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Local guardian's name is required",
      "string.max": "Local guardian's name cannot exceed 100 characters",
    }),
  occupation: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Local guardian's occupation is required",
      "string.max": "Local guardian's occupation cannot exceed 100 characters",
    }),
  contactNo: Joi.string()
    .trim()
    .max(15)
    .required()
    .messages({
      "string.empty": "Local guardian's contact number is required",
      "string.max": "Local guardian's contact number cannot exceed 15 characters",
    }),
  address: Joi.string()
    .trim()
    .max(255)
    .required()
    .messages({
      "string.empty": "Local guardian's address is required",
      "string.max": "Local guardian's address cannot exceed 255 characters",
    }),
});

// Define the main student schema
const studentSchema = Joi.object({
  id: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Student ID is required",
    }),
  name: userNameSchema.required(),
  gender: Joi.string()
    .valid("male", "female", "other")
    .required()
    .messages({
      "any.only": "{#value} is an invalid gender",
      "string.empty": "Gender is required",
    }),
  dateOfBirth: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "Date of birth must be a string",
    }),
  email: Joi.string()
    .trim()
    .email()
    .max(100)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.max": "Email cannot exceed 100 characters",
      "string.email": "Email must be a valid email address",
    }),
  contactNo: Joi.string()
    .trim()
    .max(15)
    .required()
    .messages({
      "string.empty": "Contact number is required",
      "string.max": "Contact number cannot exceed 15 characters",
    }),
  emergencyContactNo: Joi.string()
    .trim()
    .max(15)
    .required()
    .messages({
      "string.empty": "Emergency contact number is required",
      "string.max": "Emergency contact number cannot exceed 15 characters",
    }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .allow("")
    .messages({
      "any.only": "{#value} is an invalid blood group",
    }),
  presentAddress: Joi.string()
    .trim()
    .max(255)
    .required()
    .messages({
      "string.empty": "Present address is required",
      "string.max": "Present address cannot exceed 255 characters",
    }),
  permanentAddress: Joi.string()
    .trim()
    .max(255)
    .required()
    .messages({
      "string.empty": "Permanent address is required",
      "string.max": "Permanent address cannot exceed 255 characters",
    }),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "Profile image must be a string",
    }),
  isActive: Joi.string()
    .valid("active", "blocked")
    .required()
    .messages({
      "any.only": "{#value} is an invalid status",
      "string.empty": "Status is required",
    })
});

export default studentSchema;
