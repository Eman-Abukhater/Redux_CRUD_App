import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../users/usersSlice'
import { TextField, Button, Box } from '@mui/material'

const AddUser = () => {
  const [name, setName] = useState('') // Track input value
  const dispatch = useDispatch() // Allow us to send actions to Redux

  const handleAddUser = () => {
    if (name.trim() === '') return // Don't allow empty names

    const newUser = {
      id: Date.now(), // Unique ID based on timestamp
      name: name,
    }

    dispatch(addUser(newUser)) // Send action to Redux
    setName('') // Clear input after adding
  }

 
  return (
    <Box display="flex" alignItems="center" justifyContent='center' gap={2} py={4}>
      <TextField
        label="Enter name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="small"
      />
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
    </Box>
  )
}

export default AddUser
