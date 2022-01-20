import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {BannerHead} from '../../../src/cointainer/startup/import.js';
import '../../../src/pages/i18n' 
import { useTranslation } from 'react-i18next';

import './header.css';
const Header = () => {
  const {t , i18n} = useTranslation();
  return (


  <div className="RSI__header section__padding" id="home">
    <div className="RSI__header-content pl-5">
      <Row className="pl-5">
      <h1 >{t("title")}</h1>
      </Row>

      <p>{t("sub-title")}</p>
      <div className="RSI__header-content__input">
        <Link to='/create/fundraiser/details'><button type="button">{t("start_RSI")}</button></Link>
      </div>
    </div>

    <div className="RSI__header-image">
      <img  src={BannerHead} />
    </div>
  </div>
  );
};

export default Header;
