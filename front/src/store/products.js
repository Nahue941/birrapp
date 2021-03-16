import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("SEARCH_PRODUCT", () => {
  return axios.get(`http://localhost:8000/api/product`)
    .then((res) => res.data);
});

export const postProduct = createAsyncThunk("CREATE_PRODUCT", () => {
  return axios.post(`http://localhost:8000/api/product`)
    .then((res) => res.data);
});

export const putProduct = createAsyncThunk("EDIT_PRODUCT", () => {
  return axios.put(`http://localhost:8000/api/product/:id`)
    .then((res) => res.data);
});

export const deleteProduct = createAsyncThunk("DELETE_PRODUCT", () => {
  return axios.delete(`http://localhost:8000/api/product/:id`)
    .then((res) => res.data);
});

export const postProducts = createAsyncThunk("POST", (products) => {
  const name = products.name;
  const description = products.description;
  const price = products.price;
  const stock = products.stock;
  const stars = products.stars;
  // const category_id = products.category_id
  // const picture_id = procucts.picture_id
  return axios({
    method: "post",
    url: `/api/product/${products.id}`, //comentar manana
    data: { name, description, price, stock, stars },
  }).then(product => product);
});

//verficar si hay que agregar al estado
const productsReducer = createReducer([], {
  [getProducts.fulfilled]: (state, action) => action.payload,
  [postProducts.fulfilled]: (state, action) => [...state, action.payload],
});

export default productsReducer;
