import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';
import { Image } from 'cloudinary-react';

import CourseImage from './../../components/course-image/course-image.component';

import { updateCourseStart, fetchCourseByIdStart } from '../../redux/course/course.actions';
import { selectCurrentCourse } from '../../redux/course/course.selectors';
import * as ROUTES from './../../constants/routes';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const INITIAL_STATE = {
  hasImage: false,
  courseName: '', 
  headline: '',
  requirements: [],
  objectives: [],
}

const CourseUpdatePage = ({ history, currentCourse, fetchCourseByIdStart, updateCourseStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...INITIAL_STATE, ...currentCourse });
  const [objectiveText, setObjectiveText] = useState('');
  const [requirementText, setRequirementText] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleObjectiveTextChange = (event) => {
    setObjectiveText(event.target.value);
  }

  const handleRequirementTextChange = (event) => {
    setRequirementText(event.target.value);
  }

  const handleObjectiveAdd = () => {
    const { objectives } = state;
    const newObjectives = objectives.concat({ text: objectiveText, id: objectives.length === 0 ? 0 : objectives[objectives.length - 1].id + 1 });
 
    setObjectiveText('');
    setState(prevState => ({ ...prevState, objectives: newObjectives }));
  }

  const handleObjectiveRemove = (id) => {
    const { objectives } = state;
    const newObjectives = objectives.filter((objective) => objective.id !== id);

    setState(prevState => ({ ...prevState, objectives: newObjectives }));
  }

  const handleRequirementsAdd = () => {
    const { requirements } = state;
    const newRequirements = requirements.concat({ text: requirementText, id: requirements.length === 0 ? 0 : requirements[requirements.length - 1].id + 1 });
 
    setRequirementText('');
    setState(prevState => ({ ...prevState, requirements: newRequirements }));
  }

  const handleRequirementsRemove = (id) => {
    const { requirements } = state;
    const newRequirements = requirements.filter((objective) => objective.id !== id);
 
    setState(prevState => ({ ...prevState, requirements: newRequirements }));
  }

  const handleSubmit = (event) => {
    updateCourseStart(state);
    history.push(ROUTES.ADMIN);
    event.preventDefault();
  }

  const onUploadCallback = () => {
    updateCourseStart({...state, id: courseId, hasImage: true });
  }

  useEffect(() => {
    if(isObjectEmpty(currentCourse)) {
      fetchCourseByIdStart(courseId);
    }
    else {
      setState(prevState => ({ ...prevState, ...currentCourse }));
    }
  }, [courseId, currentCourse, fetchCourseByIdStart]);

  return !isObjectEmpty(currentCourse) && (
    <div>
      <h1>Edit Course Titled '{state.courseName}' Page</h1>
      <form onSubmit={handleSubmit}>
        <CourseImage hasImage={state.hasImage} courseId={courseId} onUploadCallback={onUploadCallback} />
        <select name='level' onChange={handleChange}>
          <option defaultValue hidden> 
            Select a Level 
          </option> 
          <option value="0">Beginner</option>
          <option value="1">Pre-Intermediate</option>
          <option value="2">Intermediate</option>
          <option value="3">Upper-Intermediate</option>
          <option value="4">Advanced</option>
        </select>
        <ul>
          {state.objectives.map((objective) => (
            <li key={objective.id}>
              <span>{objective.text}</span>
              <input type='button' value='X' onClick={() => handleObjectiveRemove(objective.id)} />
            </li>
          ))}
        </ul>
        <input type="text" value={objectiveText} onChange={handleObjectiveTextChange} />
        <button type="button" onClick={handleObjectiveAdd}>
          Add Objective
        </button>
        <ul>
          {state.requirements.map((requirement) => (
            <li key={requirement.id}>
              <span>{requirement.text}</span>
              <input type='button' value='X' onClick={() => handleRequirementsRemove(requirement.id)} />
            </li>
          ))}
        </ul>
        <input type="text" value={requirementText} onChange={handleRequirementTextChange} />
        <button type="button" onClick={handleRequirementsAdd}>
          Add Requirement
        </button>
        <input type='text' name='headline' value={state.headline || ''} onChange={handleChange} />
        <input type='text' name='courseName' value={state.courseName || ''} onChange={handleChange} />
        <input type="submit" value="Update Course" />
      </form>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentCourse: selectCurrentCourse,
});

const mapDispatchToProps = (dispatch) => ({
  updateCourseStart: (courseDetails) => dispatch(updateCourseStart(courseDetails)),
  fetchCourseByIdStart: (courseId) => dispatch(fetchCourseByIdStart(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseUpdatePage));
