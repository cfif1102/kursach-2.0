import { useMutation } from '@tanstack/react-query';

import { ICreateActDocument, ICreatePassportDocument } from '@@types';
import { processFileData } from '@utils';

import { api } from '../query-client';

export const useCreateActDocument = () =>
  useMutation<{ blob: Blob; filename: string }, Error, ICreateActDocument>({
    mutationFn: (data) =>
      api
        .post(`/docs/create-act`, data, { responseType: 'blob' })
        .then((res) => processFileData(res)),
  });

export const useCreatePassportDocument = () =>
  useMutation<{ blob: Blob; filename: string }, Error, ICreatePassportDocument>({
    mutationFn: (data) =>
      api
        .post(`/docs/create-passport`, data, { responseType: 'blob' })
        .then((res) => processFileData(res)),
  });
