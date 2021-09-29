import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, removeItem, updateItem, } from "./CartHelpers";
const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton= false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  //Show "view product" button
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };

  //show is item in stock or not
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of stock</span>
    );
  };

  //adding product on cart component
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  //after click addtocart button
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  //this button show up conditionally that whay its here
  //in the cart component it shouldn't be shown
  const AddToCartButton = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to cart
        </button>
      )
    );
  };

  //buyer can increment or decriment the product quantity.
  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  //remove button to remove item from cart 
const showRemoveButton = showRemoveProductButton => {
  return (
    showRemoveProductButton && (
      <button className="btn btn-outline-danger mt-2 mb-2" onClick={() => removeItem(product._id)}>
        Remove
      </button>
    )
  )
}

//changing increment and decrement value from localstorage
  const handleChange = (productId) => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if(event.target.value >= 1 ){
      updateItem(productId, event.target.value)
    }
  }

  //what user can see in user interface...
  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="products" />
        <p className="lead mt-2">{product.description.substring(0, 10)}</p>
        <p className="black-10 p-1">${product.price}</p>
        <p className="black-9 p-1">
          Category:{product.category && product.category.name}
        </p>
        <p className="black-8 p-1">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product?.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showRemoveButton(showRemoveProductButton)}
        {AddToCartButton(showAddToCartButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
