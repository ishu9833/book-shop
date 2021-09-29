import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCart } from "./CartHelpers";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

export const Cart = () => {

  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);
  const showItems = () => {
    return (
      <div>
        <h2>Your cart has{`${items?.length}`} items</h2>
        <hr />
        {items?.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        Ypur Cart is Empty. <br />
        <Link to="/shop">continue shopping.</Link>
      </h2>
    );
  };
  return (
    <Layout
      title="Shopping Cart"
      description="Manage Your cart items. add remoove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items?.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
