import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './cta.css';

const CTA = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="RSI__cta">
      <div className="RSI__cta-content">
        <h3> {t("MailBox")}</h3>
        <div className="RSI__header-content__input-CTA">
          <Link to='/create/fundraiser/details'><button type="button"> {t("start_RSI")}</button></Link>
        </div>
      </div>
    </div>
  )
};

export default CTA;
