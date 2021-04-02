import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentCourse } from '../../redux/course/course.selectors';

import { courseInfo } from './../../constants/constants';

import './course-objectives.styles.scss';

const CourseObjectives = ({ courseDetails }) => {
  const objectives = courseInfo.filter((courseInfo) => courseInfo.level == courseDetails.level)[0]?.objectives;

  return (
    <div className="course-landing-page__main-content component-margin">
      <div className="clp-component-render">
        <div className="clp-component-render">
         <div className="ud-component--course-landing-page-udlite--whatwillyoulearn">
            <div className="what-you-will-learn--what-will-you-learn--mnJ5T">
             <h2 className="udlite-heading-xl what-you-will-learn--title--hropy">What you'll learn</h2>
              <div className="what-you-will-learn--content-spacing--3btHJ">
                <ul className="unstyled-list udlite-block-list what-you-will-learn--objectives-list--2cWZN">
                  { courseDetails.level &&
                    objectives.map((courseObjective) => (
                      <li key={courseObjective}>
                        <div data-purpose="objective" className="udlite-block-list-item udlite-blok-list-item-small udlite-block-list-item-tight udlie-block-list-item-neutral udlite-text-sm">
                          <span className='udlite-icon udlite-icon-xsmall udlite-icon-color-neutral udlite-block-list-item-icon'></span>
                          <div className="udlite-block-list-item-content">
                            <span className="what-you-will-learn--objective-item--ECarc">{courseObjective}</span>
                          </div>
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
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  courseDetails: selectCurrentCourse,
});

export default connect(mapStateToProps)(CourseObjectives);
