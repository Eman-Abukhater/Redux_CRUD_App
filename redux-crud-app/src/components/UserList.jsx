import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers} from "../users/usersSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserList = () => {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch the fetchUsers action when the component mounts
  }, [dispatch]);

  // Handle delete user action
  const handleDelete = (id) => {
    dispatch(deleteUser(id)); // Send delete action
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
      }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Show error message if something goes wrong
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5">User List</Typography>

      {users.length === 0 ? (
        <Typography>No users yet.</Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UserList;
