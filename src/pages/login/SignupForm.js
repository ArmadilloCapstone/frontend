import './style.css';

export const SignupForm = (props) => {
  return (
    <div className="signup">
      <div className="title">회원가입</div>
      <div className="box name">
        <div className="name">이름</div>
        <input type="text"/>
      </div>
      <div className="box className">
        <div className="name">학과</div>
        <input type="text"/>
      </div>
      <div className="box phone">
        <div className="name">전화번호</div>
        <input type="text"/>
      </div>
      <div className="box pw">
        <div className="name">비밀번호</div>
        <input type="password"/>
      </div>
      <div className="box nickname last">
        <div className="name">닉네임</div>
        <div className="sidBox">
            <input type="text"/>
        </div>
      </div>
      <div className="loginButton" Onclick="register()">회원가입</div>
    </div>
  );
}