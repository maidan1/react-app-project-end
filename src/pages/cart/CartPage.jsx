// CartPage.jsx
import React, { useState, useEffect } from "react";
import { Container, Typography, Divider, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../cart/CartItem";
import {
  addToCart,
  removeFromCart,
  setItems,
  saveForLater,
  moveItemToCart,
  removeFromSavedForLater,
} from "../../store/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items) ?? [];
  const savedForLaterItems =
    useSelector((state) => state.cart.savedForLaterItems) ?? [];
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      dispatch(setItems(JSON.parse(storedCartItems)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCartHandler = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      handleUpdateCartItem(item._id, existingItem.quantity + 1);
    } else {
      dispatch(addToCart({ ...item, quantity: 1 }));
      setSuccessMessage("Card added to cart successfully!");
      setErrorMessage("");
    }
  };

  const handleUpdateCartItem = (itemId, newQuantity) => {
    newQuantity = isNaN(newQuantity) ? 1 : Math.max(1, newQuantity);
    const updatedItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    dispatch(setItems(updatedItems));
  };

  const handleDeleteCartItem = (itemId, isSavedForLater) => {
    if (isSavedForLater) {
      // If it's saved for later, dispatch removeFromSavedForLater action
      dispatch(removeFromSavedForLater(itemId));
    } else {
      // Otherwise, dispatch removeFromCart action
      dispatch(removeFromCart(itemId));
    }
    setSuccessMessage("Card removed successfully!");
    setErrorMessage("");
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems.find((item) => item._id === itemId);
    if (itemToSave) {
      dispatch(removeFromCart(itemId));
      dispatch(saveForLater(itemToSave));
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedForLaterItems.find((item) => item._id === itemId);
    if (itemToMove) {
      dispatch(moveItemToCart(itemToMove));
    }
  };
  const handleCheckout = () => {
    setSuccessMessage("Checkout functionality coming soon!");
    setErrorMessage("");
  };

  const totalCartPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price) * Math.max(1, item.quantity),
    0
  );

  return (
    <Container>
      <Typography
        sx={{ fontFamily: "serif", textAlign: "center", py: 5 }}
        variant="h1"
      >
        MY SHOPPING CART
        <Divider sx={{ mt: 4, width: 750, mx: "auto" }} />
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Your shopping cart is empty.
        </Typography>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              _id={item._id}
              title={item.title}
              price={item.price}
              shipping={item.shipping}
              img={item.img}
              alt={item.alt}
              quantity={item.quantity}
              onDeleteCartItem={handleDeleteCartItem}
              onUpdateCartItem={handleUpdateCartItem}
              onSaveForLater={handleSaveForLater}
            />
          ))}
          <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
            Total Price: $
            {isNaN(totalCartPrice)
              ? "0.00"
              : totalCartPrice.toFixed(2).toString()}
          </Typography>

          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              py: 2,
            }}
          >
            <Button
              variant="contained"
              className="cart__btn-empty"
              onClick={() => console.log("Empty cart clicked")}
            >
              Empty cart
            </Button>
            <Button
              variant="contained"
              className="cart__btn-checkout"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}

      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}

      {/* Saved for Later Section */}
      {savedForLaterItems.length > 0 && (
        <div>
          <Typography
            sx={{ fontFamily: "serif", textAlign: "center", py: 5 }}
            variant="h2"
          >
            SAVED FOR LATER
            <Divider sx={{ mt: 4, width: 750, mx: "auto" }} />
          </Typography>
          {savedForLaterItems.map((item) => (
            <CartItem
              key={item._id}
              _id={item._id}
              title={item.title}
              price={item.price}
              shipping={item.shipping}
              img={item.img}
              alt={item.alt}
              quantity={item.quantity}
              onDeleteCartItem={() => handleDeleteCartItem(item._id, true)}
              onUpdateCartItem={() => console.log("Update saved item")}
              onSaveForLater={() => handleMoveToCart(item._id)}
              isSavedForLater={true}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default CartPage;
