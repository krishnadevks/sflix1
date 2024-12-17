import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import "./UserTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
  }); // Added password field
  const [error, setError] = useState("");

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      setUsers(
        usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchUsers();
  }, []);

  // Handle role updates
  const handleUpdateUser = async (userId, newRole) => {
    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, { role: newRole });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error("Error updating user role:", err.message);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  // Handle new user addition
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      // Add new user to Firestore
      const userRef = await addDoc(collection(db, "users"), newUser);
      setUsers((prev) => [...prev, { id: userRef.id, ...newUser }]);
      setNewUser({ email: "", username: "", password: "", role: "user" }); // Reset form
    } catch (err) {
      console.error("Error adding new user:", err.message);
      setError("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="user-table-container">
      <h2>User Details</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>

            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleUpdateUser(user.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New User</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleAddUser} className="add-user-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="add-user-button">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserTable;
