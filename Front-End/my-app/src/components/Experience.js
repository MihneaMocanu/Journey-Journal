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
    console.log(props);
    async function renderSwitch(experience) {
        const res = await fetch(`${SERVER_URL}/${experience.id}/satisfactions/${experience.SatisfactionId}`);
        const satisfaction = await res.json();
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
        return `<image src=${image}></image>`
    }
    
    return(
        <div className='card'>
            <div className='image-content'>
                <span className='overlay'></span>
                <div className='card-image'>
                    
                </div>
            </div>
        </div>
    )
}

export default Experience;