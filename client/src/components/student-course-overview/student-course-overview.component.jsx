import React from 'react';

import './student-course-overview.styles.scss';

const StudentCourseOverview = ({ activeTab, isSidebarVisible }) => (
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
                             <img alt="User" aria-label="User photo" className="user-avatar user-avatar--image" data-purpose="user-avatar" height="64" width="64" src="data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 64 64&quot;%3E%3C/svg%3E" />
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
                             <img alt="User" aria-label="User photo" className="user-avatar user-avatar--image" data-purpose="user-avatar" height="64" width="64" src="data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 64 64&quot;%3E%3C/svg%3E" />
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
                             <img alt="User" aria-label="User photo" className="user-avatar user-avatar--image" data-purpose="user-avatar" height="64" width="64" src="data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 64 64&quot;%3E%3C/svg%3E" />
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
);

export default StudentCourseOverview;
