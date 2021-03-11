import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("SEARCH", (productId) => {
  return axios.get(`http://localhost:8000/api/product/${productId}`).then((res) => res.data);
});

export const updateProduct = createAsyncThunk("PUT", (product) => {
  return axios({
    method: "put",
    url: `/api/product/${product.id}`,
    data: { product }, //-------revisar-------
  }).then(product => product);
});

export const deleteProduct = createAsyncThunk("DELETE", (id) => {
  return axios({
    method: "delete",
    url: `/api/product/${id}`,
  }).then(product => product);
});
//verficar si hay que agregar al estado
const singleProductReducer = createReducer([], {
  [getProduct.fulfilled]: (state, action) => action.payload,
  [updateProduct.fulfilled]: (state, action) => [...state, action.payload],
});

export default singleProductReducer;