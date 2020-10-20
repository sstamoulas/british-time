import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
  const instructorRef = firestore.collection('instructors').doc(instructorId);
  const snapShot = await instructorRef.get();

  return snapShot.data();
}

export const createInstructorDetailsDocument = async (userId, userName, instructorDetails) => {
  const instructorRef = firestore.doc(`instructors/${userId}`);
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
  const instructorRef = firestore.doc(`instructors/${userId}`);
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

  // *** Instructor Course API ***

export const getAllInstructorCourses = async () => {
  const collectionRef = firestore.collection('instructor-courses');
  const snapShot = await collectionRef.get();

  return convertInstructorCoursesCollectionsSnapshotToMap(snapShot);
}

export const getCoursesByInstructorId = async (instructorId) => {
  const collectionRef = firestore.collection('instructor-courses');
  const snapShot = await collectionRef.get();

  const collectionOfInstructorCourses = convertInstructorCoursesCollectionsSnapshotToMap(snapShot);
  const coursesByInstructorId = Object.entries(collectionOfInstructorCourses)
    .map(([key, value]) => value)
    .filter((instructorCourse) => instructorCourse.instructorId === instructorId);

  return coursesByInstructorId;
}

export const getInstructorCourseByCourseId = async (courseId) => {
  const docRef = firestore.collection('instructor-courses').doc(courseId);
  const snapShot = await docRef.get();

  return snapShot.data();
}

export const createInstructorCourseDetailsDocument = async (instructorId, courseDetails) => {
  const docRef = firestore.collection('instructor-courses').doc();
  const snapShot = await docRef.get();
  const createdAt = new Date();

  if(!snapShot.exists) {
    try {
      await docRef.set({
        ...courseDetails,
        courseId: courseDetails.id,
        instructorId,
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

export const convertInstructorCoursesCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { 
      courseId, 
      instructorId, 
      courseName, 
      courseDays, 
      startDate, 
      endDate, 
      isVisible, 
      createdAt,
    } = doc.data();

    return {
      id: doc.id,
      courseId, 
      instructorId, 
      courseName, 
      courseDays, 
      startDate, 
      endDate, 
      isVisible, 
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
      courseName: course.courseName,
    });
  } catch(error) {
    console.log('error updating course', error.message);
  }

  return docRef;
}

export const convertCoursesCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { courseName } = doc.data();

    return {
      id: doc.id,
      courseName,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

export default firebase;
