const createStudentIntoDb = async (studentData: TStudent) => {
    // const result = await Student.create(studentData); // built in static method
  
    // built in instance method ==============================
    const studentInstance = new Student(studentData); // create a instance by StudentModel class.
  
    // custom method ==============================
    if (await studentInstance.isUserExists(studentData.id)) {
      throw new Error('Student ID already exists');
    }
  
    // built in instance method ==============================
    const result = await studentInstance.save(); // save the instance into database.  // save() returns promise.
  
    return result;
  };

  export const userServices = {
    createStudentIntoDb
  }
  