// CartItem.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const CartItem = ({
  _id,
  title,
  price,
  shipping,
  img,
  alt,
  quantity,
  onDeleteCartItem,
  onUpdateCartItem,
  onSaveForLater,
  isSavedForLater,
}) => {
  const handleRemoveFromCart = () => {
    onDeleteCartItem(_id, isSavedForLater); // Pass isSavedForLater flag
  };

  const handleUpdateCartItem = (newQuantity) => {
    newQuantity = isNaN(newQuantity) ? 1 : Math.max(0, newQuantity);
    onUpdateCartItem(_id, newQuantity);
  };

  const handleSaveForLater = () => {
    onSaveForLater(_id);
  };

  return (
    <Card style={{ marginBottom: "15px" }}>
      <CardContent style={{ display: "flex", alignItems: "center" }}>
        <img
          src={img}
          alt={alt}
          style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "15px" }}
        />

        <div style={{ flex: 1 }}>
          <Typography variant="h6">{title}</Typography>
        </div>

        <div style={{ flex: 1 }}>
          <Typography variant="body1">Price: ${price}</Typography>
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="body1">Shipping: {shipping}</Typography>
        </div>

        <div style={{ flex: 1 }}>
          <Typography variant="body1">
            Quantity:{" "}
            {quantity !== undefined && !isNaN(quantity) ? quantity : 0}
          </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={handleRemoveFromCart}
            style={{ marginRight: "10px" }}
          >
            <DeleteIcon />
          </IconButton>

          {isSavedForLater ? (
            <Button variant="contained" onClick={handleSaveForLater}>
              Add to Cart
            </Button>
          ) : (
            <IconButton
              onClick={handleSaveForLater}
              style={{ marginRight: "10px" }}
            >
              <BookmarkIcon />
            </IconButton>
          )}

          <IconButton onClick={() => handleUpdateCartItem(quantity - 1)}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">
            {quantity !== undefined && !isNaN(quantity) ? quantity : 1}
          </Typography>
          <IconButton onClick={() => handleUpdateCartItem(quantity + 1)}>
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
