import React, { FC, useEffect, useRef, useState } from 'react';
import './UploadFile.scss';
// import { useNavigate } from 'react-router-dom';
import FileService from '../../service/file.service';
import { string } from 'yup';


interface UploadFileProps { discussion_id:number}

const UploadFile: FC<UploadFileProps> = (props:UploadFileProps) => {
  const [uploadedFile, setUploadedFile] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [choice, setChoice] = useState<any>('');
  const [isUpload,setIsUpload] = useState<boolean>(false)
  const [PdfUrl, setPdfUrl] = useState<any>('');


  const uploadInputRef = useRef<any>();

  useEffect(() => {
    if (isUpload){
      sendFile();
    }
  }, [uploadedFile])

  const convertFileListToArr = (songFile: FileList): [] => {
    let array: any = [];
    array.push(songFile.item(0))
    return array;
  }

  const selectedFile = (event: any) => {
    let files: FileList = event.target.files;
    console.log('selectedFile')
    const file = files.item(0);
    if (file?.type == 'application/pdf') {
      let arr = convertFileListToArr(files);
      setUploadedFile([...arr])
      setIsUpload(true)
    }
   
  };

  const sendFile = async () => {
    setIsLoading(true);
    try {
      console.log('sendFile')
      const str_discussion_id = String(props.discussion_id)
      await FileService.sendPdf(uploadedFile,str_discussion_id);
      setIsLoading(false); // Set isLoading to false after the request finishes
    } catch (err) {
      throw err;
    }
  }


  return <div className="UploadFile" >
    <div>
      <input style={{ display: 'none' }} ref={uploadInputRef} type='file' onChange={selectedFile} ></input>
      {
        uploadedFile == '' ? <div>
          <div onDragOver={(event) => { event.preventDefault() }} >
          {/* <button className='btn btn-outline-success' onClick={() => { uploadInputRef.current.click() }}>העלה פרוטוקול</button> */}
            <div className='select-area' onDrag={() => { }} onClick={() => { uploadInputRef.current.click() }}>העלה פרוטוקול</div>
            </div>
        </div> :
          <div> {uploadedFile[0].name}</div>
      }

      {
        PdfUrl!='' ? <div><h1>pdf?</h1><iframe src={PdfUrl}></iframe></div> : ""
      }

     </div>
  </div>

}

export default UploadFile;
