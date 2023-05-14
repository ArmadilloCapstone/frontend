import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { EntireUserAddPage } from '../admin/entrire/EntireUserAddPage';
import { MainPage } from './MainPage';

const MainLink = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">교사</Link>
        </li>
        <li>
          <Link to="/EntireUserAddPage">관리자</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" exact={true} component={MainPage} />
        <Route path="/EntireUserAddPage" exact={true} component={EntireUserAddPage} />
        </Routes>
    </div>
  );
};

export default MainLink;