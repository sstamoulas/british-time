import React from 'react';
import { useTranslation } from 'react-i18next';

import hero from'./../../assets/images/hero.jpg';

import './landing-page.styles.scss';
 
const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="ud-component--logged-in-home--billboard">
        <div data-purpose="billboard" className="billboard--billboard--3-fQr">
          <div className="billboard--image-container--2JRqQ">
            <img src={hero} width="1340" height="100" alt="" />
          </div>
          <div className="billboard--content-box--JtXUJ">
            <h1 className="udlite-heading-xxl" data-purpose="safely-set-inner-html:billboard:title">{t('billboard.title')}</h1>
            <p className="udlite-text-md" data-purpose="safely-set-inner-html:billboard:subtitle">{t('billboard.sub-title')}</p>
          </div>
        </div>
      </div>
    </div>
  )
};
 
export default LandingPage;
