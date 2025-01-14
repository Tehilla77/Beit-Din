import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import './openWebsite.scss';
import LogIn from '../logIn/logIn';
import SignUp from '../SignUp/SignUp';

interface OpenWebsiteProps { }

const OpenWebsite: FC<OpenWebsiteProps> = () => {
  const navigate = useNavigate();
  const myPersonSlice = useSelector((myStore: any) => myStore.personSlice)
  const [logIn, setLogIn] = useState<boolean>(false)
  const [signUp, setSignUp] = useState<boolean>(false)

  // useEffect to watch for changes in the Redux store's user state
  useEffect(() => {
    if (myPersonSlice.user.user?.userRole) { // Check if the user data exists
      handleNavigation();
    }
  }, [myPersonSlice.user]); // Re-run this effect only when user data changes


  const goToLogIn = () => {
    setLogIn(true)
    setSignUp(false)
  }
  const goToSignUp = () => {
    setLogIn(false)
    setSignUp(true)
  }

  const handleNavigation = () => {
    const r = myPersonSlice.user.user.userRole
    if (r == 1) {
      navigate('/user-cases')
    } if (r == 2) {
      ///anything
    } if (r == 3) {
      navigate('/show-cases')
    }
  }

  return <div className='container'>
    <div className="text-center">
      <h1>בית הדין</h1>
      {(signUp || !logIn) &&
        <button className='btn btn-warning m-2' onClick={goToLogIn}>כניסה</button>}
      {(logIn || !signUp) &&
        <button className='btn btn-warning m-2' onClick={goToSignUp}>הרשמה</button>}
      {signUp ? <SignUp /> : ''}
      {logIn ? <LogIn /> : ''}
    </div></div>
}

export default OpenWebsite
