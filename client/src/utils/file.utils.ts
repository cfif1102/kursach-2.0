import { AxiosResponse } from 'axios';

export const getFileNameFromDisposition = (str: string) => {
  const filenameRegex = /filename\*?=["']?(?:UTF-\d['"]*)?([^;"']*)["']?;?/i;
  const matches = filenameRegex.exec(str);
  const filename = matches && matches[1] ? decodeURIComponent(matches[1]) : 'downloaded-file';

  return filename;
};

export const processFileData = (res: AxiosResponse) => {
  const blob = new Blob([res.data], { type: res.headers['content-type'] });
  const filename = getFileNameFromDisposition(res.headers['content-disposition']);

  return { blob, filename };
};

export const downloadFile = (blob: Blob, name: string) => {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = name;

  document.body.appendChild(a);

  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
