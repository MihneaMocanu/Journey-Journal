import './Experience.css'
import { useEffect, useState } from "react";
import slightlySatisfied from '../media/sligthlySatisfied.svg'
import extremlySatisfied from '../media/extremlySatisfied.svg'
import verySatisfied from '../media/verySatisfied.svg'
import satisfied from '../media/satisfied.svg'
import notSatisfied from '../media/notSatisfied.svg'
import { SERVER_URL } from './constants';

function Experience(props){
    const { item } = props;
    const [satisfaction, setSatisfaction] = useState({});

    const getSatisfaction = async () => {
        const response = await fetch(`${SERVER_URL}/${item.id}/satisfactions/${item.SatisfactionId}`);
        const data = await response.json();
        setSatisfaction(data);
    };

    getSatisfaction();

    function renderSwitch() {
        let image;
        switch(satisfaction.level) {
            case 'Extremely satisfied':
                image = extremlySatisfied;
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
    
    return(

            <div className='card'>
                <div className='image-content'>
                    <span className='overlay'></span>
                    <div className='card-image'>
                        { renderSwitch() }
                    </div>
                    <div className='card-content'>
                        <h2 className='name'>Chris Neagu</h2>
                        <p className='description'>lorem ipsum</p>
                        <label className='label-description'>
                            Departure: Vienna
                        </label>
                        <label className='label-description'>
                            Arrival: Bucharest
                        </label>
                        <label className='label-description'>
                            Data: "DD-MM-YYYY"
                        </label>
                        <label className='label-description'>
                            Duration: Minutes
                        </label>
                        <label className='label-description'>
                            Transport: Airplane
                        </label>
                        <label className='label-description'>
                            Traffic: Very Busy
                        </label>
                    </div>
                </div>
            </div>
    )
}

export default Experience;