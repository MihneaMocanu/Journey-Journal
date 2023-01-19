import React, { useState, useEffect } from "react";
import { SERVER_URL } from "./constants";
import { useSelector, useDispatch } from "react-redux";
import store from "../store/store";
import { useNavigate } from "react-router-dom";
import accountSettings from "../media/accountSettings.png";
import "./AccountForm.css";

function AccountForm() {
  const [user, setUser] = useState({});
  const idUser = useSelector((state) => state.idUser);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  let imageUrl = accountSettings;

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

  async function handleSubmit() {
    const res = await fetch(`${SERVER_URL}/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const action = { type: "logOut" };
    store.dispatch(action);

    navigate("/");
  }

  function xStart() {
    navigate("/modifyAccount");
  }

  function logOutFunc() {
    const action = { type: "logOut" };
    store.dispatch(action);

    navigate("/");
  }

  return (
    <div className="main-account">
      <div
        id="account"
        style={{
          backgroundColor: "#ffffff",
          float: "left",
          width: "30%",
          padding: "20px",
          marginTop: "10rem",
          border: "3px",
          borderBlockStyle: "dotted",
          color: "#000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px", fontSize: "15px" }}>
            First Name:
          </label>
          <h3 style={{ fontSize: "20px" }}>{user.firstName}</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px", fontSize: "15px" }}>
            Last Name:{" "}
          </label>
          <h3 style={{ fontSize: "20px" }}>{user.lastName}</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px", fontSize: "15px" }}>
            Email:
          </label>
          <h3 style={{ fontSize: "20px" }}>{user.email}</h3>
        </div>
        <div
          style={{
            textAlign: "right",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "12px",
            }}
            type="submit"
            onClick={handleSubmit}
          >
            Delete Account
          </button>
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "12px",
            }}
            type="submit"
            onClick={xStart}
          >
            Modify
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "12px",
            }}
            type="submit"
            onClick={logOutFunc}
          >
            Log out
          </button>
        </div>
        <div>
          <img
            src={imageUrl}
            alt="profile picture"
            style={{
              width: 600,
              height: 600,
              position: "absolute",
              left: "700px",
              top: "100px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default AccountForm;

//Co-authored-by: Mocanu Mihnea-Ștefan <mihnea.mocanu1@gmail.com>
