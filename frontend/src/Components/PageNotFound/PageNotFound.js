import React from 'react';
import './PageNotFound.css';
import { ReactComponent as DogeLogo } from '../../assets/dogecoin-doge-logo.svg';

function PageNotFound() {
  return (
    <div className="pagenotfound-container">
      <div className="pagenotfound">
        <div className="pagenotfound-title">ERROR: 404</div>
        <div className="logo-container">
          <div className="wow">WOW</div>
          <div className="so-crypto">SO CRYPTO</div>
          <div className="to-the-moon">TO THE MOON</div>
          <DogeLogo className="doge-logo" />
        </div>
        <div>The page you were looking for was not found.</div>
      </div>
    </div>
  );
}

export default PageNotFound;
