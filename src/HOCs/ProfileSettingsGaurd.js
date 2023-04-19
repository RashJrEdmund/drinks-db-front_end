import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/authentication';
import LoadingText from './LoadingText';

export default function ProfileSettingsGaurd(Component) {
  return function Gaurd() {
    const [currentUser, setCurrentUser] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
      getCurrentUser()
        .then(setCurrentUser)
        .catch(() => navigate('/', { replace: true }));
    }, []);

    return currentUser ? (
      <Component currentUser={currentUser} />
    ) : (
      <LoadingText />
    );
  };
}
