import React, { FC, useEffect, useState, useRef, Children } from 'react';
import './ShowUsers.scss';
// import { useNavigate } from 'react-router-dom';
import FileService from '../../service/file.service';
import User from '../../models/User';
import UserCases from '../UserCases/UserCases';
import { useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
// import { getUsers } from "../../Redux/features/personSlice";

interface ShowUsersProps {
  funcSetUserId:(id:number)=>void
  children:React.ReactNode
}

const ShowUsers: FC<ShowUsersProps> = (props:ShowUsersProps) => {
  const [user, setUser] = useState<any[]>([{}])
  const [isUser, setIsUser] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const [userId, setUserId] = useState<any>('')
  const [isUserId, setIsUserId] = useState<boolean>(false)

  const myPersonSlice = useSelector((myStore:any)=>myStore.personSlice)
  const dispatch = useAppDispatch();
  //  useEffect(()=>{dispatch(getUsers())})

  const getUserByNameFromReact = (event: any) => {
      setIsUser(false)
      const searchValue = nameRef.current?.value;
      if (searchValue?.length != 0) {
        const result1 = myPersonSlice.persons.filter((i:User) => i.first_name.includes('searchValue'))
        const result2 = myPersonSlice.persons.filter((i:User) => i.last_name.includes('searchValue'))
        const result = result1.concat(result2)
        setUser(result)
        if (result.length > 0) {
          console.log(user)
          setIsUser(true)
        }
      }
    }

  function updateUser(id: any) {
    setIsUserId(true)
    setUserId(id)
    props.funcSetUserId(id)
    }

  return <div>
    <h1>{props.children}</h1>
    <input type="text" ref={nameRef} onChange={getUserByNameFromReact} className='m-3' ></input>
    <label htmlFor='search'>חפש </label>
    {isUser? <div>{myPersonSlice.persons.map((u:User) => {
      return (
        <div key={u.email} className='m-4'>
          <div className="card col-sm-4" >
          <button className='btn btn-light btn-block mt-0' onClick={()=>{updateUser(u.id)}}>
          <h4 className="card-title">{u.first_name} {u.last_name}</h4>
                <p className="card-text">{u.id}</p>
                <p className="card-text">{u.email}</p>
               </button>
            </div>
          </div>)
        })
        }</div>:''}

      {!isUser ? <div>{myPersonSlice.persons.map((u:User) => {
        return (
          <div className='m-4'>
            <div className="card col-sm-4" >
              <button className='btn btn-light btn-block mt-0' onClick={()=>{updateUser(u.id)}}>
                <h4 className="card-title">{u.first_name} {u.last_name}</h4>
                <p className="card-text">{u.id}</p>
                <p className="card-text">{u.email}</p>
                </button>
            </div>
          </div>)})}
       </div> : ''}
    </div>
}
    export default ShowUsers;