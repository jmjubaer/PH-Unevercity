import { z } from "zod";

// UserName ValidationSchema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .max(50, "First name cannot exceed 50 characters")
    .trim()
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      { message: "First name should be in capitalized format" }
    ),
  middleName: z.string().max(50, "Middle name cannot exceed 50 characters").trim().optional(),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .max(50, "Last name cannot exceed 50 characters")
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name should contain only alphabetic characters",
    }),
});

// Guardian ValidationSchema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .nonempty("Father's name is required")
    .max(100, "Father's name cannot exceed 100 characters")
    .trim(),
  fatherOccupation: z
    .string()
    .nonempty("Father's occupation is required")
    .max(100, "Father's occupation cannot exceed 100 characters")
    .trim(),
  fatherContactNo: z
    .string()
    .nonempty("Father's contact number is required")
    .max(15, "Father's contact number cannot exceed 15 characters")
    .trim(),
  motherName: z
    .string()
    .nonempty("Mother's name is required")
    .max(100, "Mother's name cannot exceed 100 characters")
    .trim(),
  motherOccupation: z
    .string()
    .nonempty("Mother's occupation is required")
    .max(100, "Mother's occupation cannot exceed 100 characters")
    .trim(),
  motherContactNo: z
    .string()
    .nonempty("Mother's contact number is required")
    .max(15, "Mother's contact number cannot exceed 15 characters")
    .trim(),
});

// Local Guardian ValidationSchema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .nonempty("Local guardian's name is required")
    .max(100, "Local guardian's name cannot exceed 100 characters")
    .trim(),
  occupation: z
    .string()
    .nonempty("Local guardian's occupation is required")
    .max(100, "Local guardian's occupation cannot exceed 100 characters")
    .trim(),
  contactNo: z
    .string()
    .nonempty("Local guardian's contact number is required")
    .max(15, "Local guardian's contact number cannot exceed 15 characters")
    .trim(),
  address: z
    .string()
    .nonempty("Local guardian's address is required")
    .max(255, "Local guardian's address cannot exceed 255 characters")
    .trim(),
});

// Student ValidationSchema
const studentValidationSchema = z.object({
  id: z.string().nonempty("Student ID is required").trim(),
  password: z.string().nonempty("Password is required").max(20),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"], { message: "{VALUE} is an invalid gender" }),
  dateOfBirth: z.string().trim().optional(),
  email: z
    .string()
    .nonempty("Email is required")
    .max(100, "Email cannot exceed 100 characters")
    .trim(),
  contactNo: z
    .string()
    .nonempty("Contact number is required")
    .max(15, "Contact number cannot exceed 15 characters")
    .trim(),
  emergencyContactNo: z
    .string()
    .nonempty("Emergency contact number is required")
    .max(15, "Emergency contact number cannot exceed 15 characters")
    .trim(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z
    .string()
    .nonempty("Present address is required")
    .max(255, "Present address cannot exceed 255 characters")
    .trim(),
  permanentAddress: z
    .string()
    .nonempty("Permanent address is required")
    .max(255, "Permanent address cannot exceed 255 characters")
    .trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().trim().optional(),
  isActive: z.enum(["active", "blocked"], { message: "{VALUE} is an invalid status" }),
  isDeleted: z.boolean().default(false),
});

export { studentValidationSchema };
