import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CardForm from "../CreateCardPage/CardForm";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CreateCardPage = () => {
  const navigate = useNavigate();

  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
    // quantity: "",
    shipping: "",
    url: "",
    alt: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
    // quantity: "",
    shipping: "",
    url: "",
    alt: "",
  });

  const fields = [
    { id: "title", label: "Title", required: true },
    { id: "subtitle", label: "SubTitle", required: true },
    { id: "description", label: "Description", required: true },
    { id: "price", label: "Price", required: true },
    // { id: "quantity", label: "Quantity", required: true },
    { id: "shipping", label: "Shipping", required: true },
    { id: "url", label: "Url", required: true },
    { id: "alt", label: "Alt", required: true },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue((currentState) => ({
      ...currentState,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]:
        value.trim() === ""
          ? `${id.charAt(0).toUpperCase() + id.slice(1)} is required`
          : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      toast.error("Please fill in all required fields correctly.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8080/cards", {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        price: inputsValue.price,
        // quantity: inputsValue.quantity,
        shipping: inputsValue.shipping,
        image: {
          url: inputsValue.url || undefined,
          alt: inputsValue.alt || undefined,
        },
      });

      toast.success("You've created a business card!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Response data:", data);

      navigate(ROUTES.MYCARDS);
    } catch (err) {
      if (err.response && err.response.data) {
        const serverErrors = err.response.data;
        Object.keys(serverErrors).forEach((field) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: serverErrors[field],
          }));
        });
      } else {
        toast.error("Error creating card. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardForm
      fields={fields}
      inputsValue={inputsValue}
      errors={errors}
      loading={loading}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateCardPage;
