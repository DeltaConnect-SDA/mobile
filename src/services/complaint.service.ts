import { getToken, useAuth } from '@/context/AuthProvider';
import { publicAPI } from 'Api/backend';
import { CameraCapturedPicture } from 'expo-camera';
import { Platform } from 'react-native';

export const createComplaint = async (data: ComplaintDTO, images: CameraCapturedPicture[]) => {
  const formData = new FormData();
  images.forEach((image, index) => {
    const uri: any = Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '');
    const fileType = uri.substring(uri.lastIndexOf('.') + 1);
    console.log(image, 'images');

    formData.append(
      'images',
      {
        uri,
        name: `image${index}.${fileType}`,
        type: `image/${fileType}`,
      },
      `image${index}.${fileType}`
    );
  });

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const response = await publicAPI.post('v1/complaints', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await getToken()}`,
    },
  });
  return response;
};

export const saveComplaint = async (complaintId: number) => {
  const response = await publicAPI.post(
    'v1/complaints/saved',
    { complaintId },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );

  return response;
};

export const unSaveComplaint = async (complaintId: number) => {
  const response = await publicAPI.delete(`v1/complaints/saved/${complaintId}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  return response;
};
