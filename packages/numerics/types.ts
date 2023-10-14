export interface IFileSize {
  resolveList: { file: File; src: string }[];
  rejectList: { name: string; size: string }[];
}

export interface IBase64Encode {
  name: string;
  type: string | undefined;
  dataUrl: string;
}
