import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const SandboxPage = () => {
  const user = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get("users");
        setUsers(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllUsers();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  const updateUserProfile = (userId, updatedData) => {
    dispatch({ type: "UPDATE_USER_PROFILE", userId, updatedData });
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`users/${userId}`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const changeUserStatus = async (userId, isBusiness) => {
    try {
      const data = { status: isBusiness };
      await axios.patch(`http://localhost:8080/users/${userId}`, data);
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isBusiness };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.log("Error updating user status:", error);
    }
  };

  const makeRegularUser = (userId) => {
    changeUserStatus(userId, false);
  };

  return (
    <Fragment>
      <Typography variant="h1">Sandbox</Typography>

      {user.isAuthenticated && (
        <div>
          <Button
            onClick={() =>
              updateUserProfile(user.id, {
                /* updated user data */
              })
            }
          >
            Update Profile
          </Button>
        </div>
      )}

      {user.isAdmin && <div></div>}

      {user.isAdmin && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>User Phone</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userData) => (
                <TableRow key={userData._id}>
                  <TableCell>{userData._id}</TableCell>
                  <TableCell>{userData.name.first}</TableCell>
                  <TableCell>{userData.phone}</TableCell>
                  <TableCell>
                    {userData.isAdmin
                      ? "Admin"
                      : userData.isBusiness
                      ? "Business"
                      : "Regular"}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteUser(userData._id)}>
                      Delete
                    </Button>
                    {!userData.isBusiness && (
                      <Button
                        onClick={() => changeUserStatus(userData._id, true)}
                      >
                        Make Business
                      </Button>
                    )}
                    {userData.isBusiness && (
                      <Button onClick={() => makeRegularUser(userData._id)}>
                        Make Regular User
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};

export default SandboxPage;
