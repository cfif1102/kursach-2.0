import { useMutation } from '@tanstack/react-query';

import { ICreateActDocument, ICreatePassportDocument } from '@@types';

import { api } from '../query-client';

export const useCreateActDocument = () =>
  useMutation<{ blob: Blob; filename: string }, Error, ICreateActDocument>({
    mutationFn: (data) =>
      api.post(`/docs/create-act`, data, { responseType: 'blob' }).then((res) => {
        const blob = new Blob([res.data], { type: res.headers['content-type'] });

        const contentDisposition = res.headers['content-disposition'];

        const filenameRegex = /filename\*?=["']?(?:UTF-\d['"]*)?([^;"']*)["']?;?/i;
        const matches = filenameRegex.exec(contentDisposition);

        console.log(res.headers);

        const filename = matches && matches[1] ? decodeURIComponent(matches[1]) : 'downloaded-file';

        return { blob, filename };
      }),
  });

export const useCreatePassportDocument = () =>
  useMutation<File, Error, ICreatePassportDocument>({
    mutationFn: (data) => api.post(`/docs/create-passport`, data).then((res) => res.data),
  });
