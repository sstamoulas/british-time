import React, { useState, useEffect } from 'react';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';
import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader';

import CourseLessons from '../../components/course-lessons/course-lessons.component';

import { fetchStudentCourseStart } from '../../redux/student-course/student-course.actions';
import { fetchInstructorLessonsStart } from '../../redux/instructor-lesson/instructor-lesson.actions';

import { instructorLessons } from '../../redux/instructor-lesson/instructor-lesson.selectors';
import { selectedCourseDetails } from '../../redux/student-course/student-course.selectors';

import * as ROUTES from './../../constants/routes';

import './student-course-page.styles.scss';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const isArrayEmpty = (obj) => {
  return obj.length === 0
}

const StudentCoursePage = ({ history, courseDetails, instructorLessons, fetchInstructorLessonsStart, fetchStudentCourseStart }) => {
  const { courseId } = useParams();
  const [state, setState] = useState({ ...courseDetails });
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [sideBarTop, setSideBarTop] = useState(0);
  const [sideBarHeight, setSideBarHeight] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [player, setPlayer] = useState(undefined);
  console.log(instructorLessons)
  const [currentLesson, setCurrentLesson] = useState(!isArrayEmpty(instructorLessons) && instructorLessons[0].lessons[0]);

  const { courseName } = state;
  let lessonAccordion;

  console.log('re-render')

  useEffect(() => {
    window.addEventListener('scroll', fixSideBarHeight);
    window.addEventListener('resize', fixSideBarHeight);
    window.addEventListener("resize", setCourseContentHeight);
    fixSideBarHeight();
    setCourseContentHeight();
 
    return () => {
      window.removeEventListener('scroll', fixSideBarHeight);
      window.removeEventListener('resize', fixSideBarHeight);
      window.removeEventListener('resize', setCourseContentHeight);
    };

    function fixSideBarHeight() {
      const header = document.querySelector('.header');
      const footer = document.querySelector('.udlite-footer');

      // if the footer is visible then the bottom of the sidebar should not 
      // overlap the top of the footer
      if(window.innerHeight + window.scrollY >= footer.offsetTop) {
        setSideBarHeight(footer.offsetTop - window.scrollY);
      }
      // if the footer is not visible then the sidebar should extend
      // to the bottom of the page
      else {
        setSideBarHeight(0);
      }

      // if the header is not visible then the sidebar should extend
      // to the top of the page
      if(window.scrollY >= header.getBoundingClientRect().height) {
        setSideBarTop(0);
      }
      // otherwise the top of the sidebar should not overlap the bottom of the 
      // header
      else {
        setSideBarTop(header.getBoundingClientRect().height - window.scrollY);
      }
    }

    function setCourseContentHeight() {
      const courseContentHeight = document.querySelector(".sidebar--content---4z0-");
      
      if(courseContentHeight) {
        courseContentHeight.removeAttribute("style");
        courseContentHeight.style.height = `${sideBarHeight - 57}px`;
      }

      if(window.innerWidth < 992) {
        setIsSidebarVisible(false);
      }
      else {
        setIsSidebarVisible(true);
      }
    }
  }, [sideBarTop, sideBarHeight, isSidebarVisible, activeTab]);

  useEffect(() => {
    lessonAccordion = document.querySelectorAll('.section--section-heading--2k6aW');
    lessonAccordion.forEach((elem) => elem.addEventListener("click", openClose));

    return () => {
      lessonAccordion.forEach((elem) => elem.removeEventListener("click", openClose));
    };

    function openClose() {
      let accordion = this;

      if(accordion.nextElementSibling.style.display === 'none') {
        accordion.nextElementSibling.style.display = 'block';
        accordion.children[1].classList.remove('udi-angle-down');
        accordion.children[1].classList.add('udi-angle-up');
      }
      else {
        accordion.nextElementSibling.style.display = 'none';
        accordion.children[1].classList.remove('udi-angle-up');
        accordion.children[1].classList.add('udi-angle-down');
      }
    }
  }, [lessonAccordion]);

  useEffect(() => {
    console.log('cl:', courseDetails, instructorLessons, courseDetails.instructorCourseId)
    if(isObjectEmpty(courseDetails)) {
      console.log('in if', courseDetails)
      fetchStudentCourseStart(courseId);
    }
    else if(isArrayEmpty(instructorLessons)) {
      fetchInstructorLessonsStart(courseDetails.instructorCourseId);
    }
  }, [courseId, courseDetails, instructorLessons, fetchInstructorLessonsStart, fetchStudentCourseStart])

  useEffect(() => {

    console.log('is loading...', !player)
    if(!player) {
      setPlayer(new YouTubeToHtml5({ withAudio: true }));
    }
    else {
      player.load();
    }
  }, [player, currentLesson.videoId])

  const loadNewContent = (lesson) => {
    console.log(lesson)
    setCurrentLesson(lesson)
  }

  const handleClick = (event) => {
    setActiveTab(event.target.textContent)
  }

  return !isObjectEmpty(courseDetails) && (
    <div className={`app--column-container--3AItG ${!isSidebarVisible ? 'app--no-sidebar--1naXE' : ''}`}>
      <div className="app--content-column--HC_i1">
         <div className="app--row--1ydzX app--body-container--10gJo">
            <div className="app--row-content--1lH7B">
               <div className="app--curriculum-item--2GBGE">
                  <div className="curriculum-item-view--scaled-height-limiter--1j3Pp">
                     <div className="curriculum-item-view--absolute-height-limiter--1SMqE">
                        <div className="curriculum-item-view--aspect-ratio-container--2tJ-p">
                           <div className="curriculum-item-view--content-container--2MIL1">
                              <div className="curriculum-item-view--scaled-height-limiter--1j3Pp">
                                 <div className="curriculum-item-view--absolute-height-limiter--1SMqE">
                                    <div className="curriculum-item-view--content--3ABmp user-activity--user-inactive--2uBeO curriculum-item-view--video-background--lcepY" data-purpose="curriculum-item-viewer-content">
                                       <div className="lecture-view--container--pL22J" role="region" tabIndex="0" aria-label="Section 1: Introduction and Setup, Lecture 7: Preview: SaaS - Project Management App built in section 11">


                                          {
                                            currentLesson.lessonType === "Content" &&
                                            <div className="text-viewer--scroll-container--1iy0Z">
                                               <div className="text-viewer--container--18Ayx">
                                                  <div className="text-viewer--content--3hoqQ">
                                                     <div className="a1 mb-space-md">{currentLesson.lessonTitle}</div>
                                                     <div className="p-space-md">
                                                        <div data-purpose="safely-set-inner-html:rich-text-viewer:html" className="article-asset--content--1dAQ9">
                                                          {
                                                            currentLesson.lessonResources.map((lessonResource) => console.log(lessonResource) || (
                                                              <div key={lessonResource.resourceId}>
                                                              { lessonResource.resourceType === "Text" && (
                                                                  <p>{lessonResource.resourceValue}</p>
                                                                )
                                                              }
                                                              { lessonResource.resourceType === "Document" && (
                                                                  <a href={`https://drive.google.com/uc?authuser=0&id=${lessonResource.file.fileId}&export=download`}>Download</a>
                                                                )
                                                              }
                                                              { lessonResource.resourceType === "Audio" && (
                                                                  <audio controls="controls">
                                                                    <source src={`https://docs.google.com/uc?export=download&id=${lessonResource.file.fileId}`} />
                                                                  </audio>
                                                                )
                                                              }
                                                              { lessonResource.resourceType === "Image" && (
                                                                  <img src={`https://docs.google.com/uc?export=download&id=${lessonResource.file.fileId}`} width="300" height="200" />
                                                                )
                                                              }
                                                              </div>
                                                            ))
                                                          }
                                                           <p>That was a tough video! Lots of material covered, but keep in mind that when it comes to configuration files like yml files, there is nothing better than the online documentation to get yourself familiar with them. Although it may look daunting, most developers just check out and read the documentation when they have a problem to solve. For example, here are the resources I recommend you read up on based on the previous video:<br/><br/>1. How we set up the database with username and password: (see the environment variables section)&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://hub.docker.com/_/postgres/">https://hub.docker.com/_/postgres/</a><br/><br/>2. <code>psql </code>&nbsp;command:&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.postgresql.org/docs/9.2/static/app-psql.html">https://www.postgresql.org/docs/9.2/static/app-psql.html</a><br/><br/>3. Finally, if you haven't done so already, see if you can install PostgreSQL on your machine and use a GUI like I do in the video to make sure your docker-compose file is working:&nbsp;<br/><br/><br/></p>
                                                           <p>To install PostgreSQL&nbsp;on your computer, follow the below steps:&nbsp;</p>
                                                           <p><strong>Mac:&nbsp;</strong>Follow my previous video for instructions. You will need&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://brew.sh/">homebrew</a>&nbsp;for the easiest way to set up.&nbsp;keep in mind you may have to run with the 'sudo' command.&nbsp; Or you can follow&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb">this tutorial</a>.</p>
                                                           <p><a target="_blank" rel="noopener noreferrer" href="http://www.psequel.com/">PSequel GUI</a>&nbsp;</p>
                                                           <p><strong>Windows:&nbsp;</strong>Follow&nbsp;<a target="_blank" rel="noopener noreferrer" href="http://www.postgresqltutorial.com/install-postgresql/">this tutorial</a></p>
                                                           <p><strong>Linux: Thanks to fellow student Dimitris for this great guide:</strong></p>
                                                           <p>For any of the Linux users following the course and interested in installing PostgreSQL along with a GUI (eg. pgAdmin),&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.postgresql.org/download/">their website has wonderful instructions</a>, and so does their wiki (for example,&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://wiki.postgresql.org/wiki/Apt">this link is for Debian and Ubuntu based distros</a>).&nbsp;&nbsp;</p>
                                                           <p>Also, one&nbsp;way to issue the commands you typed in the video&nbsp;to start, stop, restart PostgreSQL in Linux is:&nbsp;</p>
                                                           <div className="ud-component--base-components--code-block">
                                                              <div>
                                                                 <pre className="prettyprint linenums prettyprinted" role="presentation">
                                                                  <ol className="linenums">
                                                                    <li className="L0">
                                                                      <span className="pln">sudo systemctl start postgresql     </span>
                                                                      <span className="com"># starts the server</span>
                                                                    </li>
                                                                    <li className="L1">
                                                                      <span className="pln">sudo systemctl stop postgresql      </span>
                                                                      <span className="com"># stops it</span>
                                                                    </li>
                                                                    <li className="L2">
                                                                      <span className="pln">sudo systemctl restart postgresql   </span>
                                                                      <span className="com"># restart it</span>
                                                                    </li>
                                                                    <li className="L3">
                                                                      <span className="pln">sudo systemctl status postgresql    </span>
                                                                      <span className="com"># check the server's status</span>
                                                                    </li>
                                                                  </ol>
                                                                </pre>
                                                              </div>
                                                           </div>
                                                           <p>The "<code>createdb test</code>&nbsp;"&nbsp;command and the "<code>psql 'test'</code>&nbsp;" command are the same (at least for Debian/Ubuntu systems) from what I saw.&nbsp;</p>
                                                           <p>When it's first installed, PostgreSQL just has the 'postgres' user, and the way to initially enter PostgreSQL is by typing&nbsp;&nbsp;<code>sudo su - postgres</code>&nbsp;, and then&nbsp;<code>psql</code>&nbsp;.&nbsp; After Andrei creates the 'test' database, we can create a user with the same name as our current logged in user, to be a database administrator. This way we can just type in&nbsp;<code>psql 'test'</code>&nbsp; from the command line and enter the database without the need of logging in as&nbsp;the 'postgres' user,&nbsp;just like Andrei does in the lecture. This can be done with&nbsp;<code>CREATE USER your-user-name-here WITH SUPERUSER;</code>&nbsp;, and we can verify that he was created with&nbsp;<code>\du</code>&nbsp;. Now we can exit by typing&nbsp;<code>\q</code>&nbsp; and then&nbsp;<code>exit</code>&nbsp;, and enter our database just like Andrei does, with&nbsp;<code>psql 'test'</code>&nbsp;.&nbsp;</p>
                                                           <p>Lastly, with pgAdmin4 we need to create a connection with the server the first time we use it, and this is done by right-clicking 'Servers' on the left pane, and choosing 'Create' &gt; 'Server'. We give our server a name, and in the 'Connection' tab we type in 'localhost' as the host, just like Andrei shows in the lecture, and press 'Save'.&nbsp;</p>
                                                        </div>
                                                     </div>
                                                     <div className="mt-space-sm"></div>
                                                  </div>
                                               </div>
                                            </div>
                                          }


                                          {
                                            console.log(currentLesson) || currentLesson.lessonType === "Video" &&
                                            <div className="video-viewer--container--23VX7">
                                               <div className="video-player--container--YDQRW">
                                                  <div className="video-player--video-wrapper--1L212 user-activity--user-inactive--2uBeO">
                                                     <div id="playerId__8036556--3" className="video-js video-player--video-player--1sfof vjs-paused vjs-controls-enabled vjs-workinghover vjs-v6 vjs-user-inactive" lang="en-us" role="region" aria-label="Video Player">
                                                        <video className="vjs-tech" id="playerId__8036556--3_html5_api" tabIndex="-1" controls="controls" controlsList="nodownload" autoPlay data-yt2html5={currentLesson.videoId}></video>
                                                        <div className="vjs-control-bar user-activity--hide-when-user-inactive--pDPGx" dir="ltr">
                                                           <div className="control-bar--popover-area--1LX56"></div>
                                                           <div className="vjs-progress-control vjs-control">
                                                              <div tabIndex="0" className="vjs-progress-holder vjs-slider vjs-slider-horizontal sneak-peek--sneak-peek-wrapper--252xq" role="slider" aria-valuenow="0.00" aria-valuemin="0" aria-valuemax="100" aria-label="Progress Bar" aria-valuetext="00:00 of 11:04">
                                                                 <div className="vjs-load-progress" style={{width: '63.1924%'}}>
                                                                    <span className="vjs-control-text"><span>Loaded</span>: 0%</span>
                                                                    <div style={{left: '0.0273035%', width: '99.9727%'}}></div>
                                                                 </div>
                                                                 <div className="vjs-play-progress vjs-slider-bar" style={{width: '0%'}}><span className="vjs-control-text"><span>Progress</span>: 0%</span></div>
                                                                 <div className="sneak-peek--sneak-peek-holder--20jTn" data-purpose="video-sneak-peek-container" style={{left: '-1000px'}}>
                                                                    <img data-purpose="video-sneak-peek-image" alt="Lecture thumbnail" className="sneak-peek--sneak-peek--2Kx93" />
                                                                 </div>
                                                              </div>
                                                              <div>
                                                                 <div className="video-bookmark--wrapper--hJZqY" data-purpose="video-bookmark-item"><button aria-label="Bookmark" className="video-bookmark--label--social--1Q6CV"></button></div>
                                                              </div>
                                                           </div>
                                                           <div className="control-bar--control-bar-container--16vzi">
                                                              <div className="control-bar--control-bar--MweER">
                                                                 <button aria-pressed="false" data-purpose="play-button" aria-labelledby="popper1" type="button" className="control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-exp-play"></span></button>
                                                                 <div className="sr-only" id="popper1">Play</div>
                                                                 <button aria-label="Rewind 5 seconds" data-purpose="rewind-skip-button" aria-labelledby="popper2" tabIndex="0" type="button" className="rewind-skip-button--rewind-button--2HGPk control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-exp-skip-back"></span></button>
                                                                 <div className="sr-only" id="popper2">Rewind 5s</div>
                                                                 <div className="playback-rate--menu--1Nk3X">
                                                                    <div data-purpose="playback-rate-menu" className="menu--dropdown--3Vksr dropup btn-group">
                                                                       <button aria-label="Playback Rate" data-purpose="playback-rate-button" id="playback-rate-menu" aria-labelledby="popper3" tabIndex="0" type="button" className="control-bar-button--button--20ibv playback-rate--playback-rate--1XOKO playback-rate--playback-rate-value--3SJ7v dropdown-toggle dropdown-toggle-text">1</button>
                                                                       <div className="sr-only" id="popper3">Playback Rate</div>
                                                                       <ul role="menu" className="menu--menu--2Pw42 menu--playback-rate-menu--11hOW dropdown-menu dropdown-menu-right" aria-labelledby="playback-rate-menu" style={{maxHeight: '280px'}}>
                                                                          <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                             <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false"><span className="playback-rate--playback-rate--1XOKO">0.5</span></div>
                                                                          </li>
                                                                          <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                             <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false"><span className="playback-rate--playback-rate--1XOKO">0.75</span></div>
                                                                          </li>
                                                                          <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt active ">
                                                                             <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="true"><span className="playback-rate--playback-rate--1XOKO">1</span></div>
                                                                          </li>
                                                                          <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                             <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false"><span className="playback-rate--playback-rate--1XOKO">1.25</span></div>
                                                                          </li>
                                                                          <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                             <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false"><span className="playback-rate--playback-rate--1XOKO">1.5</span></div>
                                                                          </li>
                                                                          <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                             <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false"><span className="playback-rate--playback-rate--1XOKO">1.75</span></div>
                                                                          </li>
                                                                          <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                             <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false"><span className="playback-rate--playback-rate--1XOKO">2</span></div>
                                                                          </li>
                                                                       </ul>
                                                                    </div>
                                                                 </div>
                                                                 <button aria-label="Forward 5 seconds" data-purpose="forward-skip-button" aria-labelledby="popper4" tabIndex="0" type="button" className="forward-skip-button--forward-button--2I186 control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-exp-skip-forward"></span></button>
                                                                 <div className="sr-only" id="popper4">Forward 5s</div>
                                                                 <div className="progress-display--progress-display--B20-A" data-purpose="progress-display"><span data-purpose="current-time">0:00</span><span> / </span><span data-purpose="duration">11:04</span></div>
                                                                 <button data-purpose="add-bookmark" aria-labelledby="popper5" tabIndex="0" type="button" className="control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-create-note"></span></button>
                                                                 <div className="sr-only" id="popper5">Add note</div>
                                                                 <div className="control-bar--spacer--32VvX"></div>
                                                                 <div>
                                                                    <div data-purpose="volume-control-bar" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-label="Volume" tabIndex="0" className="volume-control--slider-focus-wrapper--1DEg2 volume-control--invisible-unless-focussed--3LHfG">
                                                                       <div id="slider--308" className="volume-control--slider--3BRkN">
                                                                          <div className="volume-control--slider-inner--2f-Tu" style={{height: '100%'}}></div>
                                                                       </div>
                                                                    </div>
                                                                    <button aria-label="Mute" data-purpose="volume-control-button" type="button" className="control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-exp-volume"></span></button>
                                                                 </div>
                                                                 <button data-purpose="transcript-toggle" aria-labelledby="popper6" tabIndex="0" type="button" className="control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-file-text"></span></button>
                                                                 <div className="sr-only" id="popper6">Transcript</div>
                                                                 <div data-purpose="captions-menu-button" className="menu--dropdown--3Vksr dropup btn-group">
                                                                    <button id="captions-menu" aria-labelledby="popper7" tabIndex="0" type="button" className="control-bar-button--button--20ibv dropdown-toggle dropdown-toggle-text"><span className="control-bar-button--icon--28inh udi udi-closed-caption"></span></button>
                                                                    <div className="sr-only" id="popper7">Captions</div>
                                                                    <ul role="menu" className="menu--menu--2Pw42 menu--captions-menu--beS8H dropdown-menu dropdown-menu-right" aria-labelledby="captions-menu" style={{maxHeight: '280px'}}>
                                                                       <li role="presentation" className="menu--menu--2Pw42 menu--item--2IgLt menu--menu--2Pw42 menu--item--2IgLt active ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="true">Off</div>
                                                                       </li>
                                                                       <li role="presentation" className="menu--menu--2Pw42 menu--item--2IgLt menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">French [Auto]</div>
                                                                       </li>
                                                                       <li role="presentation" className="menu--menu--2Pw42 menu--item--2IgLt menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">Indonesian [Auto]</div>
                                                                       </li>
                                                                       <li role="presentation" className="menu--menu--2Pw42 menu--item--2IgLt menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">Italian [Auto]</div>
                                                                       </li>
                                                                       <li role="presentation" className="menu--menu--2Pw42 menu--item--2IgLt menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">Japanese [Auto]</div>
                                                                       </li>
                                                                       <li role="presentation" className="menu--menu--2Pw42 menu--item--2IgLt menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">Portuguese [Auto]</div>
                                                                       </li>
                                                                       <li role="presentation" className="menu--menu--2Pw42 menu--item--2IgLt menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">Spanish [Auto]</div>
                                                                       </li>
                                                                       <li role="separator" className=" menu--menu--2Pw42 menu--item--2IgLt divider"></li>
                                                                       <li role="presentation" className="menu--submenu--right--r72AF menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitem" data-purpose="go-to-settings" className="dropdown-menu-link">Caption settings</div>
                                                                       </li>
                                                                    </ul>
                                                                 </div>
                                                                 <div data-purpose="settings-menu" className="menu--dropdown--3Vksr dropup btn-group">
                                                                    <button data-purpose="settings-button" id="settings-menu" aria-labelledby="popper8" tabIndex="0" type="button" className="control-bar-button--button--20ibv dropdown-toggle dropdown-toggle-text"><span className="control-bar-button--icon--28inh udi udi-settings"></span></button>
                                                                    <div className="sr-only" id="popper8">Settings</div>
                                                                    <ul role="menu" className="menu--menu--2Pw42 menu--settings-menu--26z60 dropdown-menu dropdown-menu-right" aria-labelledby="settings-menu" style={{maxHeight: '280px'}}>
                                                                       <li>
                                                                          <ul role="group" aria-label="Resolution" data-purpose="resolution-menu">
                                                                             <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                                <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">1080p</div>
                                                                             </li>
                                                                             <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                                <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">720p</div>
                                                                             </li>
                                                                             <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                                <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">576p</div>
                                                                             </li>
                                                                             <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                                <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">432p</div>
                                                                             </li>
                                                                             <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                                <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="false">360p</div>
                                                                             </li>
                                                                             <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt active ">
                                                                                <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="true">Auto</div>
                                                                             </li>
                                                                          </ul>
                                                                       </li>
                                                                       <li role="separator" className=" menu--menu--2Pw42 menu--item--2IgLt divider"></li>
                                                                       <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="true"><label className="video-viewer--autoplay-setting--3FB5q checkbox-slide checkbox-inline" title=""><input type="checkbox" onChange={() => false} checked="" onChange={() => true} onChange={() => true}/><span className="toggle-control-label checkbox-label"><span className="checkbox-slider"></span>Autoplay</span></label></div>
                                                                       </li>
                                                                       <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt disabled ">
                                                                          <div role="menuitem" disabled="" data-purpose="download-lecture" className="dropdown-menu-link"><span aria-describedby="popper9" tabIndex="0" className="video-viewer--download-lecture-tooltip-icon--3OGdJ udi udi-info-circle"></span><span>Download lecture</span></div>
                                                                       </li>
                                                                       <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div tabIndex="-1" role="menuitem" data-purpose="show-keyboard-shortcuts" className="dropdown-menu-link">Keyboard shortcuts</div>
                                                                       </li>
                                                                       <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div role="menuitem" className="dropdown-menu-link"><a className="report-abuse-launcher--menu-link--2iEhR" tabIndex="-1" data-purpose="report-technical-issue" aria-label="Report abuse"> Report technical issue</a></div>
                                                                       </li>
                                                                       <li role="presentation" className=" menu--menu--2Pw42 menu--item--2IgLt ">
                                                                          <div role="menuitem" className="dropdown-menu-link"><a className="report-abuse-launcher--menu-link--2iEhR" tabIndex="-1" data-purpose="report-abuse" aria-label="Report abuse"> Report abuse</a></div>
                                                                       </li>
                                                                    </ul>
                                                                 </div>
                                                                 <button aria-labelledby="popper10" tabIndex="0" type="button" className="control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-expand"></span></button>
                                                                 <div className="sr-only" id="popper10">Fullscreen</div>
                                                                 <button data-purpose="theatre-mode-toggle-button" aria-labelledby="popper11" tabIndex="0" type="button" className="control-bar-button--button--20ibv btn btn-text"><span className="control-bar-button--icon--28inh udi udi-horizontal-expand"></span></button>
                                                                 <div className="sr-only" id="popper11">Expand</div>
                                                              </div>
                                                           </div>
                                                        </div>
                                                        <div className="captions-display--captions-container--1-aQJ captions-display--user-inactive--2QVjh"></div>
                                                     </div>
                                                  </div>
                                               </div>
                                               <div id="bookmark-portal">
                                                  <div data-purpose="content-container" className="video-bookmark--content-container--right--1c0q-">
                                                     <div data-purpose="content" className="video-bookmark--content--right--3Wz1O"><label className="sr-only" htmlFor="bookmark-title--309">Bookmark title</label><textarea id="bookmark-title--309" disabled="" rows="1" style={{overflow: 'hidden', overflowWrap: 'break-word', height: '30px'}} defaultValue="22 people have written a note here."></textarea></div>
                                                  </div>
                                               </div>
                                               <div></div>
                                               <div className="user-activity--hide-when-user-inactive--pDPGx">
                                                  <div className="video-viewer--title-overlay--OoQ6e"></div>
                                               </div>
                                            </div>
                                          }
                                       </div>
                                       <div className="next-and-previous--container--1bSoH user-activity--hide-when-user-inactive--pDPGx">
                                          <div className="next-and-previous--crossbar--3TzVl">
                                             <div className="next-and-previous--link-container--3gfJX">
                                                <div className="item-link item-link--common--RP3fp next-and-previous--button--2BBCj" data-purpose="go-to-previous" aria-labelledby="go-to-previous-item" tabIndex="0" location="[object Object]" role="link"><span className="udi udi-angle-left"></span></div>
                                                <div className="sr-only" id="go-to-previous-item">6. Web apps built in the course - Preview series k…</div>
                                             </div>
                                             <div className="next-and-previous--link-container--3gfJX">
                                                <div className="item-link item-link--common--RP3fp next-and-previous--button--2BBCj" aria-labelledby="go-to-next-item" tabIndex="0" data-purpose="go-to-next" location="[object Object]" role="link"><span className="udi udi-angle-right"></span></div>
                                                <div className="sr-only" id="go-to-next-item">8. Preview of MessageMe chat application showcasin…</div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="app--sidebar-column--2t0E8" style={{top: `${sideBarTop}px`, display: `${!isSidebarVisible ? 'none' : ''}`}}>
            <div data-purpose="sidebar">
               <h2 className="udlite-heading-md sidebar--course-content-text--1-32R">Course content</h2>
               <div className="sidebar--content---4z0-">
                  <div data-purpose="curriculum-section-container">
                     {
                      instructorLessons.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((instructorLesson, index) => (
                        <div key={instructorLesson.id} className="section--section--BukKG" data-purpose="section-panel-0">
                          <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading">
                             <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section {index + 1}: {instructorLesson.chapterTitle}</span></span><span style={{position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                             <span aria-hidden="true" className='section--section-chevron--tJ4mD udi udi-angle-down'></span>
                          </div>
                          <ul className="section--section-list--1VLOz" style={{ display: 'none' }}>
                            {
                              instructorLesson.lessons.map((lesson, index) => (
                                <li key={lesson.lessonId} aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD" onClick={() => loadNewContent(lesson)}>
                                  <div data-purpose="curriculum-item-0-0" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 1. Introduction. Duration 7min" location="[object Object]" tabIndex="0" role="link">
                                    <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} checked="" /><span className="toggle-control-label checkbox-label"></span></label>
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
               </div>
            </div>
         </div>
         <div className="app--row--1ydzX app--dashboard--dXVM6">
            <div className="app--row-content--1lH7B">
               <div className="app--dashboard-content--r2Ce9">
                  <div className="dashboard--wrapper--2rdgA">
                     <div className="dashboard--nav-bar-row--nvapi">
                        <div className="udlite-in-udheavy dashboard--tabs-container--35kox">
                           <div className="tabs--tabs-container--3KpSm">
                              <div className="tabs--tabs-nav-buttons--1S7wK" role="tablist" data-purpose="tab-nav-buttons">
                                 <div className="carousel--container--22Ab7">
                                    <div id="scroll-port--2" aria-live="polite" className="carousel--scroll-port--2O41b carousel--grid--2dzpP carousel--scroll-lock--3AYO9">
                                       <div data-index="1" className="carousel--scroll-item--3Wciz" style={{display: `${isSidebarVisible ? 'none' : ''}`}}>
                                          <div className={`tabs--nav-button-container--P4D9D ${activeTab === 'Course Content' && 'tabs--active--2rPuV'}`}><button type="button" id="tabs--1-tab-1" aria-selected="true" role="tab" tabIndex="0" className={`udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md tabs--nav-button--1o7e_ ${activeTab === 'Course Content' && 'tabs--active--2rPuV'}`} onClick={handleClick}><span>Course Content</span></button></div>
                                       </div>
                                       <div data-index="1" className="carousel--scroll-item--3Wciz">
                                          <div className={`tabs--nav-button-container--P4D9D ${(activeTab === 'Overview' || (activeTab === 'Course Content' && isSidebarVisible)) && 'tabs--active--2rPuV'}`}><button type="button" id="tabs--1-tab-1" aria-selected="true" role="tab" tabIndex="0" className={`udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md tabs--nav-button--1o7e_ ${activeTab === 'Overview' && 'tabs--active--2rPuV'}`} onClick={handleClick}><span>Overview</span></button></div>
                                       </div>
                                       <div data-index="4" className="carousel--scroll-item--3Wciz">
                                          <div className={`tabs--nav-button-container--P4D9D ${activeTab === 'Announcements' && 'tabs--active--2rPuV'}`}><button type="button" id="tabs--1-tab-4" aria-selected="false" role="tab" tabIndex="-1" className={`udlite-btn udlite-btn-large udlite-btn-ghost udlite-heading-md tabs--nav-button--1o7e_ ${activeTab === 'Announcements' && 'tabs--active--2rPuV'}`} onClick={handleClick}><span>Announcements</span></button></div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div id="tabs--1-content-1" role="tabpanel" tabIndex="0" data-purpose="tab-container" aria-labelledby="tabs--1-tab-1" className={`tabs--tab-content--adAng ${activeTab === 'Course Content' && 'tabs--active--2rPuV'}`} style={{display: `${isSidebarVisible ? 'none' : ''}`}}>
                                <div className="dashboard--sizing-wrapper--1vQud">
                                  <div>
                                    <div data-purpose="curriculum-section-container">
                                      <div className="section--section--BukKG" data-purpose="section-panel-0" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 1: Introduction and Setup</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">10 / 12</span>|<span data-purpose="section-duration" className="ml-space-xxs">50min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-1" aria-expanded="true">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="true">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 2: The Ruby Programming Language</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-up"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">1 / 42</span>|<span data-purpose="section-duration" className="ml-space-xxs">4hr 24min</span></div>
                                        </div>
                                        <ul className="section--section-list--1VLOz">
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-0" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 12. How to get Free Live Help!. Duration 2min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} checked="" /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>12. How to get Free Live Help!</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>2min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="true" className="curriculum-item-link--curriculum-item--KX9MD curriculum-item-link--is-current--31BPo">
                                            <div data-purpose="curriculum-item-1-1" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 13. Introduction to Section 2 and Ruby. Duration 14min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>13. Introduction to Section 2 and Ruby</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>14min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-2" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 14. Introduction to Ruby - Text with directions, references and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>14. Introduction to Ruby - Text with directions, references and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-3" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 15. Working with Strings part 1. Duration 20min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>15. Working with Strings part 1</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>20min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-4" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 16. Working with Strings part 2: Getting input from user. Duration 6min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>16. Working with Strings part 2: Getting input from user</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>6min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-5" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 17. Working with Strings - Text with directions, references and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>17. Working with Strings - Text with directions, references and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-6" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 18. Homework Solution: Analyzer program code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>18. Homework Solution: Analyzer program code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-7" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 19. Working with numbers. Duration 16min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>19. Working with numbers</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>16min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-8" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 20. Working with numbers - Text with directions, references and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>20. Working with numbers - Text with directions, references and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-9" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 21. Homework Solution: Working with numbers - Analyzer. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>21. Homework Solution: Working with numbers - Analyzer</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-10" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 22. Br /ief look at comparison operators. Duration 4min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>22. Br /ief look at comparison operators</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>4min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-11" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 23. Methods. Duration 7min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>23. Methods</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>7min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-12" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 24. Br /anching if/elsif/else/end. Duration 14min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>24. Br /anching if/elsif/else/end</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>14min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-13" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 25. Methods and Br /anching - Text with directions, references and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>25. Methods and Br /anching - Text with directions, references and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-14" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 26. Arrays and Iterators. Duration 23min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>26. Arrays and Iterators</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>23min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-15" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 27. Arrays and Iterators - Text with directions, references and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>27. Arrays and Iterators - Text with directions, references and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-16" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 28. Hashes. Duration 15min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>28. Hashes</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>15min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-17" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 29. Hashes - Text with directions, references and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>29. Hashes - Text with directions, references and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-18" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 30. Homework Project: Authenticator. Duration 4min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>30. Homework Project: Authenticator</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>4min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-19" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 31. Authenticator project implementation. Duration 22min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>31. Authenticator project implementation</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>22min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-20" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 32. Text lecture: Authenticator project code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>32. Text lecture: Authenticator project code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-21" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 33. Ruby Style Guide. Duration 7min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>33. Ruby Style Guide</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>7min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-22" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 34. Ruby Style Guide - Text with directions and references. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>34. Ruby Style Guide - Text with directions and references</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-23" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 35. Homework Assignment: Area code dictionary. Duration 7min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>35. Homework Assignment: Area code dictionary</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>7min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-24" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 36. Homework Assignment: Area code dictionary - Text directions. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>36. Homework Assignment: Area code dictionary - Text directions</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-25" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 37. Solution: Area code dictionary. Duration 8min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>37. Solution: Area code dictionary</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>8min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-26" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 38. Solution: Area code dictionary. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>38. Solution: Area code dictionary</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-27" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 39. Practice what you have learnt. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>39. Practice what you have learnt</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-28" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 40. Introduction to Object Oriented Programming. Duration 13min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>40. Introduction to Object Oriented Programming</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>13min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-29" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 41. Introduction to Object Oriented Programming - Text directions, refs and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>41. Introduction to Object Oriented Programming - Text directions, refs and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-30" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 42. Attributes, getters and setters. Duration 16min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>42. Attributes, getters and setters</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>16min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-31" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 43. Attributes, getters, setters - Text directions, references and code. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>43. Attributes, getters, setters - Text directions, references and code</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-32" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 44. Final Ruby project: Classes, Modules, Mixins - 1 - bcrypt. Duration 9min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>44. Final Ruby project: Classes, Modules, Mixins - 1 - bcrypt</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>9min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-33" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 45. Final Ruby project 1 - Text follow-up. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>45. Final Ruby project 1 - Text follow-up</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-34" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 46. Final Ruby project: Classes, Modules, Mixins - 2 - methods. Duration 17min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>46. Final Ruby project: Classes, Modules, Mixins - 2 - methods</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>17min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-35" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 47. Final Ruby project 2 - Text follow-up. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>47. Final Ruby project 2 - Text follow-up</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-36" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 48. Final Ruby project: Classes, Modules, Mixins - 3 - modules. Duration 17min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>48. Final Ruby project: Classes, Modules, Mixins - 3 - modules</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>17min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-37" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 49. Final Ruby project 3 - Text follow-up. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>49. Final Ruby project 3 - Text follow-up</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-38" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 50. 'self' notation for method names. Duration 3min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>50. 'self' notation for method names</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>3min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-39" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Play 51. Final Ruby project: Classes, Modules, Mixins - 4 - include. Duration 10min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>51. Final Ruby project: Classes, Modules, Mixins - 4 - include</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-play-circle"></span></span><span>10min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-40" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start 52. Final Ruby project 4 - Text follow-up. Duration 1min" location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>52. Final Ruby project 4 - Text follow-up</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE">
                                                  <div className="curriculum-item-link--metadata--e17HG"><span className="curriculum-item-link--type--ZeQ8O"><span className="udi udi-article"></span></span><span>1min</span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li aria-current="false" className="curriculum-item-link--curriculum-item--KX9MD">
                                            <div data-purpose="curriculum-item-1-41" className="item-link item-link--common--RP3fp item-link--default-theme--YqsPR" aria-label="Start Quiz 2: Ruby Quiz. " location="[object Object]" tabIndex="0" role="link">
                                              <label className="curriculum-item-link--progress-toggle--1CMcg checkbox-inline" title=""><input data-purpose="progress-toggle-button" aria-label="Lecture completed" type="checkbox" onChange={() => false} /><span className="toggle-control-label checkbox-label"></span></label>
                                              <div className="curriculum-item-link--item-container--1ptOz">
                                                <div className="curriculum-item-link--title--zI5QT"><span width="0"><span><span>Quiz 2: Ruby Quiz</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                                <div className="curriculum-item-link--lecture-type-resource-container--2l5ZE"></div>
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-2" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 3: Introduction to Ruby on Rails</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 25</span>|<span data-purpose="section-duration" className="ml-space-xxs">2hr 24min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-3" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 4: CRUD Operations in Ruby on Rails</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 32</span>|<span data-purpose="section-duration" className="ml-space-xxs">3hr 16min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-4" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 5: Styling for your Rails Application</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 21</span>|<span data-purpose="section-duration" className="ml-space-xxs">2hr 21min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-5" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 6: Associations and Authentication Systems</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 54</span>|<span data-purpose="section-duration" className="ml-space-xxs">5hr 3min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-6" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 7: Many-To-Many Associations and Automated Testing - Integration, Functional,</span><br /><span>Unit</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 32</span>|<span data-purpose="section-duration" className="ml-space-xxs">2hr 45min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-7" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 8: Real-time Rails - MessageMe Chat app using ActionCable and web sockets</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 31</span>|<span data-purpose="section-duration" className="ml-space-xxs">3hr 18min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-8" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 9: Stock Tracker Social Media App</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 51</span>|<span data-purpose="section-duration" className="ml-space-xxs">5hr 55min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-9" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 10: Email, Custom Payment Functionality and File Uploads</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 31</span>|<span data-purpose="section-duration" className="ml-space-xxs">2hr 53min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-10" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 11: Software as a Service Project Management App</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 59</span>|<span data-purpose="section-duration" className="ml-space-xxs">6hr 41min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-11" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 12: Material Design (MaterializeCSS) as front-end</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 32</span>|<span data-purpose="section-duration" className="ml-space-xxs">5hr 57min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-12" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 13: Rails installation and usage: Mac</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 10</span>|<span data-purpose="section-duration" className="ml-space-xxs">1hr 6min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-13" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 14: Rails installation and usage: AWS Cloud9</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 5</span>|<span data-purpose="section-duration" className="ml-space-xxs">43min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-14" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 15: Rails Installation and usage: Windows</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 7</span>|<span data-purpose="section-duration" className="ml-space-xxs">13min</span></div>
                                        </div>
                                      </div>
                                      <div className="section--section--BukKG" data-purpose="section-panel-15" aria-expanded="false">
                                        <div role="button" tabIndex="0" className="section--section-heading--2k6aW" data-purpose="section-heading" aria-expanded="false">
                                          <div className="section--title--eCwjX" data-purpose="section-label"><span width="0"><span><span>Section 16: Thank you and next steps</span></span><span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}>…</span></span></div>
                                          <span aria-hidden="true" className="section--section-chevron--tJ4mD udi udi-angle-down"></span>
                                          <div className="font-text-xs"><span className="mr-space-xxs">0 / 2</span>|<span data-purpose="section-duration" className="ml-space-xxs">3min</span></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div id="tabs--1-content-1" role="tabpanel" tabIndex="0" data-purpose="tab-container" aria-labelledby="tabs--1-tab-1" className={`tabs--tab-content--adAng  ${(activeTab === 'Overview' || (activeTab === 'Course Content' && isSidebarVisible)) && 'tabs--active--2rPuV'}`}>
                                 <div className="dashboard--sizing-wrapper--1vQud">
                                    <div className="view-more-container--view-more--25_En">
                                       <div style={{height: '650px', overflow: 'hidden'}}>
                                          <div>
                                             <div className="course-overview--container--2OKKD" data-purpose="dashboard-overview-container">
                                                <div className="course-overview--heading--290FL" data-purpose="course-headline">
                                                   <div className="font-heading-lg mb-space-sm">About this course</div>
                                                   <p>Learn to make innovative web apps with Ruby on Rails and unleash your creativity</p>
                                                </div>
                                                <div className="course-overview--grid-row--1nKqQ">
                                                   <div>By the numbers</div>
                                                   <div data-purpose="course-main-stats">
                                                      <div>Skill level: All Levels</div>
                                                      <div>Students: 72507</div>
                                                      <div>Languages: English</div>
                                                      <div>Captions: Yes</div>
                                                   </div>
                                                   <div data-purpose="course-additional-stats">
                                                      <div>Lectures: 432</div>
                                                      <div>Video: 48 total hours</div>
                                                   </div>
                                                </div>
                                                <div className="course-overview--grid-row--1nKqQ" data-purpose="course-certificates">
                                                   <div>Certificates</div>
                                                   <div className="course-overview--wide--37Lev">
                                                      <p className="mb-space-sm">Get Udemy certificate by completing entire course</p>
                                                      <button href="" disabled="" target="_blank" data-purpose="get-udemy-certificate" type="button" className="course-overview--certificate-button--1_cXw btn btn-sm btn-default">Udemy certificate</button>
                                                   </div>
                                                </div>
                                                <div className="course-overview--grid-row--1nKqQ course-overview--course-features--2fF12" data-purpose="course-features">
                                                   <div>Features</div>
                                                   <div className="course-overview--wide--37Lev">
                                                      <span>Available on <a href="https://udemy.app.link/WtG8sAnCTbb" target="_blank" rel="noopener noreferrer">iOS</a> and <a href="https://udemy.app.link/WtG8sAnCTbb" target="_blank" rel="noopener noreferrer">Android</a></span>
                                                      <div>Coding exercises</div>
                                                   </div>
                                                </div>
                                                <div className="course-overview--grid-row--1nKqQ">
                                                   <div>Description</div>
                                                   <div className="course-overview--wide--37Lev course-overview--description--2m1iq" data-purpose="course-description">
                                                      <div data-purpose="safely-set-inner-html:trusted-html:content">
                                                         <p>Now featuring Rails 6 - the latest version of the Ruby on Rails framework.</p>
                                                         <p><strong><em>Ruby on&nbsp;Rails Web Developer average salaries by city as of January 2020 (according to Glassdoor):</em></strong></p>
                                                         <p>New York - <strong>$95,000/yr</strong>, Boston - <strong>$97,000/yr</strong>, San&nbsp;Francisco - <strong>$100,719/yr</strong></p>
                                                         <p><strong><em>Need more reasons on "why Ruby on Rails?"</em></strong> </p>
                                                         <p>Since its introduction, Ruby on Rails has rapidly become one of the most popular and powerful web application development tools for both startups and mature software companies. Some of the top sites in the world started with Ruby on Rails such as <strong>Basecamp, Twitter, Shopify, Github, LivingSocial, Groupon, Hulu, Airbnb, Yellow Pages </strong>and many more!<strong> </strong>Even after immense scaling, most of them continue to use Rails! Ruby on Rails developers <strong>routinely command the highest salaries in the tech industry!</strong></p>
                                                         <p><strong>The Complete Ruby on&nbsp;Rails Developer is:</strong></p>
                                                         <p><strong><em>#1 </em></strong>Web development course with Ruby on Rails on Udemy<strong><em>. 64,000+ students, 9500+ ratings, 57% of them are 5-star!</em></strong></p>
                                                         <p><strong><em>#1 </em></strong>Best-seller in Ruby on&nbsp;Rails since it's launch</p>
                                                         <p>This is the only course you'll need where you learn how to build everything from simple to complex, deployable,&nbsp;production-ready web applications</p>
                                                         <p><strong>This course currently features the Ruby programming language, 5 total apps -- Alpha-blog and Finance Tracker featuring Rails 6, MessageMe and University app featuring Rails 5 and a SAAS app upgrade to Rails 6 underway!</strong></p>
                                                         <p><strong>The Complete Ruby on Rails Developer Course</strong> provides a thorough introduction to Web Applications Development using the wildly popular Ruby on Rails framework. With<strong> 40+ hours</strong> of engaging video lectures and <strong>text follow-up lectures with directions, references and code</strong>, this course is designed to:</p>
                                                         <p>- Take students with no prior programming or web application development experience to accomplished web application developers specializing in Ruby on Rails.</p>
                                                         <p>- Give students with prior experience in Ruby on Rails or web development a leg up in the industry by helping them learn the ins and outs of back-end development with Rails and building complex apps at will. </p>
                                                         <p>- Give professionals and students alike the avenue by which they can switch to Ruby on Rails as the back-end development framework of choice so they can build robust web apps in very quick time and bring their ideas to life.</p>
                                                         <p>Current web apps built in the course (6):</p>
                                                         <p>Sections 4 - 7: Alpha blog - CRUD&nbsp;functions, multiple resources, authentication system built from scratch, front-end using Bootstrap, one-to-many and many-to-many associations at DB layer, production deployment! Compatible with both Rails 4 and 5 (with repositories on each version). <strong>Built using</strong> <strong>Rails 6 (compatible with 4, 5, 6)</strong></p>
                                                         <p>Section 8: MessageMe real-time messaging app featuring ActionCable, use of&nbsp;<strong>WebSocket protocol</strong> and <strong>Semantic-UI</strong> front-end. <strong>Built using Rails 5!</strong></p>
                                                         <p>Section 9: Finance Tracker social media app - Learning to use Devise for authentication, generators, search forms, Ajax, JavaScript, search functionality, external API&nbsp;usage, <strong>secure credentials management</strong>, rapid prototyping. <strong>Built using Rails 6.</strong></p>
                                                         <p>Section 10:&nbsp;Photo App - Production email confirmation functionality, extending devise basic functionality, payment using Stripe API, file storage with AWS S3 bucket.</p>
                                                         <p>Section 11:&nbsp;SaaS Project Management App - Multi-tenancy, extending devise and incorporating payment functionality with Stripe, multi-tiered teams, email invitations within teams, restrictions based on payment tiers and more!</p>
                                                         <p>Section 12:&nbsp;University App (bonus) - Introductory Rails app (optional as beginner app for the course)&nbsp;- beginner friendly, along the lines of Alpha blog, but uses MaterializeCSS&nbsp;front-end framework instead of Bootstrap and walks through how to customize features in it. <strong>Built using Rails 5.</strong></p>
                                                         <p><strong>Ruby on Rails</strong> - introduced 15 years ago - continues to be the cool but stable framework of choice for startups since it allows for rapid development - while maintaining structure and security - as complex and disruptive business ideas are brought to life in record time.</p>
                                                         <p>This course takes a very structured approach of teaching Rails <strong><em>starting with Ruby</em></strong> - the programming language behind Rails. Everything from "Hello World" to Object Oriented Programming is covered. Students acquire skills rapidly; utilizing homework assignments, quizzes, coding exercises and free web based resources to go with the video lectures. The text lectures also provide reference material after each video, it's like having multiple books in addition to the videos to guide students through the course.</p>
                                                         <p>At first all the code is done from scratch limiting the use of shortcuts and generators so students can understand what's really going on under the hood of Rails applications and can design them the way they want. Then with solid knowledge and understanding already in place, rapid prototyping methods are introduced in later parts of the course, showing use of generators and scaffolding, finishing with a complete Software as a Service Application that can be used to launch a startup!</p>
                                                         <p>Some key features of this course are:</p>
                                                         <p>- <strong>250+</strong> lectures and <strong><em>40</em></strong>+ hours of video content</p>
                                                         <p>- <strong>Ruby</strong> programming from scratch; writing your first program to say "Hello World" to Object Oriented Programming while building multiple mini-projects along the way</p>
                                                         <p>- Local installation and development options made available for both Macs and Windows machines (that's right, Windows as well!)</p>
                                                         <p>- <strong>Git</strong> for version control, <strong>Github</strong> as code repository, <strong>Heroku</strong> for production deployment</p>
                                                         <p>- Working with <strong>Amazon Web Services S3</strong> bucket for storage, <strong>Sendgrid </strong>for production email functionality, <strong>Multi-Tenancy</strong> using Milia</p>
                                                         <p>- Custom credit card form creation and working with <strong>Stripe API</strong> to implement payment processing functionality</p>
                                                         <p>- Rails <strong>MVC</strong> structure in-depth - Models, Views, Controllers</p>
                                                         <p>- <strong>FREE live support</strong></p>
                                                         <p>- Design and conceptualization using wire-framing tools</p>
                                                         <p>- Building authentication systems from scratch at first using the default Rails stack, including admin feature, log in/logout and signup. Then learning how to use <strong>Devise</strong> and extend the basic functionality provided by Devise to customize it and speed up authentication systems</p>
                                                         <p>- <strong>Ajax, Jquery</strong>, plain JavaScript - all 3 used in different parts of the course!</p>
                                                         <p>- <strong>Bootstrap, Semantic-UI</strong> and <strong>MaterializeCSS&nbsp;(using material design concepts)</strong> for UI styling</p>
                                                         <p>- Fully automated test suites using <strong>Unit</strong>, <strong>Functional</strong> and <strong>Integration tests</strong></p>
                                                         <p>- Database associations: One-to-many, many-to-many, self-referential using ActiveRecord</p>
                                                         <p>- much, much more!</p>
                                                         <p><strong>Join today and I'll see you in the course.</strong></p>
                                                      </div>
                                                      <h4>What you’ll learn</h4>
                                                      <ul>
                                                         <li>Learn how to rapidly prototype ideas and turn them into presentable apps</li>
                                                         <li>Become a professional web application developer</li>
                                                         <li>Become a professional Ruby on Rails developer</li>
                                                         <li>Design and build virtually any web application you can imagine</li>
                                                         <li>Apply for jobs at software companies as Ruby on Rails developer</li>
                                                      </ul>
                                                      <h4>Are there any course requirements or prerequisites?</h4>
                                                      <ul>
                                                         <li>Modern browser and internet connection</li>
                                                         <li>No prior programming or web app development experience necessary</li>
                                                      </ul>
                                                      <h4>Who this course is for:</h4>
                                                      <ul>
                                                         <li>Anyone who wants to be a web app developer: This is a complete course which starts with Ruby and ends with creating multiple web apps with Rails 5 &amp; 6.</li>
                                                         <li>Anyone who wants to learn to code: Ruby is a language built with programmer happiness in mind</li>
                                                         <li>Anyone who wants to bring their web app ideas to life</li>
                                                         <li>Anyone who wants to start their own startup with their own apps</li>
                                                      </ul>
                                                   </div>
                                                </div>
                                                <div className="course-overview--grid-row--1nKqQ">
                                                   <div>Instructor</div>
                                                   <div className="course-overview--wide--37Lev">
                                                      <div className="instructor-profile--header-row--n0Prm">
                                                         <img alt="User photo" aria-label="User photo" className="user-avatar user-avatar--image" data-purpose="user-avatar" height="64" width="64" src="data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 64 64&quot;%3E%3C/svg%3E" />
                                                         <div className="instructor-profile--title-wrapper--2V1u6">
                                                            <div className="instructor-profile--title--1rlDt"><a href="/user/robpercival/" data-purpose="instructor-url">Rob Percival</a></div>
                                                            <p>Web Developer And Teacher</p>
                                                         </div>
                                                      </div>
                                                      <div className="instructor-profile--social-links-row--14uvr"><a href="https://twitter.com/techedrob" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="Twitter" className="udi udi-twitter"></span></a><a href="https://www.facebook.com/rpcodestars" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="Facebook" className="udi udi-facebook"></span></a><a href="https://www.youtube.com/user/robpercival" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="YouTube" className="udi udi-youtube"></span></a><a href="http://www.completewebdevelopercourse.com" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="Personal website" className="udi udi-globe"></span></a></div>
                                                      <div className="instructor-profile--description--vCsKv">
                                                         <div data-purpose="safely-set-inner-html:trusted-html:content">
                                                            <p>           Hi! I'm Rob. I have a degree in Mathematics from Cambridge University and you might call me a bit of coding geek.  </p>
                                                            <p>           After building websites for friends and family for fun, I soon learned that web development was a very lucrative career choice. I gave up my successful (and sometimes stressful) job as a teacher to work part time and today, couldn't be happier.  </p>
                                                            <p>           I'm passionate about teaching kids to code, so every summer I run Code School in the beautiful city of Cambridge. I also run the popular web hosting and design service, Eco Web Hosting which leaves me free to share my secrets with people like you.  </p>
                                                            <p>    <strong>You wouldn't believe the freedom that being a web developer offers.</strong> Sign up and find out for yourself why so many people are taking and recommending this course.  I genuinely believe it's the best on the market and if you don't agree, I'll happily refund your money.  </p>
                                                            <p>           Sign up to my courses and join me in this amazing adventure today.  </p>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="course-overview--grid-row--1nKqQ">
                                                   <div>Instructor</div>
                                                   <div className="course-overview--wide--37Lev">
                                                      <div className="instructor-profile--header-row--n0Prm">
                                                         <img alt="User photo" aria-label="User photo" className="user-avatar user-avatar--image" data-purpose="user-avatar" height="64" width="64" src="data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 64 64&quot;%3E%3C/svg%3E" />
                                                         <div className="instructor-profile--title-wrapper--2V1u6">
                                                            <div className="instructor-profile--title--1rlDt"><a href="/user/mashrurhossain/" data-purpose="instructor-url">Mashrur Hossain</a></div>
                                                            <p>Technology Professional and Entrepreneur</p>
                                                         </div>
                                                      </div>
                                                      <div className="instructor-profile--social-links-row--14uvr"><a href="https://twitter.com/mashrur_hossain" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="Twitter" className="udi udi-twitter"></span></a><a href="http://www.mashrurhossain.com" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="Personal website" className="udi udi-globe"></span></a></div>
                                                      <div className="instructor-profile--description--vCsKv">
                                                         <div data-purpose="safely-set-inner-html:trusted-html:content">
                                                            <p>Hi, I'm Mashrur, I'm a full-time programming instructor specializing in programming fundamentals, web application development, machine learning and cyber security. I have been a technology professional for over a decade and have degrees in Computer Science and Economics.</p>
                                                            <p>My niche is building comprehensive career focused technology courses for students entering new/complex and challenging fields in today's technology space. This is a nice segway for me, since my real passion is building and tinkering with programming languages. I&nbsp;love everything to do with development and learning about new tools and technologies. My favorite languages are Python and Ruby on Rails, and my favorite tech fields are web app development, machine learning and data-analytics (which is where Ruby on Rails and Python fall into place nicely). I&nbsp;encourage my students to focus on these technologies as well.</p>
                                                            <p>In my past (corporate) life, I worked with Enterprise Software Systems with roles played in analysis, development, management and training. I led projects using both agile and waterfall methodologies and thus am well versed in the inner workings of the software development and delivery world.&nbsp; </p>
                                                            <p>During my time in corporate America, I realized how much I enjoyed training new hires and new team members and helping them succeed. I dedicated a good amount of time over 7 years on-boarding new analysts and developers and then worked with them to build and maintain systems which put me in a unique position to know and understand what new entrants to a field need in order to succeed. I strongly believe in focusing on fundamentals and practice; and not in shortcuts or gimmicks.&nbsp; </p>
                                                            <p>So join me for my comprehensive career-focused technology courses as I guide you through the world of web application development, machine learning and cyber security using Python, Ruby on&nbsp;Rails, MySQL and others and bringing your ideas and passions to life.&nbsp; </p>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="course-overview--grid-row--1nKqQ">
                                                   <div>Instructor</div>
                                                   <div className="course-overview--wide--37Lev">
                                                      <div className="instructor-profile--header-row--n0Prm">
                                                         <img alt="User photo" aria-label="User photo" className="user-avatar user-avatar--image" data-purpose="user-avatar" height="64" width="64" src="data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 64 64&quot;%3E%3C/svg%3E" />
                                                         <div className="instructor-profile--title-wrapper--2V1u6">
                                                            <div className="instructor-profile--title--1rlDt"><a href="/user/codestars/" data-purpose="instructor-url">Codestars by Rob Percival</a></div>
                                                            <p>Teaching the Next Generation of Coders</p>
                                                         </div>
                                                      </div>
                                                      <div className="instructor-profile--social-links-row--14uvr"><a href="https://www.youtube.com/channel/UC7Spf4ptyW2YcFlhyyGOPyQ?sub_confirmation=1" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="YouTube" className="udi udi-youtube"></span></a><a href="http://www.codestars.com" className="instructor-profile--social-profile-btn--fs2ve" target="_blank" rel="noopener noreferrer nofollow"><span aria-label="Personal website" className="udi udi-globe"></span></a></div>
                                                      <div className="instructor-profile--description--vCsKv">
                                                         <div data-purpose="safely-set-inner-html:trusted-html:content">
                                                            <p> <strong>Best-selling Udemy instructor Rob Percival wants to revolutionize the way people learn to code by making it </strong><strong>simple, logical, fun and, above all, accessible</strong>. &nbsp;But as just one man, Rob couldn’t create all the courses his students - more than half a million of them - wanted. &nbsp;</p>
                                                            <p>That’s why Rob created Codestars. &nbsp;Together, the instructors that make up the Codestars team create courses on all the topics that students want to learn in the way that students want to learn them: courses that are <strong>well-structured, super interactive, and easy to understand</strong>. &nbsp;Codestars wants to make it as easy as possible for learners of all ages and levels to build functional websites and apps. </p>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="view-more-container--view-more__button-container--gradient--CmaZZ"><button type="button" className="view-more-container--view-more__collapse-btn--1bVN9 btn btn-link">+ See more</button></div>
                                    </div>
                                 </div>
                              </div>
                              <div id="tabs--1-content-4" role="tabpanel" tabIndex="-1" data-purpose="tab-container" aria-labelledby="tabs--1-tab-4" className={`tabs--tab-content--adAng ${activeTab === 'Announcements' && 'tabs--active--2rPuV'}`}>No Announcements</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  courseDetails: selectedCourseDetails,
  instructorLessons: instructorLessons,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudentCourseStart: (courseId) => dispatch(fetchStudentCourseStart(courseId)),
  fetchInstructorLessonsStart: (instructorCourseId) => dispatch(fetchInstructorLessonsStart(instructorCourseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentCoursePage));
