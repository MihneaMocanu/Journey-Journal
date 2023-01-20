import React, { useState, useEffect } from "react";
import { SERVER_URL } from "./constants";
import { useSelector, useDispatch } from "react-redux";
import store from "../store/store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
      if (user.firstName !== "" && user.lastName !== "" && user.email !== "") {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      } else {
        toast.error("Empty fields !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          style: {
            marginTop: "5rem",
          },
        });
        return;
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
    <div>
      <form className="form-content">
        <label>
          First Name:
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setFirstName((user.firstName = e.target.value))}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setLastName((user.lastName = e.target.value))}
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            value={user.email}
            onChange={(e) => setEmail((user.email = e.target.value))}
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ModifyAccountForm;
