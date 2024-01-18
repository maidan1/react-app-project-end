import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCardPage = () => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    price: "",
    // quantity: "",
    shipping: "",
    description: "",
    url: "",
    alt: "",
  });
  const { id: _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`/cards/${_id}`);
        const cardData = response.data;

        setInputValue({
          title: cardData.title || "",
          subtitle: cardData.subtitle || "",
          price: cardData.price || "",
          // quantity: cardData.quantity || "",
          shipping: cardData.shipping || "",
          description: cardData.description || "",
          url: cardData.image?.url || "",
          alt: cardData.image?.alt || "",
        });
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [_id]);

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdateChangesClick = async () => {
    try {
      const headers = {
        Authorization: "Bearer your_api_key_here",
      };

      const { data } = await axios.put(
        `/cards/${_id}`,
        {
          title: inputsValue.title,
          subtitle: inputsValue.subtitle,
          description: inputsValue.description,
          price: inputsValue.price,
          // quantity: inputsValue.quantity,
          shipping: inputsValue.shipping,
          image: {
            url: inputsValue.url,
            alt: inputsValue.alt,
          },
        },
        { headers }
      );

      console.log("Data from response", data);

      toast.success("Card has been edited successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate(ROUTES.MYCARDS);
      window.location.reload();
    } catch (err) {
      console.error("Error updating card:", err);

      toast.error(
        "Error updating card. Please fix the mistake and try again.",
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
        Card - Edit
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put new values in the correct input
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.title}
          required
        />
        <TextField
          id="subtitle"
          label="SubTitle"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.subtitle}
          required
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.description}
          required
        />
        <TextField
          id="price"
          label="price"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.price}
          required
        />
        {/* <TextField
          id="quantity"
          label="quantity"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.quantity}
          required
        /> */}
        <TextField
          id="shipping"
          label="shipping"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.shipping}
        />
        <TextField
          id="url"
          label="Url"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.url}
        />
        <TextField
          id="alt"
          label="Alt"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.alt}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Link to={ROUTES.MYCARDS}>
            <Button
              variant="outlined"
              sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
              onClick={handleUpdateChangesClick}
            >
              Update Changes
            </Button>
          </Link>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.MYCARDS}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "100%",
                ml: "0%",
                bgcolor: "navy",
                color: "gray",
              }}
            >
              Discard Changes
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default EditCardPage;
