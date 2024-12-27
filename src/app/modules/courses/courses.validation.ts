import { z } from 'zod';

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required',
      })
      .regex(/^[^\s]+.*$/, {
        message: 'Title must not start with whitespace.',
      })
      .optional(),

    prefix: z
      .string({
        invalid_type_error: 'Prefix must be a string',
        required_error: 'Prefix is required',
      })
      .optional(),

    code: z
      .number({
        invalid_type_error: 'Code must be a number',
        required_error: 'Code is required',
      })
      .int({ message: 'Code must be an integer.' })
      .positive({ message: 'Code must be a positive number.' })
      .optional(),

    credits: z
      .number({
        invalid_type_error: 'Credits must be a number',
        required_error: 'Credits are required',
      })
      .int({ message: 'Credits must be an integer.' })
      .positive({ message: 'Credits must be a positive number.' })
      .optional(),

    preRequisiteCourse: z
      .array(
        z.object({
          course: z
            .string({
              invalid_type_error: 'Course reference must be a string',
              required_error: 'Course reference is required',
            })
            .optional(),
          isDeleted: z
            .boolean({ invalid_type_error: 'isDeleted must be a boolean' })
            .optional(),
        }),
      )
      .optional(),
  }),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required',
      })
      .regex(/^[^\s]+.*$/, {
        message: 'Title must not start with whitespace.',
      }),

    prefix: z.string({
      invalid_type_error: 'Prefix must be a string',
      required_error: 'Prefix is required',
    }),

    code: z
      .number({
        invalid_type_error: 'Code must be a number',
        required_error: 'Code is required',
      })
      .int({ message: 'Code must be an integer.' })
      .positive({ message: 'Code must be a positive number.' }),

    credits: z
      .number({
        invalid_type_error: 'Credits must be a number',
        required_error: 'Credits are required',
      })
      .int({ message: 'Credits must be an integer.' })
      .positive({ message: 'Credits must be a positive number.' }),

    preRequisiteCourse: z
      .array(
        z.object({
          course: z.string({
            invalid_type_error: 'Course reference must be a string',
            required_error: 'Course reference is required',
          }),
          isDeleted: z
            .boolean({ invalid_type_error: 'isDeleted must be a boolean' })
            .optional(),
        }),
      )
      .optional(),
  }),
});

const facultiesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string())
  })
})
export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesValidationSchema
};
