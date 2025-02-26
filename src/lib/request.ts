import axios from 'axios';
import { EndPoints } from './endpoints';

const instance = axios.create({
  baseURL: EndPoints.BASE,
});

export const GET_REQUEST = async (url: string, auth_token?: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`;

  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const POST_REQUEST = async (
  url: string,
  data: Record<string, unknown> | FormData,
  auth_token?: string,
  contentType?: string
) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`;
  instance.defaults.headers.common['Content-Type'] = contentType || 'application/json';

  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const PUT_REQUEST = async (url: string, data: Record<string, unknown>, auth_token?: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`;

  try {
    const response = await instance.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const DELETE_REQUEST = async (url: string, auth_token?: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`;
  try {
    const response = await instance.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
