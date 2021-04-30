import React, { Fragment } from 'react';

import './student-course-lesson.styles.scss';

const StudentCourseLesson = ({ currentLesson }) => {
  const subString = 'https://youtu.be/';
  
  return (
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
                                                      currentLesson.lessonResources.map((lessonResource) => (
                                                        <div key={lessonResource.resourceId}>
                                                        { lessonResource.resourceType === "Text" && (
                                                            <p>{lessonResource.resourceValue}</p>
                                                          )
                                                        }
                                                        { lessonResource.resourceType === "Document" && (
                                                            <span>{lessonResource.file.fileName}&nbsp;<a href={`https://docs.google.com/uc?export=download&id=${lessonResource.file.fileId}`}>Download Document</a></span>
                                                          )
                                                        }
                                                        { lessonResource.resourceType === "Audio" && (
                                                            <Fragment>
                                                              <audio controls="controls" controlsList="nodownload">
                                                                <source src={`https://docs.google.com/uc?export=download&id=${lessonResource.file.fileId}`} />
                                                              </audio>
                                                              <span><a href={`https://docs.google.com/uc?export=download&id=${lessonResource.file.fileId}`}>Download Audio</a></span>
                                                            </Fragment>
                                                          )
                                                        }
                                                        { lessonResource.resourceType === "Image" && (
                                                            <Fragment>
                                                              <img alt='resource' src={`https://docs.google.com/uc?export=download&id=${lessonResource.file.fileId}`} width="300" height="200" />
                                                              <span><a href={`https://docs.google.com/uc?export=download&id=${lessonResource.file.fileId}`}>Download Image</a></span>
                                                            </Fragment>
                                                          )
                                                        }
                                                        </div>
                                                      ))
                                                    }
                                                  </div>
                                               </div>
                                               <div className="mt-space-sm"></div>
                                            </div>
                                         </div>
                                      </div>
                                    }
                                    {
                                      currentLesson.lessonType === "Video" &&
                                      <div className="video-viewer--container--23VX7">
                                         <div className="video-player--container--YDQRW">
                                            <div className="video-player--video-wrapper--1L212 user-activity--user-inactive--2uBeO">
                                               <div id="playerId__8036556--3" className="video-js video-player--video-player--1sfof vjs-paused vjs-controls-enabled vjs-workinghover vjs-v6 vjs-user-inactive" lang="en-us" role="region" aria-label="Video Player">
                                                {
                                                  //<video className="vjs-tech" id="playerId__8036556--3_html5_api" tabIndex="-1" controls="controls" controlsList="nodownload" autoPlay data-yt2html5={currentLesson.videoId}></video>
                                                }
                                                {                                                  
                                                  <div className="vjs-tech" style={{width: '100%', height: '100%', position: 'relative'}}>
                                                    <iframe width="100%" height="100%" src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}?autoplay=1&rel=0&modestbranding=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                                    <div style={{width: '100%', height: '20%', position: 'absolute', opacity: '0', right: '0px', top: '0px'}}>&nbsp;</div>
                                                  </div>
                                                }
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
                                                                    <div tabIndex="-1" role="menuitemradio" className="dropdown-menu-link" aria-checked="true"><label className="video-viewer--autoplay-setting--3FB5q checkbox-slide checkbox-inline" title=""><input type="checkbox" onChange={() => false} checked="" /><span className="toggle-control-label checkbox-label"><span className="checkbox-slider"></span>Autoplay</span></label></div>
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
  )
}

export default StudentCourseLesson;
