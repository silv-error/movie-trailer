import React from 'react'
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { useAuthUser } from '../../store/authUser';

const HomePage = () => {
  
  const {user} = useAuthUser();

  return (
    <div>
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage