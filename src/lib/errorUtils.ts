import { AxiosError } from 'axios';

interface ErrorResponse {
  error: string;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data as ErrorResponse;
    return errorMessage?.error ?? error.message;
  } else if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류입니다.';
}
