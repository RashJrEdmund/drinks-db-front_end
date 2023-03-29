/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import MyContext from '../context/MyContext';

import {
  updateDrinks,
  updateCategories,
  updateIngredients,
} from '../services/adminActions';

const StyledDropDown = styled.div`
  position: absolute;
  left: -100%;
  top: calc(100% + 1.8rem);
  background: linear-gradient(to bottom, #000000, #000000df, #000000cf);
  width: fit-content;
  min-width: 140px;
  height: fit-content;
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 10px;
  z-index: 6;

  &::before {
    content: ' ';
    background-color: #000;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) rotate(45deg);
    height: 30px;
    width: 30px;
    margin: 0 1rem 0 0;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    z-index: -1;
  }

  p {
    color: #a52a2a;
    text-align: left;
    line-height: 40px;
    letter-spacing: 2px;
    font-weight: 500;
    width: 100%;
    margin: 1rem 0 0;
  }

  @media only screen and (max-width: 800px) {
    left: -120%;
  }
`;
// localStorage.clear();

function ProfileAndLoginBtn({ fxn }) {
  const { currentUser } = React.useContext(MyContext);
  return <p onClick={fxn}>{currentUser ? 'Profile' : 'Login'}</p>;
}

export default function ProfileDropDown() {
  const { currentUser, setdialogueDetails, customAlert } =
    React.useContext(MyContext);
  const navigate = useNavigate();
  // localStorage.removeItem('currentUser');

  const handleChooseEdit = (type) => {
    console.log('type entered', type);
    switch (type) {
      case 'drinks':
        updateDrinks();
        break;
      case 'categories':
        updateCategories();
        break;
      case 'ingredients':
        updateIngredients();
        break;
      default:
        break;
    }
  };

  const handleLogOut = () => {
    setdialogueDetails((prev) => ({
      ...prev,
      show: true,
      job: 'Logout',
      message2: 'are you sure you want to log out',
      fxntoCall() {
        localStorage.clear();
        navigate('/logout', { replace: true });
        window.location.reload();
        customAlert('logged out');
        setdialogueDetails((previous) => ({ ...previous, show: false }));
      },
    }));
  };

  const checkUserLoggedIn = () => {
    if (currentUser) {
      navigate('/profile');
      return;
    }

    navigate('/login');
  };

  return currentUser?.is_admin ? (
    <StyledDropDown className="profile_dropdown" id="profile_dropdown">
      <p onClick={() => window.scrollTo(0, 0)}>Home</p>
      <ProfileAndLoginBtn fxn={checkUserLoggedIn} />
      <p name="drinks" onClick={(e) => handleChooseEdit(e.target.name)}>
        Drinks
      </p>
      <p name="categories" onClick={(e) => handleChooseEdit(e.target.name)}>
        Categories
      </p>
      <p name="ingredients" onClick={(e) => handleChooseEdit(e.target.name)}>
        Ingredients
      </p>

      <p onClick={handleLogOut}>Logout</p>
    </StyledDropDown>
  ) : (
    <StyledDropDown className="profile_dropdown" id="profile_dropdown">
      <p onClick={() => window.scrollTo(0, 0)}>Home</p>
      <ProfileAndLoginBtn fxn={checkUserLoggedIn} />

      {currentUser && <p onClick={handleLogOut}>Logout</p>}
    </StyledDropDown>
  );
}
