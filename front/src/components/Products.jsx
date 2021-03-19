import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  TableRow,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, getProductByCategorie } from "../store/products";
import { addItemToCarrito } from "../store/items";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import productStyles from "../Styles/products";
import { getCategories } from "../store/categories";

const TableMaterial = () => {
  const classes = productStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const carrito = useSelector((state) => state.carrito);
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const [message, setMessage] = useState();

  const addToCart = (productId) => {
    const itemData = {
      cartId: carrito.id,
      productId,
      qty: 1,
    };
    return dispatch(addItemToCarrito(itemData)).then((item) => {
      if (typeof item.payload.data === "string") {
        setMessage(item.payload.data);
      }
    });
  };

  useEffect(() => {
    dispatch(getProducts()).then(dispatch(getCategories()));
  }, []);

  return (
    <TableContainer style={{ marginTop: "1.4%" }}>
      {categories &&
        categories.map((categorie) => {
          return (
            <Button
              onClick={() => dispatch(getProductByCategorie(categorie.id))}
            >
              {categorie.name}
            </Button>
          );
        })}

      <Table>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.url}
                    width="128"
                    height="128"
                    margin="auto"
                    display="block"
                    maxWidth="100%"
                    maxHeight="100%"
                    className={classes.image}
                  />
                </Link>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" align="left">
                  {product.name}
                </Typography>
                <Typography varinat="h6" align="left">
                  {product.description}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{product.price + "$"}</Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                {user && user.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Agregar <ShoppingCartIcon />
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" disabled="true">
                    Agregar <ShoppingCartIcon />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMaterial;
