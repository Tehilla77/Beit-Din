import React from 'react';
import OpenWebsite from './components/openWebsite/openWebsite'
import UploadFile from './components/UploadFile/UploadFile';
import Discussion from './components/Discussion/Discussion';
import CreateInq from './components/CreateInq/CreateInq';
import CreateDiscussion from './components/CreateDiscussion/CreateDiscussion';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import personSlice, { getUsers } from './Redux/features/personSlice';
// import caseSlice, { getCases } from './Redux/features/caseSlice';
import {Routes,Route} from 'react-router-dom';
import caseSlice from './Redux/features/caseSlice';
import discussionSlice from './Redux/features/discussionSlice';
import ShowCases from './components/ShowCases/ShowCases';
import CaseDetails from './components/case-details/case-details';
import ManageCase from './components/manageCase/manageCase';
// import './App.scss';
// import Discussion from './components/Discussion/Discussion';
const App: React.FC = () => {

  const myStore = configureStore(
    {reducer:{personSlice,caseSlice,discussionSlice}});
  return <Provider store = {myStore}>
      <Routes>
        <Route path='' element={<OpenWebsite></OpenWebsite>}></Route>
        <Route path='/show-cases' element={<ShowCases></ShowCases>}></Route>
        <Route path='case-datails' element={<CaseDetails></CaseDetails>}></Route>
        {/* <Route path='manage-case' element={<ManageCase case={params}></ManageCase>}></Route> */}

    </Routes>
   </Provider>
  // return (<div className='App'><OpenWebsite></OpenWebsite></div>);
}

export default App;
