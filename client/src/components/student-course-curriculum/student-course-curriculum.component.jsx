import React from 'react';

import './student-course-curriculum.styles.scss';

const StudentCourseCurriculum = ({ instructorLessons, loadNewContent }) => (
  <div data-purpose="curriculum-section-container">
    {
      instructorLessons.map((instructorLesson, index) => (
        <div key={index} className="section--section--BukKG" data-purpose="section-panel-0">
          <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading">
             <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section {index + 1}: {instructorLesson.chapterTitle}</span></span><span style={{position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
             <span aria-hidden="true" className='section--section-chevron--tJ4mD udi udi-angle-down'></span>
          </div>
          <ul className="section--section-list--1VLOz" style={{ display: 'none', listStyle: 'none', padding: 0 }}>
            {
              instructorLesson.lessons.map((lesson, index) => (
                <li key={lesson.lessonId} aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD" onClick={() => loadNewContent(lesson)}>
                  <div data-purpose="curriculum-item-0-0" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 1. Introduction. Duration 7min" location="[object Object]" tabIndex="0" role="link">
                    <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title="">
                    {
                      false && (
                        <input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} checked="" />
                      )
                    }                                    
                    <span className="toggle-control-label checkbox-label"></span></label>
                    <div className="curriculum-item-link--item-container--1ptOz">
                      <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>{index + 1}. {lesson.lessonTitle}</span></span><span style={{position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      ))
    }
  </div>
)

export default StudentCourseCurriculum;
