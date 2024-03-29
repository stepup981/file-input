import { ComputedRef } from "vue";

export interface FileUploadState {
  isFileLoaded: boolean;
  fileOpen: boolean;
  fileDisable: boolean;
  statusFile: string;
  statusButton: ComputedRef<string>;
  errorFileUpload: boolean;
  intervalId: ReturnType<typeof setTimeout>;
  weightFile: number;
}

export interface FileInputRef {
  value: HTMLInputElement | null;
}
