import React, { FC, useEffect, useState, useRef } from 'react';
import './Discussion.scss';
import FileService from '../../service/file.service';
import downloadIcon from '../../icons/icons8-download-48.png'
import UploadFile from '../UploadFile/UploadFile';
import fileService from '../../service/file.service';
import CreateInq from '../CreateInq/CreateInq'
import CreateDiscussion from '../CreateDiscussion/CreateDiscussion';
import ShowInquires from '../ShowInquires/ShowInqires'

interface DiscussionProps { case_id: number }

const Discussion: FC<DiscussionProps> = (props: DiscussionProps) => {

  const [Dis, setDis] = useState<any[]>([{}]);
  const [PassedProtocolDis, setPassedProtocolDis] = useState<any[]>([{}]);
  const [isPassedProtocolDis, setIsPassedProtocolDis] = useState<boolean>(false);
  const [PassedNotProtocolDis, setPassedNotProtocolDis] = useState<any[]>([{}]);
  const [PassedDis, setPassedDis] = useState<any[]>([{}]);
  const [FutureDis, setFutureDis] = useState<any[]>([{}]);
  const [isPassedDis, setIsPassedDis] = useState<boolean>(false);
  const [isFutureDis, setIsFutureDis] = useState<boolean>(false);
  const [isProtocols, SetIsProtocols] = useState<boolean[]>([false]);
  const [isNewInq, setIsNewInq] = useState<boolean>(false);
  const [newInq, setNewInq] = useState<any>(0);
  const [isCreateDis, setIcreateDis] = useState<boolean>(false);
  const DisIdRef = useRef<any>(1);

  useEffect(() => {
    setIsFutureDis(false)
    getDisByCaseId(props.case_id)
  }, []);

  function appendLeadingZeros(int: number) {
    if (int < 10) {
      return '0' + int;
    }
    return int;
  }
  const createDis = (dis_id: any) => {
    setIsNewInq(false);
    setNewInq(dis_id);
    setIsNewInq(true);
  }
  const deleteDis = async (id: any) => {
    FileService.deleteDiscussion(id).then((res) => {
      console.log(res.data)
      getDisByCaseId(props.case_id)
    }).catch((err) => {
      console.log(err)
    })
  }

  const getDisByCaseId = async (id: any) => {
    FileService.getDiscussionByCaseId(id).then(async (res) => {
      console.log('discussions', res.data)
      setDis(res.data)
      const passed = res.data.filter((d: any) => hasDatePassed(d.discussion_date))
      const future = res.data.filter((d: any) => !hasDatePassed(d.discussion_date))
      const IsProtocol = passed.filter((d: any) => d.isProtocol)
      const IsNotProtocol = passed.filter((d: any) => !d.isProtocol)
      const protocols = await protocolsMap(IsProtocol)
      console.log("protocls");
      console.log(protocols.shift());
      setPassedProtocolDis(protocols)
      setPassedNotProtocolDis(IsNotProtocol)
      if (future.length > 0) {
        console.log('future.length > 0')
        setIsFutureDis(true)
        setFutureDis(future)
      }
      else
        console.log('!!!!!!!!!future.length > 0')
      if (passed.length > 0) {
        console.log('passed.length > 0')
        setIsPassedDis(true)
        setPassedDis(passed)
      }
      else
        console.log('!!!!!!!!!passed.length > 0')
    })
  }
  const protocolsMap = async (disWithProcols: any) => {
    console.log(disWithProcols);
    let protocols = [{}];
    for (let i = 0; i < disWithProcols.length; i++) {
      const current_url = await getFileByDiscussionId(disWithProcols[i].discussion_id);
      protocols.push({ ...disWithProcols[i], protocolUrl: current_url });
    }
    console.log("protocols in function");
    console.log(protocols);
    return protocols;
  }
  const getFileByDiscussionId = async (dis_id: any) => {
    let my_url = ''
    const url = fileService.fetchPdf(dis_id).then((url_from_fetch: string) => {
      my_url = url_from_fetch
      // console.log('my_url', my_url)
      return my_url;
    }).catch((err) => { return '' })
    return url;
  }

  const hasDatePassed = (dateToCheck: string): boolean => {
    const dateToCheck1 = new Date(dateToCheck);
    const now = new Date();
    return dateToCheck1 < now;
  };

  return <div className='container'>

{!isCreateDis ? <button className='btn btn-outline-secondary m-4' onClick={(() => { setIcreateDis(true) })}>הוסף דיון</button> : ''}

    {isPassedDis ? <div className='row'><div className='col-sm'>
      {PassedNotProtocolDis.map((d) => {
        return (
          <div className="card text-end m-3">
            <p className="card-text m-2">{`${appendLeadingZeros(new Date(d.discussion_date).getDate())}/${appendLeadingZeros(new Date(d.discussion_date).getMonth() + 1)}/${new Date(d.discussion_date).getFullYear()} `}דיון בתאריך</p>

            <div className='card-text mt-2 text-center'> משעה {d.discussion_date.slice(11, 16)}</div>
            <div className='card-text mt-2 text-center'> עד {d.discussion_end.slice(11, 16)}</div>

            <div><UploadFile discussion_id={d.discussion_id}></UploadFile></div>
            <button className='btn btn-outline-secondary m-3' onClick={() => { createDis(d.discussion_id) }}>הוסף בירור</button>
          </div>)
      })}
      {PassedProtocolDis.map((d) => {
        return (
          <div className="card text-end m-3">
            <p className="card-text m-2">{`${appendLeadingZeros(new Date(d.discussion_date).getDate())}/${appendLeadingZeros(new Date(d.discussion_date).getMonth() + 1)}/${new Date(d.discussion_date).getFullYear()} `}דיון בתאריך</p>
            <div className='card-text mt-2 text-center'> משעה {d.discussion_date.slice(11, 16)}</div>
            <div className='card-text mt-2 text-center'> עד {d.discussion_end.slice(11, 16)}</div>
            <iframe
              src={d.protocolUrl}
              width="100%"
              height="200px"
              style={{ border: 'none' }}
              title="Protocol PDF"
            ></iframe>
            <a href={d.protocolUrl} download={d.protocolUrl}><img src={downloadIcon} className='logo' /></a>
            <button className='btn btn-outline-secondary m-3' onClick={() => { createDis(d.discussion_id) }}>הוסף בירור</button>
          </div>)
      })}
    </div> </div> : ''}

    {isFutureDis ? <div className='row'>
      <div className='col-sm'>
        {FutureDis.map((d) => {
          return (
            <div className="card text-end m-3">
              <p className="card-text m-2">{`${appendLeadingZeros(new Date(d.discussion_date).getDate())}/${appendLeadingZeros(new Date(d.discussion_date).getMonth() + 1)}/${new Date(d.discussion_date).getFullYear()} `}דיון בתאריך</p>
              <div className='card-text mt-2 text-center'> משעה {d.discussion_date.slice(11, 16)}</div>
              <div className='card-text mt-2 text-center'> עד {d.discussion_end.slice(11, 16)}</div>
              <button className='btn btn-secondary m-3' onClick={() => { deleteDis(d.discussion_id) }}>בטל דיון</button>
            </div>)
        })}
      </div></div>
      : ''}
    {isNewInq ? <CreateInq discussion_id={newInq}></CreateInq> : ''}
    {isCreateDis ? <CreateDiscussion case_id={`${props.case_id}`}></CreateDiscussion> : ''}
    <ShowInquires discussion_id={`${1}`}></ShowInquires>
    {/*בREF אמור להיות  */}
  </div>
}
export default Discussion;