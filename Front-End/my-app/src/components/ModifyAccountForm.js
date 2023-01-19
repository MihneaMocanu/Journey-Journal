import React, { useState, useEffect } from "react";
import { SERVER_URL } from "./constants";
import { useSelector, useDispatch } from "react-redux";
import store from "../store/store";
import { useNavigate } from "react-router-dom";

const ModifyAccountForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const idUser = useSelector((state) => state.idUser);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  async function getUser() {
    const resUser = await fetch(`${SERVER_URL}/users/${idUser}`);
    if (resUser.status === 200) {
      const userAcc = await resUser.json();
      setUser(userAcc);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      if (firstName !== null || firstName.length !== 0) {
        user.firstName = firstName;
      } else {
        setFirstName(firstName);
      }

      if (firstName !== null || lastName.length !== 0) {
        user.lastName = lastName;
      } else {
        setLastName(lastName);
      }

      if (email !== null || email.length !== 0) {
        user.email = email;
      } else {
        setEmail(user.email);
      }

      const res = await fetch(`${SERVER_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
    navigate("/account");
  };

  return (
    <form className="form-content">
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
};

export default ModifyAccountForm;
