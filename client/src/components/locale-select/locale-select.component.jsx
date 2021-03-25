import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './locale-select.styles.scss';

const languages = {
  'ar': 'عربي',
  'el': 'Ελληνικά',
  'en': 'English',
  'tr': 'Türkçe',
};
 
const LocaleSelect = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(window.localStorage.getItem('language') || navigator.language.substring(0, 2));
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [btnPosition, setBtnPosition] = useState({ offsetLeft: 0, offsetTop: 0 });

  useEffect(() => {
    i18n.changeLanguage(lang);

    const content = document.querySelector(".content");
    content.dir = i18n.dir();

    const outsideClick = (event) => {
      if(isPopoverOpen) {
        const flyoutElement = document.getElementsByClassName("react-tiny-popover-container")[0];
        let targetElement = event.target; // clicked element

        do {
          if (targetElement === flyoutElement) {
            // This is a click inside. Do nothing, just return.
            // document.getElementById("flyout-debug").textContent = "Clicked inside!";
            setIsPopoverOpen(isPopoverOpen);
          }
          // Go up the DOM
          targetElement = targetElement.parentNode;
        } while (targetElement);

        // This is a click outside.
        setIsPopoverOpen(false);
      }
    }

    window.addEventListener("resize", setItemWidth);
    window.addEventListener('click', outsideClick);

    return () => {
      window.removeEventListener("resize", setItemWidth);
      window.removeEventListener("click", outsideClick);
    }
  }, [i18n, lang, isPopoverOpen]);

  useEffect(() => {
    const btn = document.querySelector(".locale-select--select-button--DVnTw");

    setBtnPosition(prevState => ({ 
      ...prevState, 
      offsetLeft: btn.offsetLeft, 
      offsetTop: btn.offsetTop,
    }));
  }, [isPopoverOpen])


  const setItemWidth = () => {
    const btn = document.querySelector(".locale-select--select-button--DVnTw");

    setBtnPosition(prevState => ({ 
      ...prevState, 
      offsetLeft: btn.offsetLeft, 
      offsetTop: btn.offsetTop,
    }));
  }

  const changeHandler = (language) => {
    window.localStorage.setItem('language', language);
    setLang(language);
  }

  return (
    <Fragment>
      <div className="locale-select-container ud-component--footer--locale-select react-tiny-popover-container" style={{display: isPopoverOpen ? 'block' : 'none', overflow: 'visible', height: '306px', top: (btnPosition.offsetTop - (Object.keys(languages).length * 43) - 4), left: btnPosition.offsetLeft, position: 'absolute'}}>
        <div id="u68-popper-content--6" className="locale-select--popover--ir6OZ udlite-popper-open popper--popper--19faV popper--popper-content--2KQmm udlite-popover-dropdown-menu">
          <div className="popover--popover--t3rNO popover--popover--top--22FW9">
            <div className="popover--inner--373-v">
              <ul className="unstyled-list udlite-block-list locale-select--language-list--2OB0j">
                {
                  Object.entries(languages).map(([code, language]) => (
                    <li key={code}>
                      <div onClick={() => changeHandler(code)} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                        <div className="udlite-block-list-item-content">{language}</div>
                      </div>
                    </li>
                  ))
                }
                {
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Deutsch</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Español</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Français</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Bahasa Indonesia</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Italiano</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">日本語</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">한국어</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Nederlands</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Polski</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Português</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Română</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Русский</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">ภาษาไทย</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('tr')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">Türkçe</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">中文(简体)</div>
                  //   </div>
                  // </li>
                  // <li>
                  //   <div onClick={() => setLang('en-US')} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-sm udlite-block-list-item udlite-block-list-item-small udlite-block-list-item-neutral">
                  //     <div className="udlite-block-list-item-content">中文(繁體)</div>
                  //   </div>
                  // </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='locale-select-container ud-component--footer--locale-select'>
        <button type="button" onClick={() => setIsPopoverOpen(!isPopoverOpen)} className="udlite-btn udlite-btn-large udlite-btn-secondary udlite-heading-md locale-select--select-button--DVnTw" tabIndex="0">
          <svg id="icon-language" className='udlite-icon udlite-icon-small' viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path>
          </svg>
          <div>{languages[lang]}</div>
          <svg id="icon-collapse" className='udlite-icon udlite-icon-small' viewBox="0 0 24 24">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"></path>
          </svg>
        </button>
      </div>
    </Fragment>
  )
};
 
export default LocaleSelect;
