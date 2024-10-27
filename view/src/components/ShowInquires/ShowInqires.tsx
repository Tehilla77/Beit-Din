import { FC, useEffect, useState } from "react"
import fileService from "../../service/file.service";


interface ShowInquiresProps { discussion_id: string }

const ShowInquires: FC<ShowInquiresProps> = (props: ShowInquiresProps) => {
    const [isInq, setIsInq] = useState<boolean>(false);
    const [inq, setInq] = useState<any[]>([{}]);
    useEffect(() => {
        setIsInq(false)
        console.log(props.discussion_id)
        getInq(props.discussion_id)
    }, []);
    const getInq = (discussion_id: any) => {
        fileService.getInquiriesByDiscussionId(discussion_id).then((res) => {
            console.log(res.data)
            setInq(res.data)
            setIsInq(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    return <div className='container'>{isInq ? <div className='row'>
        <div className='col-sm'>
          {inq.map((i) => {
            return (
              <div className="card text-end m-3">
                <div className='card-text mt-2 text-center'>{i.content_inquiries}</div>
                <div className='card-text mt-2 text-center'> עד {i.finish_date.slice(11, 16)}</div>
              </div>)
          })}
        </div></div>
        : ''}</div>
}
export default ShowInquires;