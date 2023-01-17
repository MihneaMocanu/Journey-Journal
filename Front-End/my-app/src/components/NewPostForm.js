import React, { useState } from "react";
import "./NewPostForm.css";
import { ToastContainer, toast } from 'react-toastify';
import store from "../store/store";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from './constants';

function NewPostForm() {
    const [startingPoint, setStartingPoint] = useState("");
    const [endingPoint, setEndingPoint] = useState("");
    const [transportation, setTransportation] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [duration, setDuration] = useState("");
    const [crowdedness, setCrowdedness] = useState("");
    const [observations, setObservations] = useState("");
    const [satisfaction, setSatisfaction] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // verifica daca utilizatorul e logat
        const state = store.getState();
        if (!state.idUser) {
            toast.error("You must be logged in to create a new post", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: "5rem"
              }
            });
            return;
        }
    
        // creaza obiectul de post
        const post = {
          startingPoint,
          endingPoint,
          transportation,
          departureTime,
          duration,
          crowdedness,
          observations,
          satisfaction,
          authorId: state.idUser,
        };
    
        try {
          const res = await fetch(`${SERVER_URL}/newPost`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          });
    
          if (res.status === 200) {
            const data = await res.json();
            const postId = data.id;
            console.log(`New post ID: ${postId}`);
            console.log(post);
          } else {
            toast.error("Error creating post", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: "5rem"
              }
            });
          }
        } catch (err) {
          console.log(err);
          toast.error("Error creating post", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            style: {
                marginTop: "5rem"
            }
          });
        }
    };

    return (
        <div className="form-box">
            <form onSubmit={handleSubmit} className="form-content">
                <label>
                    Starting Point (A):
                    <input
                        type="text"
                        value={startingPoint}
                        onChange={(e) => setStartingPoint(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Ending Point (B):
                    <input
                        type="text"
                        value={endingPoint}
                        onChange={(e) => setEndingPoint(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Method of transportation:
                    <input
                        type="text"
                        value={transportation}
                        onChange={(e) => setTransportation(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Departure Time:
                    <input
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Travel Duration:
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Crowdedness:
                    <input
                        type="text"
                        value={crowdedness}
                        onChange={(e) => setCrowdedness(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Observations:
                    <textarea
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Satisfaction level:
                    <input
                        type="text"
                        value={satisfaction}
                        onChange={(e) => setSatisfaction(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Post</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default NewPostForm;