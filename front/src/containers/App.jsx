import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import Heading from "../components/Heading.jsx";
import SingleProduct from "../components/SingleProduct.jsx";
import Carrito from "../components/Carrito.jsx";
import Products from "../components/Products.jsx";
import Admin from "./Admin.jsx";

// Landing Page: Landing page (Header. Botones de categorias. Menu deslizable horizontal. Carta entera vertical mapeada de productos -con "sumar al pedido"-, y link al componente de cada producto)

//- visual de cada item: (imagen del producto, descripcion del producto, precio, reviews, y valoracion)

//- Carrito: (header con usuario del pedido, lista de items, boton de confirmacion, boton hacer pedido)

//- visual del admin (-agregar, editar, eliminar- nuevas categorias, productos, usuarios, admin.. ver transacciones totales (carritos de todos los usuarios)

const App = () => {
  return (
    <div>
      <Route exact path="/" render={() => <Heading />} />
      <Switch>
        <Route exact path="/" render={() => <Products />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/products/:id" render={() => <SingleProduct />} />
        {/* para ver despues */}
        <Route path="/carrito" render={() => <Carrito />} />
        <Route path="/*" render={() => <div>Pagina no encontrada</div>} />
      </Switch>
    </div>
  );
};
export default App;