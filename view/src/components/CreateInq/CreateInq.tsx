import React, { FC, useEffect, useState, useRef, TextareaHTMLAttributes } from 'react';
import FileService from '../../service/file.service';
import './CreateInq.scss'

interface CreateInqProps { discussion_id: string }

const CreateInq: FC<CreateInqProps> = (CreateInqProps) => {
    const contentRef = useRef<any>(null);
    const dateRef = useRef<any>(null);
    const typeRef = useRef<any>(null);

    function createDis(event: any) {
        const content = contentRef.current?.value;
        console.log('content',content)
        const date = dateRef.current?.value;
        const type_inquirie = typeRef.current?.value;
        console.log('type',type_inquirie)
        const discussion_id = CreateInqProps.discussion_id;
        const inquire = {
            finish_date: date,
            content_inquirie: content,
            type_inquirie: type_inquirie,
            discussion_id: discussion_id
        }
        sendDisToCreate(inquire);
        }

    const sendDisToCreate = async (inquire:any) => {
        FileService.createInquire(inquire).then((res) => {
        }).catch(error => {console.log(error)})
      }

    return <div><div className="form-group">
        <h2>בירור חדש</h2>
        <div className="col-md-5 col-sm-4">
            <label htmlFor="exampleFormControlTextarea1">מלא את משימת הבירור</label>
            <textarea ref={contentRef} rows={3} className="form-control" id="exampleFormControlTextarea1"></textarea>
        </div>
        <div className="col-md-5 col-sm-4 mt-3">
            <label htmlFor="date">תאריך סיום</label>
            <input ref={dateRef} id='date' type="date" className="form-control myInput" name="info" />
        </div>
    </div>
        <div>
            <select className="mt-3" id='selected' title="בחר סוג" ref={typeRef}>
                <option className="special" value={1}>תובע</option>
                <option className="special" value={2}>נתבע</option>
                <option className="special" value={3}>דיינים</option>
            </select>
        </div>
        <button onClick={createDis} className='btn btn-warning mt-5'>צור בירור</button>
    </div>
};

export default CreateInq;