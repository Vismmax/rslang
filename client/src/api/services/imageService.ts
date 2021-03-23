import webApi from '../webApiHelper';

const URL = '/imgs';

interface IResponse {
  link: string;
  deleteHash: string;
  error?: any;
}

export const uploadImage = async (image: Blob): Promise<string> => {
  const response = (await webApi.image(URL, image)) as IResponse;
  return response.error ? '' : response.link;
};
