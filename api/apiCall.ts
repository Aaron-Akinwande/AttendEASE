import axios from "axios";


export const postRequest = async ({ url, data } : {url:string, data: any | File | FileList} ) => {
    const response = await axios.post(url, data)
    return response.data
  }
  export const patchRequest = async ({ url, data } : {url:string, data: any | File | FileList} ) => {
    const response = await axios.patch(url, data)
    return response.data
  }
  export const PostMultiPartForm = async ({ url, data } : {url:string, data: any | File | FileList} ) => {
    const response = await axios.post(url, data)
    return response.data
  }
  
  export const getRequest = async ({ url } : {url: string}) => {
    const response = await axios.get(url)
    return response.data
  }  

export const getSchool = async ({ url }: { url: string }) => {
  const response = await axios.get(url);
  return response.data;
};

export const login = async ({ url, data }: { url: string; data: any }) => {
  const response = await axios.post(url, data);
  // console.log(response.data, response)
  // localStorage.setItem('easysch_token', response.data.access)
  return response.data;
};
