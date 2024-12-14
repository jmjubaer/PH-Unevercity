import { Schema, model } from 'mongoose';
import {
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './students.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true, // for remove the unuse space
    maxLength: [50, 'First name cannot exceed 50 characters'],
    validate: {
      // custom validation
      validator: function (value: string) {
        // for get the user input value
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: 'First name should be in capitalized format',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxLength: [50, 'Middle name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxLength: [50, 'Last name cannot exceed 50 characters'],
    validate: {
      validator: (value: string) => validator.isAlpha(value), // use validator package for validation
      message: '{VALUE} is not a valid ',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true,
    maxLength: [100, "Father's name cannot exceed 100 characters"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
    trim: true,
    maxLength: [100, "Father's occupation cannot exceed 100 characters"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
    trim: true,
    maxLength: [15, "Father's contact number cannot exceed 15 characters"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true,
    maxLength: [100, "Mother's name cannot exceed 100 characters"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
    trim: true,
    maxLength: [100, "Mother's occupation cannot exceed 100 characters"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
    trim: true,
    maxLength: [15, "Mother's contact number cannot exceed 15 characters"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
    trim: true,
    maxLength: [100, "Local guardian's name cannot exceed 100 characters"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
    trim: true,
    maxLength: [
      100,
      "Local guardian's occupation cannot exceed 100 characters",
    ],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
    trim: true,
    maxLength: [
      15,
      "Local guardian's contact number cannot exceed 15 characters",
    ],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
    trim: true,
    maxLength: [255, "Local guardian's address cannot exceed 255 characters"],
  },
});

// const studentSchema = new Schema<TStudent>({ // for built in statics and instance methods.
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    // for custom <methods className=""></methods>
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is an invalid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      maxLength: [100, 'Email cannot exceed 100 characters'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
      maxLength: [15, 'Contact number cannot exceed 15 characters'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
      trim: true,
      maxLength: [15, 'Emergency contact number cannot exceed 15 characters'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is an invalid blood group',
      },
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      trim: true,
      maxLength: [255, 'Present address cannot exceed 255 characters'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
      trim: true,
      maxLength: [255, 'Permanent address cannot exceed 255 characters'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// find middleware or before find middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next(); // optional
});

// findOne middleware or before findOne middleware
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next(); // optional
});
// aggregate middleware or before aggregate middleware
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next(); // optional
});

// create model
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
