import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MenuItem from '@material-ui/core/MenuItem';
import { getCategories } from "../store/categories"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useHistory } from "react-router-dom";
import { getProduct } from "../store/singleProduct"
import { getProducts } from "../store/products"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormEditProduct({ productId }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  const product = useSelector(state => state.singleProduct)
  const [editProduct, setEditProduct] = useState({})
  const history = useHistory()
  

  useEffect(() => {
    dispatch(getProduct(productId))
      .then((producto) => setEditProduct(producto.payload))
  }, [])

  const handleSubmit = (id) => {
    id.preventDefault()
    console.log(editProduct , "enviando producto")
    axios({
      method: `put`,
      url: `http://localhost:8000/api/product/${id}`,
      data: editProduct
    })
      .then((product) => {
        console.log(product)
        return history.push("/admin/products")
      })
  }

  const handleInputChange = (event) => {
    setEditProduct({ ...editProduct, [event.target.name]: event.target.value })
    console.log("editProductttttt", editProduct)

  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
        {product && product.id && (

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="productName"
                  autoFocus
                  defaultValue={product.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="url"
                  name="url"
                  defaultValue={product.pictures[0].url}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Price"
                  disabledAnimation = "true"
                  id="precio"
                  name="price"
                  defaultValue={product.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="description"
                  name="description"
                  defaultValue={product.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="stock"
                  name="stock"
                  defaultValue={product.stock}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value=""
                  id="outlined-select-currency"
                  select
                  required
                  fullWidth
                  label="Category"
                  variant="outlined"
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save & Edit
          </Button>
          </form>
        )}
      </div>
    </Container>
  );
}