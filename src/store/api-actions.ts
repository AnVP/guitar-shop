import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {Guitar} from '../types/guitar';
import {Review, ReviewPost} from '../types/comment';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {errorHandle} from '../services/error-handle';
import {setError, setProducts, loadComments, setActiveProduct} from './product-data/product-data';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);


export const fetchProductsAction = createAsyncThunk(
  'data/fetchProducts',
  async () => {
    try {
      const {data} = await api.get<Guitar>(APIRoute.Guitars);
      store.dispatch(setProducts(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchActiveProductAction = createAsyncThunk(
  'data/fetchActiveProduct',
  async (id: number) => {
    try {
      const {data} = await api.get<Guitar>(`${APIRoute.Guitar}/${id}`);
      store.dispatch(setActiveProduct(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: number) => {
    try {
      if (!id) {
        return;
      }

      const {data} = await api.get<Review[]>(`${APIRoute.Guitar}/${id}${APIRoute.Comments}`);
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchAddCommentAction = createAsyncThunk(
  'data/fetchAddComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}: ReviewPost) => {
    try {
      const {data} = await api.post<Review[]>(`${APIRoute.Comments}`, {guitarId, userName, advantage, disadvantage, comment, rating});
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
