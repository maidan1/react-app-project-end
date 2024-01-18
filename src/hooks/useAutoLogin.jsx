import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { getToken } from "../service/storageService";

const useAutoLogin = () => {
  const dispatch = useDispatch();

  return async (skipTokenTest = false) => {
    try {
      // Retrieve the token from storage
      const token = getToken();

      // Check if the token is a valid string
      if (!token || typeof token !== "string") {
        console.log("Invalid or missing token.");
        return;
      }

      // Decode the token to get user data
      const dataFromToken = jwtDecode(token);

      // Optional: Make an API call to test the token if needed
      if (skipTokenTest) {
        const response = await axios.get(`/users/${dataFromToken._id}`);
        console.log("API response:", response.data);
      }

      // Dispatch the user data to the Redux store
      dispatch(authActions.login(dataFromToken));
    } catch (err) {
      console.log("Error from auto login", err);

      // Handle errors, such as clearing local storage on failure
      localStorage.clear();
    }
  };
};

export default useAutoLogin;
