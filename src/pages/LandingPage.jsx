/* eslint-disable no-fallthrough */
import React from 'react';
import '../styles/landingPage.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const navigateToForm = (param) => {
    switch (param) {
      case 'login':
        navigate('/login');
        break;
      case 'register':
        navigate('/register');
        break;
      case 'main':
        navigate('/main');
      default:
        break;
    }
  };

  return (
    <div className="landing_page">
      <div className="alternatives">
        <div className="sub_alternatives">
          <div className="sign_up_section">
            <p>don&apos;t have an account yet?</p>
            <button
              className="sign_up_btn"
              type="button"
              name="register"
              onClick={(e) => navigateToForm(e.target.name)}
            >
              SignUp
            </button>
          </div>

          <div className="login_section">
            <p>login to existing account</p>
            <button
              className="login_btn"
              type="button"
              name="login"
              onClick={(e) => navigateToForm(e.target.name)}
            >
              Login
            </button>
          </div>
        </div>
        <div className="guest_alternative">
          <p>i am a guest user</p>
          <button
            className="guest_user"
            type="button"
            name="main"
            onClick={(e) => navigateToForm(e.target.name)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
