import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
} from "@mui/material";
import axios from "axios";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cards/${cardId}`
        );

        console.log("Card Details Response:", response);

        if (response.data) {
          console.log("Card Details Data:", response.data);
          setCardDetails(response.data);
        } else {
          console.error("Invalid response structure. Please check the API.");
          setError("Invalid response structure. Please check the API.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching card details:", error);
        setError("Error fetching card details. Please try again.");
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  useEffect(() => {
    console.log("Image URL:", cardDetails?.url);
  }, [cardDetails]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography style={{ color: "red" }}>{error}</Typography>;
  }

  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            {cardDetails && cardDetails?.url ? (
              <CardMedia
                component="img"
                src={cardDetails?.url}
                alt={cardDetails.alt || "No Alt Text"}
                style={{ height: 500, width: "100%", objectFit: "cover" }}
              />
            ) : (
              <Typography>No Image Available</Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent>
              <CardHeader
                title={cardDetails?.title || "No Title"}
                subheader={cardDetails?.subtitle || "No Subtitle"}
                sx={{ p: 0, mb: 1 }}
              />
              <Divider />
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <Typography
                    fontWeight="700"
                    variant="subtitle1"
                    component="span"
                  >
                    Description: {cardDetails?.description || "No Description"}
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  <Typography
                    fontWeight="700"
                    variant="subtitle1"
                    component="span"
                  >
                    Price: {cardDetails?.price || "No Price"}
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  <Typography
                    fontWeight="700"
                    variant="subtitle1"
                    component="span"
                  >
                    {/* Quantity: {cardDetails?.quantity || "No Quantity"}
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  <Typography
                    fontWeight="700"
                    variant="subtitle1"
                    component="span"
                  > */}
                    Shipping: {cardDetails?.shipping || "No Shipping"}
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CardDetailsPage;
