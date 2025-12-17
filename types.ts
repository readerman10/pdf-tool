
export enum ToolMode {
  HOME = 'HOME',
  MERGE = 'MERGE',
  SPLIT = 'SPLIT'
}

export interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: number;
}
