import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers, editUser } from "../users/usersSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
const UserList = () => {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // State for editing user
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch the fetchUsers action when the component mounts
  }, [dispatch]);

  // Handle delete user action
  const handleDelete = (id) => {
    dispatch(deleteUser(id)); // Send delete action
  };
  // Handle edit user action

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
  };

  // Handle save edited user action
  const handleSave = () => {
    if (editName.trim() !== "") {
      dispatch(editUser({ id: editId, name: editName }));
      setEditId(null);
      setEditName("");
    }
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
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>

      {users.length === 0 ? (
        <Typography>No users yet.</Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              {editId === user.id ? ( // If this user is being edited
                <>
                  <TextField
                    value={editName} // Display the current name in the text field
                    onChange={(e) => setEditName(e.target.value)} // Update the name as it's edited
                    size="small"
                    sx={{ flex: 1, mr: 1 }}
                  />
                  <IconButton onClick={handleSave}>
                    <SaveIcon /> {/* Show Save icon */}
                  </IconButton>
                </>
              ) : (
                <>
                  <ListItemText primary={user.name} /> {/* Display user name */}
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon /> {/* Show Edit icon */}
                  </IconButton>
                </>
              )}
              <IconButton edge="end" onClick={() => handleDelete(user.id)}>
                <DeleteIcon /> {/* Show Delete icon */}
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UserList;
