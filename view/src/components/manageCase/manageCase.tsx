import React, { FC, useEffect, useState, useRef } from 'react';
import FileService from '../../service/file.service';
import FullCase from '../../models/FullCase';
import CaseDetails from '../case-details/case-details';
import searchIcon from '../../icons/icons8-search-24.png'
import phoneIcon from '../../icons/icons8-phone-48.png'
import emailIcon from '../../icons/icons8-email-48.png'
import idIcon from '../../icons/icons8-id-32.png'
import Discussion from '../Discussion/Discussion';

interface manageCaseProps {case:FullCase }

const manageCase: FC<manageCaseProps> = (props:manageCaseProps) => {
    function appendLeadingZeros(int: number) {
        if (int < 10) {
          return '0' + int;
        }
        return int;
      }
    return <div className='container'>    
    <div className='row'>    
        <div className='col-sm'>
    <div className="card text-end">
    <h2 className="card-text mt-2 text-center"><strong>{props.case.issue}</strong></h2>
      <h2 className="card-text mt-2 text-center">{props.case.pro_last_name} מול {props.case.def_last_name}</h2>
        <h4 className="card-title m-2">{props.case.pro_first_name} {props.case.pro_last_name} - תובע</h4>
        <p className="card-text m-2">{props.case.prosecutor_id} <img src={idIcon} className='logo' /></p>
        <p className="card-text m-2">{props.case.pro_phone} <img src={phoneIcon} className='logo' /></p>
        <p className="card-text m-2">{props.case.pro_email} <img src={emailIcon} className='logo' /></p>

        <h4 className="card-title m-2">{props.case.def_first_name} {props.case.def_last_name} - נתבע</h4>
        <p className="card-text m-2"> {props.case.defendant_id} <img src={idIcon} className='logo' /></p>
        <p className="card-text m-2"> {props.case.def_phone} <img src={phoneIcon} className='logo' /></p>
        <p className="card-text m-2"> {props.case.def_email} <img src={emailIcon} className='logo' /></p>
        <p className="card-text m-2">{`${appendLeadingZeros(new Date(props.case.last_enter).getDate())}/${appendLeadingZeros(new Date(props.case.last_enter).getMonth() + 1)}/${new Date(props.case.last_enter).getFullYear()}`} -ביקרת לאחרונה ב</p>
    </div>
    </div>
    <div className='col-sm'>
      <Discussion case_id={props.case.case_id}></Discussion>
      </div>
    </div>
    </div>
}
export default manageCase