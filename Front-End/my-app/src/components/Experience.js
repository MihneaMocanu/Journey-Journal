import './Experience.css'
import { useEffect, useState } from "react";
import slightlySatisfied from '../media/slightlySatisfied.svg'
import extremelySatisfied from '../media/extremelySatisfied.svg'
import verySatisfied from '../media/verySatisfied.svg'
import satisfied from '../media/satisfied.svg'
import notSatisfied from '../media/notSatisfied.svg'
import { SERVER_URL } from './constants';

function Experience(props){
    const { item } = props;
    const [user, setUser] = useState({});
    const [satisfaction, setSatisfaction] = useState({});
    const [agglomeration, setAgglomeration] = useState({});
    const [transport, setTransport] = useState({});
    const [shared, setShared] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);


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
            
            setUser(dataUser);
            setSatisfaction(dataSatisfaction);
            setAgglomeration(dataAgglomeration);
            setTransport(dataTransport);
            setShared(item.share)
            setStartDate(new Date(item.start_date));
        
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
        switch(satisfaction.level) {
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

    if (isLoading) return <div>Loading...</div>;
    
    return(
        <div>
            { shared ? (
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
                            readOnly
                            rows={4} cols={40} 
                        />
                        <div className='card-row'>
                            <label className='card-label'>
                                Departure:
                            </label>
                            <input className='card-input'
                                type="text"
                                readOnly
                                value={item.start_adress}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Arrival:
                            </label>
                            <input className='card-input'
                                type="text"
                                readOnly
                                value={item.end_adress}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Date:
                            </label>
                            <input className='card-input'
                                type="text"
                                readOnly
                                value={startDate.toLocaleString().substring(0,17)}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Time(mins):
                            </label>
                            <input className='card-input'
                                type="number"
                                readOnly
                                value={item.duration_minutes}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Traffic:
                            </label>
                            <input className='card-input'
                                type="text"
                                readOnly
                                value={agglomeration.description}
                            />
                        </div>
                        <div className='card-row'>
                            <label className='card-label'>
                                Vehicle:
                            </label>
                            <input className='card-input'
                                type="text"
                                readOnly
                                value={transport.vehicleType}
                            />
                        </div>
                    </div>
                </div>
            </div>
            ) : null }
        </div>
    )
}

export default Experience;