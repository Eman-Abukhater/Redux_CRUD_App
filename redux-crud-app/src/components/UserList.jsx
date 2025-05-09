import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../users/usersSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserList = () => {
  const users = useSelector((state) => state.users.users); // Read from Redux
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id)); // Send delete action
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" >
        User List
      </Typography>

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
