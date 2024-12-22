import React, { FC, useEffect, useState, useRef } from 'react';
import './openWebsite.scss';
import FileService from '../../service/file.service';
import UserDetails from '../SignUp/SignUp';
import User from '../../models/User';
import LogIn from '../logIn/logIn';
import ShowCases from '../ShowCases/ShowCases';
import UserCases from '../UserCases/UserCases'

import { useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { getDiscussions } from "../../Redux/features/discussionSlice";
import SignUp from '../SignUp/SignUp';
import { Navigate, useNavigate } from 'react-router-dom';

interface OpenWebsiteProps { }

const OpenWebsite: FC<OpenWebsiteProps> = () => {
  const navigate = useNavigate();
  const [isUserCases, setIsUserCases] = useState<boolean>(false)
  const [logIn, setLogIn] = useState<boolean>(false)
  const [signUp, setSignUp] = useState<boolean>(false)
  const [isManager, setIsManager] = useState<boolean>(false)
  const [errLogIn, setErrLogIn] = useState<boolean>(false)
  const [errSignUp, setErrSignUp] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')
  const [IsErr, setIsErr] = useState<boolean>(false)
  const [userType, setUserType] = useState<boolean>(false)
  const [DayanType, setDayanType] = useState<boolean>(false)
  const [adminType, setAdminType] = useState<boolean>(false)

  const [userId, setUserId] = useState<any>();

  // const myDiscussionSlice = useSelector((myStore: any) => myStore.discussionSlice)
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getDiscussions())
  // }, []);

  // const logInByIdAndPassword = (user: User) => {
  //   FileService.getUserByIdAndPwd(user).then((res) => {
  //     console.log('res.data.user',res.data.user.id)
  //     if (res.data.user.user_type == 3) {
  //       console.log('manager')
  //       navigate('/show-cases')
  //     }
  //     else {
  //       setUserId(res.data.user.id)
  //       setLogIn(false)
  //       setSignUp(false)
  //       setIsUserCases(true)
  //       setErrLogIn(false)
  //     }
  //   }).catch(error => {
  //     setErrLogIn(true)
  //     setIsErr(true)
  //     setErr(error)
  //   })
  // }

  const goToLogIn = () => {
    setLogIn(true)
    setSignUp(false)
  }
  const goToSignUp = () => {
    setLogIn(false)
    setSignUp(true)
  }

  const func = (id: string, user_type: number) => {
    setUserId(id)
    if (user_type == 1)
      setUserType(true)
    if (user_type == 2)
      setDayanType(true)
    if (user_type == 3)
      setAdminType(true)
  }

  return <div className='container'><div>{!isUserCases && !isManager ? <h1 className='m-5 col-sm-6 text-center'>ניהול בית הדין</h1> : ''}
    {!isUserCases && !isManager && (signUp || !logIn) ? <button className={'btn btn-warning col-sm-6'} onClick={goToLogIn}>כניסה</button> : ''}
    {!isUserCases && !isManager && (logIn || !signUp) ? <button className={'btn btn-warning col-sm-6'} onClick={goToSignUp}>הרשמה</button> : ''}
    {signUp ? <SignUp funcSetUserId={func}> </SignUp> : ''}
    {errSignUp ? <p>אופס, היתה תקלה בהרשמה שלך</p> : ''}
    {logIn ? <LogIn funcParentAdd={func}> </LogIn> : ''}
    {errLogIn ? <p>הנתונים שהזנת שגויים</p> : ''}
    {IsErr ? <p>{err.toString()}</p> : ''}
    {/* {adminType ? navigate('/show-cases') : ''} */}

    {userType ? <UserCases userId={userId}></UserCases> : ''}
    {/* אמור להיות בסטור של הלקוח ואז לא צריך להעביר לו פרמטרים פשוט עוברים עם ניווט */}
  </div></div>
}

export default OpenWebsite