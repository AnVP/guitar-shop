import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductData} from '../../types/state';

const initialState: ProductData = {
  guitars: [],
  guitar: null,
  comments: [],
  isDataLoaded: false,
  isCommentsLoaded: false,
  error: '',
};

export const productData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    setActiveProduct: (state, action) => {
      state.guitar = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setProducts, setError, loadComments, setActiveProduct} = productData.actions;
