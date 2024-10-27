import React, { FC, useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import FileService from '../../service/file.service';
// import User from '../../models/User';
// import UserCases from '../UserCases/UserCases';
// import { object } from 'yup';
// import ReactDOM from 'react-dom'
import manageCase from '../manageCase/manageCase';
import CaseDetails from '../case-details/case-details';
import searchIcon from '../../icons/icons8-search-24.png'
import phoneIcon from '../../icons/icons8-phone-48.png'
import emailIcon from '../../icons/icons8-email-48.png'
import idIcon from '../../icons/icons8-id-32.png'
import ManageCase from '../manageCase/manageCase';

import { useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { getCases } from "../../Redux/features/caseSlice";
import { useNavigate, Link } from 'react-router-dom';

interface ShowCasesProps { }

const ShowCases: FC<ShowCasesProps> = () => {
  const navigate = useNavigate();
  const [Cases, setCases] = useState<any[]>([{}]);
  const [isCases, setIsCases] = useState<boolean>(false)
  const [Case, setCase] = useState<any[]>([{}]);
  const [isCase, setIsCase] = useState<boolean>(false)
  const [errGetCases, setErrGetCases] = useState<boolean>(false)
  const [ChooseCase, setChooseCase] = useState<any[]>([{}]);
  const [isChooseCase, setIsChooseCase] = useState<boolean>(false)
  const [IsNewCase, setIsNewCase] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement>(null);

  const myCaseSlice = useSelector((myStore: any) => myStore.caseSlice)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCases())
  }, []);

  function appendLeadingZeros(int: number) {
    if (int < 10) {
      return '0' + int;
    }
    return int;
  }
  // const mergeUsersAndCases=()=>{
  //   getCases()
  //   setIsCases(true)
  // }

  const getCaseById = (id: any) => {
    const caseToShow = myCaseSlice.cases.filter((c: any) => c.case_id == id)
    setChooseCase(caseToShow)
    setIsChooseCase(true)
    // navigate('manage-case/:caseId');
  }
  // const getCases = async () => {
  //   FileService.getAllCases().then((res) => {
  //     const sortCases = res.data.sort((a: any, b: any) => new Date(b.last_enter).getTime() - new Date(a.last_enter).getTime());
  //     console.log(sortCases)
  //     sortCases.splice(0,1)
  //     setCases([...sortCases])
  //   }).catch(error => {
  //     setErrGetCases(true)
  //     console.log(error)
  //   })
  // }

  const getCaseByIdFromReact = (event: any) => {
      setIsCase(false)
      let searchValue = nameRef.current?.value;
      if (searchValue?.length == 0) {
        console.log('nothing to find')
      }
      else {
        const result1 = myCaseSlice.cases.filter((i: any) => i.pro_first_name.includes(searchValue))
        const result2 = myCaseSlice.cases.filter((i: any) => i.pro_last_name.includes(searchValue))
        const result3 = myCaseSlice.cases.filter((i: any) => i.def_first_name.includes(searchValue))
        const result4 = myCaseSlice.cases.filter((i: any) => i.def_last_name.includes(searchValue))
        const result = result1.concat(result2).concat(result3).concat(result4)
        if (result.length > 0) {
          setCase(result)
          setIsCase(true)
        }
        else {
          setIsCase(false)
        }
    }
  }

  const updateDateOfCase = (id: any) => {
    FileService.updateLastEnter(id).then((res) => {
      console.log(res.data);
    }).catch(error => {
      setErrGetCases(true)
      console.log(error)
    }).catch(error => {
      console.log(error)
    })
    getCaseById(id)
  }

  return <div className='container'>
    {!IsNewCase ? <div className='col-sm-6'>
      {!isChooseCase ? <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1"><img src={searchIcon} className='logo' /></span>
        </div>
        <input type="text" className="form-control" placeholder="חפש" aria-label="Username" aria-describedby="basic-addon1" ref={nameRef} onChange={getCaseByIdFromReact}></input>
      </div> : ''}
      {isCase && !isChooseCase? <div>{Case.map((c) => {
        return (
          <div key={c.case_id} className='m-4'>
            <div className="card" >
              <button className='btn btn-light btn-block mt-3' onClick={() => { updateDateOfCase(c.case_id) }}>
                <h2 className="card-text">{c.pro_last_name} נגד {c.def_last_name}-{c.issue}</h2>
                <h4 className="card-title">{c.pro_first_name} {c.pro_last_name} -תובע</h4>
                <h4 className="card-title">{c.def_first_name} {c.def_last_name} -נתבע</h4>
                <p className="card-text">{`${appendLeadingZeros(new Date(c.last_enter).getDate())}/${appendLeadingZeros(new Date(c.last_enter).getMonth() + 1)}/${new Date(c.last_enter).getFullYear()}`}</p>
              </button>
            </div>
          </div>)
      })
      }</div> : ''}

      {!isCase && !isChooseCase ? <div>
        <button className='btn btn-primary m-5' onClick={() => navigate('/case-datails')}>להוספת תיק חדש</button>
        {myCaseSlice.cases.map((c:any) => {
          return (
            <div key={c.case_id} className='m-4'>
              <div className="card" >
                <button className='btn btn-light btn-block mt-0' onClick={() => { updateDateOfCase(c.case_id) }}>
                  <h2 className="card-text">{c.pro_last_name} נגד {c.def_last_name} - {c.issue}</h2>
                  <h4 className="card-title">{c.pro_first_name} {c.pro_last_name} -תובע</h4>
                  <h4 className="card-title">{c.def_first_name} {c.def_last_name} -נתבע</h4>
                  <p className="card-text">{`${appendLeadingZeros(new Date(c.last_enter).getDate())}/${appendLeadingZeros(new Date(c.last_enter).getMonth() + 1)}/${new Date(c.last_enter).getFullYear()}`}</p>
                </button>
              </div>
            </div>
          )
        })
        }</div> : ''}
      {isChooseCase ? <div><ManageCase case={ChooseCase[0]}></ManageCase></div> : ''}
      {errGetCases ? <p>הצגת התיקים נכשלה!!!</p> : ''}
    </div> : ''}
  </div>
}
export default ShowCases;