import InstructorActionTypes from './instructor.types';

export const fetchInstructorDetailsStart = (instructorId) => ({
  type: InstructorActionTypes.FETCH_INSTRUCTOR_DETAILS_START,
  payload: { instructorId },
});

export const fetchInstructorDetailsSuccess = (instructorDetails) => ({
  type: InstructorActionTypes.FETCH_INSTRUCTOR_DETAILS_SUCCESS,
  payload: instructorDetails,
});

export const fetchInstructorDetailsFailure = (error) => ({
  type: InstructorActionTypes.FETCH_INSTRUCTOR_DETAILS_FAILURE,
  payload: error,
});

export const createInstructorDetailsStart = (instructorDetails) => ({
  type: InstructorActionTypes.CREATE_INSTRUCTOR_DETAILS_START,
  payload: { instructorDetails },
});

export const createInstructorDetailsSuccess = ({ instructorDetails }) => ({
  type: InstructorActionTypes.CREATE_INSTRUCTOR_DETAILS_SUCCESS,
  payload: { instructorDetails },
});

export const createInstructorDetailsFailure = (error) => ({
  type: InstructorActionTypes.CREATE_INSTRUCTOR_DETAILS_FAILURE,
  payload: error,
});

export const updateInstructorDetailsStart = (instructorDetails) => ({
  type: InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_START,
  payload: { instructorDetails },
});

export const updateInstructorDetailsSuccess = (instructorDetails) => ({
  type: InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_SUCCESS,
  payload: instructorDetails,
});

export const updateInstructorDetailsFailure = (error) => ({
  type: InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_FAILURE,
  payload: error,
});
