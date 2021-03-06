import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../common/helpers/tokenHelper';

const BASE_URL = process.env.REACT_APP_API_URL || '';

class Api {
  baseUrl: string;
  instance: AxiosInstance;
  constructor() {
    this.baseUrl = BASE_URL;
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  async get(url: string, params?: any) {
    await this.checkAuthToken();
    return await this.instance
      .get(url, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        params,
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async post(url: string, data: any) {
    return await this.instance
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async image(url: string, image: Blob) {
    const data = new FormData();
    data.append('image', image);
    return await this.instance
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async put(url: string, data: any) {
    return await this.instance
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async delete(url: string, data?: any) {
    return await this.instance
      .delete(url, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        data,
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(response: AxiosResponse) {
    return response.data;
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      return { error: error.response?.data };
    } else if (error.request) {
      return { error: error.request?.responseText };
    } else {
      return { error: error?.message };
    }
  }

  private async checkAuthToken() {
    try {
      // check auth token success
    } catch (error) {
      // on error
    }
  }
}

export default new Api();
