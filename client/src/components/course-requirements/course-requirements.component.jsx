import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentCourse } from '../../redux/course/course.selectors';

import { courseInfo } from './../../constants/constants';

import './course-requirements.styles.scss';

const CourseRequirements = ({ courseDetails }) => {
  const requirements = courseInfo.filter((courseInfo) => courseInfo.level == courseDetails.level)[0]?.requirements;

  return (
    <Fragment>
      <div className="course-landing-page__main-content component-margin"></div>
      <div className="course-landing-page__main-content component-margin">
        <div className="clp-component-render">
          <div className="clp-component-render">
            <div className="ud-component--course-landing-page-udlite--requirements">
              <div>
                <h2 className="udlite-heading-xl requirements--title--2j7S2">Requirements</h2>
                <ul className="unstyled-list udlite-block-list">
                  { courseDetails.level &&
                      requirements.map((courseRequirement) => (
                      <li key={courseRequirement}>
                        <div className="udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-tight udlite-block-list-item-neutral udlite-text-sm">
                          <svg aria-hidden="true" focusable="false" className="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon">
                          </svg>
                          <div className="udlite-block-list-item-content">{courseRequirement}</div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  courseDetails: selectCurrentCourse,
});

export default connect(mapStateToProps)(CourseRequirements);
