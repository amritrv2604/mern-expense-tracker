import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update localStorage
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);

      toast.success("Profile Updated!");

      setLoading(false);
    } catch (err) {
      toast.error("Update failed");
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Edit Profile ✏️</h2>

        <form className="profile-form" onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="profile-btn" type="submit">
            Update
          </button>
        </form>

        <Link className="back-link" to="/dashboard">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Profile;
