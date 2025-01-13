import React, { FC, useState, useRef } from 'react';
import './case-details.scss';
import ShowUsers from '../ShowUsers/ShowUsers';
import User from '../../models/User';
import Case from '../../models/Case';
import FileService from '../../service/file.service';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import emailIcon from '../../icons/icons8-email-48.png'
import fileService from '../../service/file.service';
import SignUp from '../SignUp/SignUp';


interface CaseDetailsProps { }

const CaseDetails: FC<CaseDetailsProps> = (props: CaseDetailsProps) => {
  const [isShowUsersPro, setIsShowUsersPro] = useState<boolean>(false)
  const [isShowUsersDef, setIsShowUsersDef] = useState<boolean>(false)
  const [isCreateNewPro, setIsCreateNewPro] = useState<boolean>(false)
  const [isCreateNewDef, setIsCreateNewDef] = useState<boolean>(false)
  const [proId, setProId] = useState<any>([])
  const [defId, setDefId] = useState<any>([])
  const [isProId, setIsProId] = useState<boolean>(false)
  const [isDefId, setIsDefId] = useState<boolean>(false)
  const issueRef = useRef<HTMLInputElement>(null)
  const [issue, setIssue] = useState<any>([])
  const [isIssue, setIsIssue] = useState<boolean>(false)

  function choosePro(): void {
    setIsCreateNewPro(false)
    setIsShowUsersPro(true)
  }

  function createPro(): void {
    setIsShowUsersPro(false)
    setIsCreateNewPro(true)
  }

  function chooseDef(): void {
    setIsCreateNewDef(false)
    setIsShowUsersDef(true)
  }

  function createDef(): void {
    setIsShowUsersDef(false)
    setIsCreateNewDef(true)
  }

  function addNewUser(user: User): void {
    FileService.createUser(user).then((res) => {
      if (isCreateNewPro) {
        setIsCreateNewPro(false)
        setProId(user.id)
        setIsProId(true)
      }
      else {
        setIsCreateNewDef(false)
        setDefId(user.id)
        setIsDefId(true)
      }
    }).catch((error: any) => {
      console.log(error)
    })
  }
  const setExistProId = (id: string) => {
    setProId(id)
    setIsProId(true)
  }

  const setExistDefId = (id: number) => {
    if (id != proId) {
      setDefId(id)
      setIsDefId(true)
      console.log('id')
      console.log(id)
    }
  }

  const getIssue = (event: any) => {
    const issueOfCase = issueRef.current?.value
      console.log(event.keyCode)
      const press = event.keyCode
    if (press == 13) {
      setIssue(issueOfCase)
      setIsIssue(true)
      console.log(issueOfCase)
      createCase(issueOfCase)
    }
  }

  const createCase = (issueOfCase:any)=>{
    const c = new Case(proId,defId,issueOfCase) 
    fileService.createCase(c).then((res) => {
      console.log(res.data)
    }).catch((error: any) => {
      console.log(error)
    })
  }

  return <div className='container'>
    {!isProId ? <div className="btn-group btn-group-toggle m-4" data-toggle="buttons">
      <label className="btn btn-secondary active">
        <input type="radio" name="options" id="option1" autoComplete="off" checked onClick={choosePro} /> תובע רשום
      </label>
      <label className="btn btn-secondary">
        <input type="radio" name="options" id="option2" autoComplete="off" onClick={createPro} /> תובע חדש
      </label>
    </div> : ''}
    <br />
    {isProId && !isDefId ? <div className="btn-group btn-group-toggle m-4" data-toggle="buttons">
      <label className="btn btn-secondary active">
        <input type="radio" name="options" id="option3" autoComplete="off" checked onClick={chooseDef} /> נתבע רשום
      </label>
      <label className="btn btn-secondary">
        <input type="radio" name="options" id="option4" autoComplete="off" onClick={createDef} /> נתבע חדש
      </label>
    </div> : ''}
    {isDefId && !isIssue ? <div><div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><img src={emailIcon} className='logo' /></span>
      </div><input type="text" ref={issueRef} onKeyUp={getIssue}  placeholder="press the issue" className='m-3' ></input></div></div> : ''}

    {/* {isCreateNewDef ? <div><SignUp funcSetUserId={setExistProId}>פרטי נתבע</SignUp></div> : ''}
    {isCreateNewPro ? <div><SignUp funcSetUserId={setExistProId}>פרטי תובע</SignUp></div> : ''} */}

    {!isProId && isShowUsersPro ? <ShowUsers funcSetUserId={setExistDefId}> בחר תובע</ShowUsers> : ''}
    {isProId && !isDefId && isShowUsersDef ? <ShowUsers funcSetUserId={setExistDefId}> בחר נתבע</ShowUsers> : ''}

  </div>
}

export default CaseDetails;
