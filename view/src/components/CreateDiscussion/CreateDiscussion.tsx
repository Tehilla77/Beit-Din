import React, { FC, useEffect, useState, useRef, TextareaHTMLAttributes } from 'react';
import FileService from '../../service/file.service';
import './CreateDiscussion.scss'

interface CreateDiscussionProps { case_id: string }

const CreateDiscussion: FC<CreateDiscussionProps> = (CreateDiscussionProps) => {
    const dateRef = useRef<any>(null);
    const startHour = useRef<any>(null);
    const endHour = useRef<any>(null);

    function createDis(event: any) {
        console.log('hi')
        const date = dateRef.current?.value
        const start = startHour.current?.value.split(':'); 
        const end = endHour.current?.value.split(':'); 
     
        const dateS = `${date} ${start[0]}:${start[1]}:00`
        const dateE = `${date} ${end[0]}:${end[1]}:00`
        //check validation of start<end
        console.log(dateS)
        console.log(dateE)

        const case_id = CreateDiscussionProps.case_id;
        const dis = {
            discussion_date: dateS,
            discussion_end: dateE,
            case_id: case_id
        }
        console.log(dis)
        sendDisToCreate(dis);
    }

    const sendDisToCreate = async (dis: any) => {
        FileService.createDiscussion(dis).then((res) => {
        }).catch(error => {console.log(error)})
    }

    return <div><div className="form-group">
        <h2>דיון חדש</h2>
        <div className="col-md-5 col-sm-4 mt-3">
            <label htmlFor="date">בחר תאריך</label>
            <input ref={dateRef} id='date' type="date" className="form-control myInput" name="info" />
        </div>
    </div>
        <div>
            <input id="start" type="time" name="שעת-התחלה" ref={startHour} />
            <label htmlFor="start">שעת התחלה</label>
            <br />
            <input id="end" type="time" name="שעת-סיום" ref={endHour} />
            <label htmlFor="end">שעת סיום</label>
        </div>
        <button onClick={createDis} className='btn btn-outline-info mt-5'>צור דיון</button>
    </div>
};
export default CreateDiscussion;