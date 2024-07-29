export interface CustomError extends Error {
  name: string; 
  message: string;
  stack: any; 
  statusCode: number;
  //status?: number;
}
