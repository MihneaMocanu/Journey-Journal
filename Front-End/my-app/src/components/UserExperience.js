import './Experience.css'
import { useEffect, useState } from "react";
import slightlySatisfied from '../media/slightlySatisfied.svg'
import extremelySatisfied from '../media/extremelySatisfied.svg'
import verySatisfied from '../media/verySatisfied.svg'
import satisfied from '../media/satisfied.svg'
import notSatisfied from '../media/notSatisfied.svg'
import { SERVER_URL } from './constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function UserExperience(props){
    const { item } = props;
    const [user, setUser] = useState({});
    const [satisfaction, setSatisfaction] = useState({});
    const [agglomeration, setAgglomeration] = useState({});
    const [transport, setTransport] = useState({});
    const [shared, setShared] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState('')
    const [vehicleOption, setVehicleOption] = useState('')
    const [trafficOption, setTrafficOption] = useState('')
    const [satisfactionOption, setSatisfactionOption] = useState('')

    const navigate = useNavigate();
    
    const [agglomerationArray, setAgglomerationArray] = useState([])
    const [vehicleArray, setVehicleArray] = useState([])
    const [satisfactionArray, setSatisfactionArray] = useState([])

    const getData = async () => {
        try {
            setIsLoading(true);
            const resUser = await fetch(`${SERVER_URL}/users/${item.UserId}`);
            const dataUser = await resUser.json();
    
            const resSatisfaction = await fetch(`${SERVER_URL}/${item.id}/satisfactions/${item.SatisfactionId}`);
            const dataSatisfaction = await resSatisfaction.json();
    
            const resAgglomeration = await fetch(`${SERVER_URL}/${item.id}/agglomeration/${item.AgglomerationId}`);
            const dataAgglomeration = await resAgglomeration.json();
    
            const resTransport = await fetch(`${SERVER_URL}/${item.id}/transportBy/${item.TransportById}`);
            const dataTransport = await resTransport.json();
            
            const resAgglomerationArray = await fetch(`${SERVER_URL}/agglomerations`);
            const dataAgglomerationArray = await resAgglomerationArray.json();

            const resVehicleArray = await fetch(`${SERVER_URL}/transportsBy`);
            const dataVehicleArray = await resVehicleArray.json();

            const resSatisfactionArray = await fetch(`${SERVER_URL}/satisfactions`);
            const dataSatisfactionArray = await resSatisfactionArray.json();

            setUser(dataUser);
            setSatisfaction(dataSatisfaction);
            setAgglomeration(dataAgglomeration);
            setTransport(dataTransport);
            setShared(item.share)
            const date = new Date(item.start_date).toISOString();
            const formattedDate = date.substring(0, 10) + 'T' + date.substring(11, 16);
            setStartDate(formattedDate);
            setDeparture(item.start_adress);
            setArrival(item.end_adress);
            setDuration(item.duration_minutes)
            setVehicleOption(dataTransport.vehicleType)
            setTrafficOption(dataAgglomeration.description)
            setVehicleArray(dataVehicleArray)
            setAgglomerationArray(dataAgglomerationArray)
            setSatisfactionArray(dataSatisfactionArray)
            setSatisfactionOption(dataSatisfaction.level)
        }catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    },[]);
   

    function renderSwitch() {
        let image;
        switch(satisfactionOption) {
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
        return <img src={image} alt="Satisfaction level" className='card-img'/>
    }
    
    function handleDescription(event){
        item.observation = event.target.value;
    }

    function handleAgllomeration(event){
        setTrafficOption(event.target.value)
        item.AgglomerationId = agglomerationArray[event.target.selectedIndex].id
    }

    function handleVehicle(event){
        setVehicleOption(event.target.value)
        item.TransportById = vehicleArray[event.target.selectedIndex].id
    }

    function handleSatisfaction(event){
        setSatisfactionOption(event.target.value)
        item.SatisfactionId = satisfactionArray[event.target.selectedIndex].id
    }

    async function handleSave(event){
        event.preventDefault();

        //item-ul curent 
        item.start_adress = departure;
        item.end_adress = arrival;
        item.start_date = startDate;
        item.duration_minutes = duration;
        item.share = shared;

        const res = await fetch(`${SERVER_URL}/experiences/${item.id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        if(res.status === 200){
            toast.success("Experience modified", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                style: {
                    marginTop: "5rem",
                    fontSize: "1.2rem"
                }
            });
        }
    }

    async function handleDelete(event){
        event.preventDefault();
        const res = await fetch(`${SERVER_URL}/experiences/${item.id}`, {
            method: "delete"
        });
        if(res.status === 200){
            toast.success("Experience deleted", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            style: {
                marginTop: "5rem",
                fontSize: "1.2rem"
            }
            });
        }
    }
    if (isLoading) return <div>Loading...</div>;
    if (!item.id) return;

    return(
        <div>
            <div className='card'>
                <div className='image-content'>
                    <span className='overlay'></span>
                    <div className='card-image'>
                        { renderSwitch() }
                    </div>
                    <div className='card-content'>
                        <h2 className='name'>{user.firstName}</h2>
                        <textarea 
                            className='description'
                            defaultValue={item.observation}
                            onChange={handleDescription}
                            rows={4} cols={40} 
                        />
                        <div className='card-row'>
                            <label className='card-label'>
                                Departure:
                            </label>
                            <input className='card-input'
                                type="text"
                                value={departure}
                                onChange={event => setDeparture(event.target.value)}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Arrival:
                            </label>
                            <input className='card-input'
                                type="text"
                                value={arrival}
                                onChange={event => setArrival(event.target.value)}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Date:
                            </label>
                            <input className='card-input'
                                type="datetime-local"
                                value={
                                    startDate
                                }
                                onChange={event => setStartDate(event.target.value)}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Time(mins):
                            </label>
                            <input className='card-input'
                                type="number"
                                value={duration}
                                onChange={event => setDuration(event.target.value)}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Traffic:
                            </label>
                            <div>
                            <select className='dropdown' value={trafficOption} onChange={handleAgllomeration}>
                            {agglomerationArray.map((a) => ( <option key= {a.id} value={a.description}>{a.description}</option> ))}
                            </select>
                            </div>
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Vehicle:
                            </label>
                            <div>
                            <select className='dropdown' value={vehicleOption} onChange={handleVehicle}>
                            {vehicleArray.map((v) => ( <option key= {v.id} value={v.vehicleType}>{v.vehicleType}</option> ))}
                            </select>
                            </div>
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Satisfaction:
                            </label>
                            <div>
                            <select className='dropdown' value={satisfactionOption} onChange={handleSatisfaction}>
                            {satisfactionArray.map((s) => ( <option key = {s.id} value={s.level}>{s.level}</option> ))}
                            </select>
                            </div>
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                    Share:
                            </label>
                            <input 
                            type="checkbox" 
                            className='card-checkbox'
                            checked={shared}
                            onChange={() => setShared(!shared)}
                            />
                        </div>
                       
                        <div className='card-row'>
                            <button className='card-delete' onClick={handleDelete}>Delete</button>
                            <button className='card-save' onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default UserExperience;