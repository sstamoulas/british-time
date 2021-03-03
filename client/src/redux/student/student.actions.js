import StudentActionTypes from './student.types';

export const fetchStudentDetailsStart = () => ({
  type: StudentActionTypes.FETCH_STUDENT_DETAILS_START,
});

export const fetchStudentDetailsSuccess = (studentDetails) => ({
  type: StudentActionTypes.FETCH_STUDENT_DETAILS_SUCCESS,
  payload: studentDetails,
});

export const fetchStudentDetailsFailure = (error) => ({
  type: StudentActionTypes.FETCH_STUDENT_DETAILS_FAILURE,
  payload: error,
});

export const createStudentDetailsStart = (studentDetails) => ({
  type: StudentActionTypes.CREATE_STUDENT_DETAILS_START,
  payload: { studentDetails },
});

export const createStudentDetailsSuccess = ({ studentDetails }) => ({
  type: StudentActionTypes.CREATE_STUDENT_DETAILS_SUCCESS,
  payload: { studentDetails },
});

export const createStudentDetailsFailure = (error) => ({
  type: StudentActionTypes.CREATE_STUDENT_DETAILS_FAILURE,
  payload: error,
});

export const updateStudentDetailsStart = (studentDetails) => ({
  type: StudentActionTypes.UPDATE_STUDENT_DETAILS_START,
  payload: { studentDetails },
});

export const updateStudentDetailsSuccess = (studentDetails) => ({
  type: StudentActionTypes.UPDATE_STUDENT_DETAILS_SUCCESS,
  payload: studentDetails,
});

export const updateStudentDetailsFailure = (error) => ({
  type: StudentActionTypes.UPDATE_STUDENT_DETAILS_FAILURE,
  payload: error,
});

export const updateStudentFundsStart = (userId, funds) => ({
  type: StudentActionTypes.UPDATE_STUDENT_FUNDS_START,
  payload: { userId, funds },
});

export const updateStudentFundsSuccess = () => ({
  type: StudentActionTypes.UPDATE_STUDENT_FUNDS_SUCCESS,
});

export const updateStudentFundsFailure = (error) => ({
  type: StudentActionTypes.UPDATE_STUDENT_FUNDS_FAILURE,
  payload: error,
});
