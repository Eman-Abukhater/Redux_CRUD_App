import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../features/users/usersSlice'

const UserList = () => {
  const users = useSelector((state) => state.users.users) // Read from Redux
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteUser(id)) // Send delete action
  }

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserList
