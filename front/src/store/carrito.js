import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  FALTA UN GET A CARRITOS


export const getCarrito = createAsyncThunk("GET_CARRITO", (id) => {
  return axios.get(`http://localhost:8000/api/cart/${id}`).then((res) => {
    return res.data;
  });
});

// --------- Revisar como se crea el carrito en la ruta del backEnd -----------
export const postCarrito = createAsyncThunk("POST_CARRITO", (carrito) => {
  const paymentMethod = carrito.paymentMethod;
  const table = carrito.table;
  const state = carrito.state;
  return axios({
    method: "post",
    url: `http://localhost:8000/api/cart/${carrito.id}`,
    data: { paymentMethod, table, state },
  }).then((product) => product.data);
});

export const deleteCarrito = createAsyncThunk("DELETE_CARRITO", (id) => {
  return axios({
    method: "delete",
    url: `/api/cart/${id}`,
  }).then((product) => product.data);
});

export const updateCarrito = createAsyncThunk("UPDATE_CARRITO", (cart) => {
  const state = cart.state
  return axios({
    method: "put",
    url: `http://localhost:8000/api/cart/${cart.id}`,
    data: { state }
  }).then((product) => product.data);
})

const carritoReducer = createReducer({}, {
    [getCarrito.fulfilled]: (state, action) => action.payload,
    [postCarrito.fulfilled]: (state, action) => [...state, action.payload],
});

export default carritoReducer;
