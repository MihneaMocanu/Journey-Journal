import React, { useEffect, useState } from "react";
import "./NewPostForm.css";
import { ToastContainer, toast } from 'react-toastify';
import store from "../store/store";
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from './constants';
import slightlySatisfied from '../media/slightlySatisfied.svg'
import extremelySatisfied from '../media/extremelySatisfied.svg'
import verySatisfied from '../media/verySatisfied.svg'
import satisfied from '../media/satisfied.svg'
import notSatisfied from '../media/notSatisfied.svg'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

function NewPostForm(props) {
  const { item } = props;
  const [startingPoint, setStartingPoint] = useState("");
  const [endingPoint, setEndingPoint] = useState("");
  const [transportation, setTransportation] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [duration, setDuration] = useState("");
  const [crowdedness, setCrowdedness] = useState("");
  const [observations, setObservations] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [agglomeration, setAgglomeration] = useState({});
  const [transport, setTransport] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [shared, setShared] = useState(false)
  const idUser = useSelector((state) => state.idUser);
  const navigate = useNavigate();

  const [vehicleId, setVehicleId] = useState('');
  const [agglomerationId, setAgglomerationId] = useState('')
  const [satisfactionId, setSatisfactionId] = useState('')

  const [vehicleOption, setVehicleOption] = useState('')
  const [trafficOption, setTrafficOption] = useState('')

  const [agglomerationArray, setAgglomerationArray] = useState([])
  const [vehicleArray, setVehicleArray] = useState([])
  const [satisfactionArray, setSatisfactionArray] = useState([])

  const getData = async () => {
    try {
        setIsLoading(true);
        const resUser = await fetch(`${SERVER_URL}/users/${idUser}`);
        const dataUser = await resUser.json();

        const resAgglomerationArray = await fetch(`${SERVER_URL}/agglomerations`);
        const dataAgglomerationArray = await resAgglomerationArray.json();

        const resVehicleArray = await fetch(`${SERVER_URL}/transportsBy`);
        const dataVehicleArray = await resVehicleArray.json();

        const resSatisfactionArray = await fetch(`${SERVER_URL}/satisfactions`);
        const dataSatisfactionArray = await resSatisfactionArray.json();

        setVehicleArray(dataVehicleArray)
        setAgglomerationArray(dataAgglomerationArray)
        setSatisfactionArray(dataSatisfactionArray)
        setUser(dataUser);
        setVehicleId(dataVehicleArray[0].id)
        setAgglomerationId(dataAgglomerationArray[0].id)
        setSatisfactionId(dataSatisfactionArray[0].id)
        setVehicleOption(dataVehicleArray[0].vehicleType)
        setAgglomeration(dataAgglomerationArray[0].description)
        
    }catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  },[]);

  function handleAgllomeration(event){
      setTrafficOption(event.target.value)
      setAgglomerationId(agglomerationArray[event.target.selectedIndex].id) 
  }

  function handleVehicle(event){
      setVehicleOption(event.target.value)
      setVehicleId(vehicleArray[event.target.selectedIndex].id)
  }

  function handleSatisfaction(event){
      setSatisfactionOption(event.target.value)
      item.SatisfactionId = satisfactionArray[event.target.selectedIndex].id
  }

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

    const post = Object.assign({
      start_adress: startingPoint,
      end_adress: endingPoint,
      start_date: departureTime,
      observation: observations,
      duration_minutes: duration,
      share: shared,
      UserId: idUser,
      SatisfactionId: satisfactionId,
      TransportById: vehicleId,
      AgglomerationId: agglomerationId,
    });
    console.log(JSON.stringify(post))
    try {
      const res = await fetch(`${SERVER_URL}/newExperience`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (res.status === 200) {
        toast.done("Post created", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          style: {
            marginTop: "5rem"
          }
        });
        setTimeout(() => {
          navigate('/newPost');
        }, 2000);
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

  const handleClick = (e) => {
    const selectedIcon = e.target;
    const icons = document.querySelectorAll('.star-rating img');
    icons.forEach(icon => {
      icon.classList.remove("selected");
      icon.classList.add("deselected");
    });
    selectedIcon.classList.remove("deselected");
    selectedIcon.classList.add("selected");
    const key = e.target.dataset.key;
    setSatisfactionId(key)
  }

 
  function renderSwitch(satisfactionLevel, satisfactionId) {
    let image;
    switch (satisfactionLevel) {
      case 'Extremely satisfied':
        image = extremelySatisfied;
        break;
      case 'Very satisfied':
        image = verySatisfied;
        break;
      case 'Satisfied':
        image = satisfied;
        break;
      case 'Slightly satisfied':
        image = slightlySatisfied;
        break;
      default:
        image = notSatisfied;
        break;
    }
    return <img src={image} alt="Satisfaction level" key = {satisfactionId} data-key= {satisfactionId} onClick={handleClick} />
  }

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
        </label>
        <div>
          <select className='dropdown' value={vehicleOption} onChange={handleVehicle}>
            {vehicleArray.map((v) => (<option key={v.id} value={v.vehicleType}>{v.vehicleType}</option>))}
          </select>
        </div>
        <br />
        <label>
          Departure Time:
          <input
            type="datetime-local"
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
            placeholder="Travel duration is in minutes."
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />
        <label>
          Crowdedness:
        </label>
        <div>
          <select className='dropdown' value={trafficOption} onChange={handleAgllomeration}>
            {agglomerationArray.map((a) => (<option key={a.id} value={a.description}>{a.description}</option>))}
          </select>
        </div>
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
          Satisfaction:
          <div className="star-rating">
            {satisfactionArray.map((s) => ( renderSwitch(s.level, s.id) ))}
          </div>
        </label>
        <br />
        <label>
          Share:
        </label>
        <input
          type="checkbox"
          className='card-checkbox'
          checked={shared}
          onChange={() => setShared(!shared)}
        />
        <button type="submit">Post</button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default NewPostForm;