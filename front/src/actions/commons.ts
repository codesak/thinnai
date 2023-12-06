import { Dispatch } from 'react';
import axios from 'axios';
import ImageSelector from '../components/elements/Common/ImageSelector';

export const uploadImage = async (
  file: any,
  path: string,
  fileName: string,
  dispatch: Dispatch<any>,
  updateActionType: string
) => {
  try {
    dispatch({
      type: updateActionType,
      payload: 0,
    });
    const formData = new FormData();
    formData.append(`images`, file,fileName);
    let urlData="data haven't set yet"
    let response = await axios.post(`/api/s3store/upload/${path}`, formData);
    urlData=response?.data?.imageArray?.[0];
    return urlData;
  } catch (err: any) {
    // Handle error here
    console.log(err)
  }
};

// api/s3store/upload
