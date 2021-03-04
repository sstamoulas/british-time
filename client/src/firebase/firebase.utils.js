import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();

  // *** Auth API ***

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}
 
export const doPasswordUpdate = password =>
    auth.currentUser.updatePassword(password);

  // *** User API ***

export const getAllUsers = async () => {
  const collectionRef = firestore.collection('users');
  const snapShot = await collectionRef.get();

  return convertCollectionsSnapshotToMap(snapShot);
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

export const updateUser = async (userId, userDetails) => {
  const docRef = firestore.collection('users').doc(userId);
  const snapShot = await docRef.get();
  const user = snapShot.data();

  try {
    await docRef.update({
      ...user,
      ...userDetails,
    });
  } catch(error) {
    console.log(`error updating user user/${userId}`, error.message);
  }

  return docRef;
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { createdAt, email, role, userName } = doc.data();

    return {
      id: doc.id,
      createdAt,
      email,
      role,
      userName,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.email.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

  // *** Instructor API ***

export const fetchCurrentInstructor = async (instructorId) => {
  const instructorRef = firestore.collection('users').doc(instructorId);
  const snapShot = await instructorRef.get();

  return snapShot.data();
}

export const createInstructorDetailsDocument = async (userId, userName, instructorDetails) => {
  const instructorRef = firestore.doc(`users/${userId}`);
  const snapShot = await instructorRef.get();

  if(!snapShot.exists) {
    const createdAt = new Date();

    try {
      await instructorRef.set({
        userName,
        createdAt,
        ...instructorDetails
      });
    } catch(error) {
      console.log('error creating instructor details', error.message);
    }
  }

  return instructorRef;
}

export const updateInstructorDetailsDocument = async (userId, instructorDetails) => {
  const instructorRef = firestore.doc(`users/${userId}`);
  const snapShot = await instructorRef.get();
  const instructor = snapShot.data();
  const updatedAt = new Date();

  try {
    await instructorRef.update({
      ...instructor,
      updatedAt,
      ...instructorDetails
    });
  } catch(error) {
    console.log('error updating instructor details', error.message);
  }

  return instructorRef;
}

export const updateInstructorRatingDocument = async (instructorId, oldRating, rating) => {
  const docRef = firestore.collection('users').doc(instructorId);
  const snapShot = await docRef.get();
  const instructorDetails = snapShot.data();
  let totalStudents = instructorDetails.totalStudents ? instructorDetails.totalStudents : 0;
  totalStudents = oldRating === undefined ? totalStudents + 1 : totalStudents;
  const updatedAt = new Date();

  if(oldRating === undefined) {
    oldRating = 0;
  }

  console.log('instructorDetails.rating', instructorDetails.rating);
  console.log('totalStudents', totalStudents)
  console.log('rating', rating)
  console.log('oldRating', oldRating)

  if(instructorDetails.rating) {
    rating = ((instructorDetails.rating * (oldRating == 0 ? (totalStudents - 1) : totalStudents)) - oldRating + rating)/totalStudents;
  }

  console.log('new rating', rating)

  try {
    await docRef.update({
      ...instructorDetails,
      rating,
      totalStudents,
      updatedAt,
    });
  } catch(error) {
    console.log('error updating instructor rating', error.message);
  }

  return docRef;
}

  // *** Instructor Course API ***

export const getAllInstructorCourses = async () => {
  const collectionRef = firestore.collection('instructor-courses');
  const snapShot = await collectionRef.get();

  return convertInstructorCoursesCollectionsSnapshotToMap(snapShot);
}

export const getCoursesByInstructorId = async (instructorId) => {
  const collectionRef = firestore.collection('instructor-courses').where("instructorId", "==", instructorId);
  const snapShot = await collectionRef.get();

  const collectionOfInstructorCourses = convertInstructorCoursesCollectionsSnapshotToMap(snapShot);
  const coursesByInstructorId = Object.entries(collectionOfInstructorCourses)
    .map(([key, value]) => value)
    .filter((instructorCourse) => instructorCourse.instructorId === instructorId);

  return coursesByInstructorId;
}

export const getInstructorsByCourseId = async (courseId) => {
  const docRef = firestore.collection('instructor-courses').where("courseId", "==", courseId);
  const querySnapShot = await docRef.get();
  let instructors = {};

  try {
    querySnapShot.forEach((doc) => {
      instructors[doc.id] = doc.data();
    })
  } catch(error) {
    console.log('error:', error);
  }

  return instructors;
}

export const getInstructorCourseByCourseId = async (courseId) => {
  const docRef = firestore.collection('instructor-courses').doc(courseId);
  const snapShot = await docRef.get();

  return snapShot.data();
}

export const createInstructorCourseDetailsDocument = async ({id, userName}, courseDetails) => {
  const docRef = firestore.collection('instructor-courses').doc();
  const snapShot = await docRef.get();
  const createdAt = new Date();
  const courseId = courseDetails.id;

  delete courseDetails.id;

  if(!snapShot.exists) {
    try {
      await docRef.set({
        ...courseDetails,
        courseId,
        instructorId: id,
        userName,
        createdAt,
      });
    } catch(error) {
      console.log('error creating instructor course details', error.message);
    }
  }

  return docRef;
}

export const updateInstructorCourseDetailsDocument = async (courseId, courseDetails) => {
  const docRef = firestore.collection('instructor-courses').doc(courseId);
  const updatedAt = new Date();

  try {
    await docRef.update({
      ...courseDetails,
      updatedAt,
    });
  } catch(error) {
    console.log('error updating instructor course details', error.message);
  }

  return docRef;
}

export const updateInstructorCourseRatingDocument = async (instructorCourseId, oldRating, rating) => {
  const docRef = firestore.collection('instructor-courses').doc(instructorCourseId);
  const snapShot = await docRef.get();
  const courseDetails = snapShot.data();
  let totalStudents = courseDetails.totalStudents ? courseDetails.totalStudents : 0;
  totalStudents = oldRating === undefined ? totalStudents + 1 : totalStudents;
  const updatedAt = new Date();

  if(oldRating === undefined) {
    oldRating = 0;
  }

  console.log('courseDetails.rating', courseDetails.rating);
  console.log('totalStudents', totalStudents)
  console.log('rating', rating)
  console.log('oldRating', oldRating)

  if(courseDetails.rating) {
    rating = ((courseDetails.rating * (oldRating == 0 ? (totalStudents - 1) : totalStudents)) - oldRating + rating)/totalStudents;
  }

  console.log('new rating', rating)

  try {
    await docRef.update({
      ...courseDetails,
      rating,
      totalStudents,
      updatedAt,
    });
  } catch(error) {
    console.log('error updating instructor course rating', error.message);
  }

  return docRef;
}

export const convertInstructorCoursesCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { 
      courseId, 
      instructorId, 
      courseName, 
      rating,
      totalStudents,
      createdAt,
    } = doc.data();

    return {
      id: doc.id,
      courseId, 
      instructorId, 
      courseName, 
      rating,
      totalStudents,
      createdAt,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

  // *** Course API ***

export const getAllCourses = async () => {
  const collectionRef = firestore.collection('courses');
  const snapShot = await collectionRef.get();

  return convertCoursesCollectionsSnapshotToMap(snapShot);
}

export const getCourseById = async (courseId) => {
  const docRef = firestore.collection('courses').doc(courseId);
  const snapShot = await docRef.get();

  return snapShot.data();
}

export const createCourseDocument = async (course) => {
  const docRef = firestore.collection('courses/').doc();

  try {
    await docRef.set({
      ...course,
    });
  } catch(error) {
    console.log('error creating course', error.message);
  }

  return docRef;
}

export const updateCourseDocument = async (course) => {
  const docRef = firestore.collection('courses/').doc(course.id);

  try {
    await docRef.update({
      ...course,
    });
  } catch(error) {
    console.log('error updating course', error.message);
  }

  return course;
}

export const convertCoursesCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { courseName, headline } = doc.data();

    return {
      id: doc.id,
      courseName,
      headline,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

  // *** Lesson API ***

export const getLessonsByCourseId = async (instructorCourseId) => {
  const docRef = firestore.collection('lessons').where("courseId", "==", instructorCourseId);
  const snapShot = await docRef.get();

  return convertLessonsDocSnapshotToMap(snapShot);
}

export const getLessonByLessonId = async (lessonId) => {
  const docRef = firestore.collection('lessons').doc(lessonId);
  const snapShot = await docRef.get();

  return snapShot.data();
}

export const createLessonDocument = async (lesson) => {
  const docRef = firestore.collection('lessons/').doc();
  const createdAt = new Date();

  try {
    await docRef.set({
      ...lesson,
      createdAt,
    });
  } catch(error) {
    console.log('error creating lesson', error.message);
  }

  return docRef;
}

export const updateLessonDocument = async (lessonId, lesson) => {
  const docRef = firestore.collection('lessons/').doc(lessonId);

  try {
    await docRef.update({
      ...lesson,
    });
  } catch(error) {
    console.log('error updating lesson', error.message);
  }

  return docRef;
}

export const convertLessonsDocSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { courseId, chapterTitle, lessons, createdAt } = doc.data();

    return {
      id: doc.id,
      courseId,
      chapterTitle,
      lessons,
      createdAt,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

  // *** Student API ***

export const getCurrentStudent = async (studentId) => {
  const studentRef = firestore.collection('users').doc(studentId);
  const snapShot = await studentRef.get();

  return snapShot.data();
}

export const createStudentDetailsDocument = async (userId, userName, studentDetails) => {
  const studentRef = firestore.doc(`users/${userId}`);
  const snapShot = await studentRef.get();

  if(!snapShot.exists) {
    const createdAt = new Date();

    try {
      await studentRef.set({
        userName,
        createdAt,
        ...studentDetails
      });
    } catch(error) {
      console.log('error creating student details', error.message);
    }
  }

  return studentRef;
}

export const updateStudentDetailsDocument = async (userId, studentDetails) => {
  const studentRef = firestore.doc(`users/${userId}`);
  const snapShot = await studentRef.get();
  const student = snapShot.data();
  const updatedAt = new Date();

  try {
    await studentRef.update({
      ...student,
      updatedAt,
      ...studentDetails
    });
  } catch(error) {
    console.log('error updating student details', error.message);
  }

  return studentRef;
}

  // *** Student Course API ***

export const getAllStudentCourses = async () => {
  const collectionRef = firestore.collection('student-courses');
  const snapShot = await collectionRef.get();

  return convertStudentCoursesCollectionsSnapshotToMap(snapShot);
}

export const getCoursesByStudentId = async (studentId) => {
  let collectionRef = firestore.collection('student-courses').where("studentId", "==", studentId);
  let snapShot = await collectionRef.get();

  const collectionOfStudentCourses = convertStudentCoursesCollectionsSnapshotToMap(snapShot);

  return Promise.all(await Object.entries(collectionOfStudentCourses)
    .map(async ([key, value]) => {
      return {studentCourseId: value.id, instructorCourseId: value.instructorCourseId, ...(await getInstructorCourseByCourseId(value.instructorCourseId))}
    }));
}

export const getStudentCourseByCourseId = async (courseId) => {
  const docRef = firestore.collection('student-courses').doc(courseId);
  const snapShot = await docRef.get();

  return snapShot.data();
}

export const createStudentCourseDetailsDocument = async (studentId, courseDetails) => {
  const docRef = firestore.collection('student-courses').doc();
  const snapShot = await docRef.get();
  const createdAt = new Date();

  console.log('createStudentCourseDetailsDocument', courseDetails)

  if(!snapShot.exists) {
    const { courseId, instructorId, instructorCourseId, courseName, userName } = courseDetails;
    try {
      await docRef.set({
        courseId, 
        studentId, 
        instructorId,
        instructorCourseId,
        courseName, 
        rating: 0,
        userName,
        createdAt,
      });
    } catch(error) {
      console.log('error creating student course details', error.message);
    }
  }

  return docRef;
}

export const updateStudentCourseDetailsDocument = async (courseId, courseDetails) => {
  const docRef = firestore.collection('student-courses').doc(courseId);
  const updatedAt = new Date();

  try {
    const { courseId, studentId, instructorId, instructorCourseId, courseName, rating, review, userName } = courseDetails;
    await docRef.update({
      courseId, 
      studentId, 
      instructorId,
      instructorCourseId,
      courseName, 
      rating,
      review,
      userName,
      updatedAt,
    });
  } catch(error) {
    console.log('error updating student course details', error.message);
  }

  return docRef;
}

export const convertStudentCoursesCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { 
      courseId, 
      studentId, 
      instructorId,
      instructorCourseId,
      courseName, 
      rating,
      userName,
      createdAt,
      updatedAt,
    } = doc.data();

    return {
      id: doc.id,
      courseId, 
      studentId, 
      instructorId,
      instructorCourseId,
      courseName,  
      rating,
      userName,
      createdAt,
      updatedAt,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

  // *** Payment API ***

export const getPaymentsByUserId = async (userId) => {
  let docRef = firestore.collection('payment-history').doc(userId);
  let snapShot = await docRef.get();

  return snapShot.data();
}

export const createPaymentsDocument = async (userId) => {
  const docRef = firestore.collection('payment-history').doc(userId);
  const snapShot = await docRef.get();
  const createdAt = new Date();

  if(!snapShot.exists) {
    try {
      await docRef.set({
        transactions: [],
      });
    } catch(error) {
      console.log('error creating payment history', error.message);
    }
  }

  return docRef;
}

export const updatePaymentsDocument = async (userId, transactions) => {
  const docRef = firestore.collection('payment-history').doc(userId);
  const updatedAt = new Date();

  try {
    await docRef.update({
      transactions,
    });
  } catch(error) {
    console.log('error updating payment history', error.message);
  }

  return docRef;
}

export const addPaymentTransaction = async (userId, transaction) => {
  const docRef = firestore.collection('payment-history').doc(userId);
  const snapShot = await docRef.get();
  console.log('snapShot', snapShot)
  let { transactions } = snapShot.data();
  console.log('transactions', transactions)
  const updatedAt = new Date();

  transactions.push(transaction);

  console.log('new transactions', transactions)

  try {
    await docRef.update({
      transactions,
    });
  } catch(error) {
    console.log('error updating payment history', error.message);
  }

  return docRef;
}

export default firebase;
