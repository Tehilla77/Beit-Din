import axios from 'axios';
import User from '../models/User';
import Case from '../models/Case';

const BASE_URL = "http://localhost:5000";
export default new class FileService {

    getAllDiscussions() {
        return axios.get(`${BASE_URL}/discussion`);
    }
    getAllUsers() {
        return axios.get(`${BASE_URL}/users`);
    }
    getAllCases() {
        return axios.get(`${BASE_URL}/cases/FullCases`);
    }
    getDiscussionByCaseId(case_id:number) {
        return axios.get(`${BASE_URL}/discussion/getDiscussionByCaseId/${case_id}`);
    }
    updateLastEnter(id: any) {
        return axios.put(`${BASE_URL}/cases/${id}`);
    }

    getUserById(id: any) {
        return axios.get(`${BASE_URL}/users/${id}`);
    }

    createDiscussion(dis: any) {
        console.log(`${BASE_URL}/discussion`, dis)
        return axios.post(`${BASE_URL}/discussion`, dis);
    }

    createUser(user: User) {
        console.log(`${BASE_URL}/users`, user)
        return axios.post(`${BASE_URL}/users`, user);
    }
    createCase(c: Case) {
        console.log(`${BASE_URL}/cases`, c)
        return axios.post(`${BASE_URL}/cases`, c);
    }
    createInquire(d:any){
        return axios.post(`${BASE_URL}/discussion/createInquire`, d);
    }
    getUserByIdAndPwd(user: User) {
        return axios.post(`${BASE_URL}/users/log-in`, user);
    }
    deleteUser(id: any) {
        return axios.delete(`${BASE_URL}/users/${id}`);
    }
    deleteDiscussion(id: any) {
        return axios.delete(`${BASE_URL}/discussion/${id}`);
    }
    updateUser(user: User) {
        return axios.put(`${BASE_URL}/users`, user);
    }
    getUserCases(id: any) {
        console.log(`${BASE_URL}/cases/userId/${id}`)
        return axios.get(`${BASE_URL}/cases/userId/${id}`);
    }
    getInquiriesByDiscussionId(id: any) {
        return axios.get(`${BASE_URL}/discussion/inquires/${id}`);
    }

    async sendPdf(file: any[],dis_id:string) {
        try {
            console.log('dis_id')
            console.log(dis_id)
            console.log(file[0])
            let reader = new FileReader();
            reader.readAsDataURL(file[0])
            let formData = new FormData();
            formData.append('pdf_file', file[0]);
            formData.append('discussion_id',dis_id);
            const res = await axios.post(BASE_URL + '/files/upload',formData,
                { headers: { "Accept": "multipart/form-data" } })
            console.log(res.data);
            return res.data;

        } catch (err) {
            console.log("error", err);
            throw err;
        }
    }
    async getProtocolByDisId(dis_id: any) {
        axios.get(`${BASE_URL}/files/GetFileByDiscussionId/${dis_id}`).then((res: any) => {
            console.log(res.data)
            const blob = new Blob([res.data], { type: 'application/pdf' });
            console.log('blob',blob)
            console.log('res.data',res.data)
            const url = window.URL.createObjectURL(blob);
            console.log('url->',url)
             return url;
          }).catch((err)=>{
            return '';
          });
    }
    // async getProtocolByDisId(dis_id: any): Promise<string> {
    //     try {
    //       const response = await axios.get(`${BASE_URL}/files/GetFileByDiscussionId/${dis_id}`, {
    //         responseType: 'blob',
    //       });
    //     console.log(response.data)

    //       // Convert response data to a Blob
    //       const blob = new Blob([response.data], { type: 'application/pdf' });
    //       console.log('blob',blob)
    //       // Create a URL for the Blob
    //       const url = window.URL.createObjectURL(blob);
    //       const url1 = window.URL.createObjectURL(response.data);
    //       console.log('url1',url1)
    //       console.log('url',url)
    //       return url;
    //     } catch (error) {
    //       console.error('Error fetching file:', error);
    //       return '';
    //     }
    //   }

      async fetchPdf(dis_id: any){
        try {
          const response = await axios.get(`${BASE_URL}/files/GetFileByDiscussionId/${dis_id}`, {
            responseType: 'blob',
          });
          // console.log('res.data',response.data)
          const blob = new Blob([response.data], { type: 'application/pdf' });
          // console.log('blob in fetch',res.data)
          const url = window.URL.createObjectURL(blob);
          // console.log('url in fetch',url)
          return url;
        } catch (error) {
          console.error('Error fetching PDF:', error);
          return '';
        }
      };
}

