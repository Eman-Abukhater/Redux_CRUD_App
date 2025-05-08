import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../users/usersSlice'

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
    <div>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update state when typing
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  )
}

export default AddUser
