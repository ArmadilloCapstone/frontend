import './style.css';
import {LoginForm} from "./LoginForm";
import { SignupForm } from './SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSignup } from '../../redux/actions';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const showSignup = useSelector((state => state.showSignup))

  const clickClose = () => {
    dispatch(setShowSignup(!showSignup));
  }
  return (
    <div className='login_page'>
      {showSignup?<div class="blur"></div> : null}
      <LoginForm option="1" title="돌봄교사"/>
      <LoginForm option="2" title="학부모" />
      <LoginForm option="3" title="보호자" />
      <LoginForm option="4" title="관리자" />
      {showSignup?<span class="signupClose" onClick={clickClose}>X</span> : null}
      {showSignup?<SignupForm/> : null}
    </div>
  );
}