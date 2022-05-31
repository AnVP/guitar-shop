import request from 'axios';
import {store} from '../store';
import {setError} from '../store/product-data/product-data';
import {clearErrorAction} from '../store/api-actions';
import {ErrorType} from '../types/error';
import {HTTPCode} from '../const';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTPCode.BadRequest:
        handleError(response.data.error);
        break;
      case HTTPCode.NotFound:
        handleError(response.data.error);
        break;
    }
  }
};
