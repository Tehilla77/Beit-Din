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
  const [role, setRole] = useState<number>(0)
  const [logIn, setLogIn] = useState<boolean>(false)
  const [signUp, setSignUp] = useState<boolean>(false)

//  // useEffect to watch for changes in the Redux store's user state
//   useEffect(() => {
//     if (myPersonSlice.user.id) { // Check if the user data exists
//       console.log("hey");
//      func(0);
//     }
//   }, [myPersonSlice.user]); // Re-run this effect only when user data changes


  const goToLogIn = () => {
    setLogIn(true)
    setSignUp(false)
  }
  const goToSignUp = () => {
    setLogIn(false)
    setSignUp(true)
  }

  const func = (role_id: number) => {
    console.log("role from redux", myPersonSlice.user.user_type)
    console.log("role_id", role_id)
    if (role_id == 1) {
      setRole(1)
      NavigateUser();
    } if (role_id == 2) {
      setRole(2)
    } if (role_id == 3) {
      setRole(3)
      NavigateAdmin();
    }
  }
  const NavigateAdmin = () => {
    navigate('/show-cases')
  }
  const NavigateUser = () => {
    navigate('/user-cases')
  }

  return <div className='container'><div> <h1 className='m-5 col-sm-6 text-center'>ניהול בית הדין</h1>
    {(signUp || !logIn) ? <button className={'btn btn-warning col-sm-6'} onClick={goToLogIn}>כניסה</button> : ''}
    {(logIn || !signUp) ? <button className={'btn btn-warning col-sm-6'} onClick={goToSignUp}>הרשמה</button> : ''}
    {signUp ? <SignUp funcSetUserId={func}> </SignUp> : ''}
    {logIn ? <LogIn funcParentAdd={func}> </LogIn> : ''}
  </div></div>
}

export default OpenWebsite