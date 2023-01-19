import './ExperienceList.css'
import Experience from './Experience';
import { useEffect, useState } from "react";
import { SERVER_URL } from './constants';

function ExperienceList(props){
    const [experiences, setExperiences] = useState([]);
    const getExperiences = async () => {
        const response = await fetch(`${SERVER_URL}/experiences`);
        const data = await response.json();
        setExperiences(data);
    };

    useEffect(() => {
        getExperiences();
    }, []);
    
    return(
        <div className='main-experiences'>
            <div className='experience-container'>
                <div className='experience-list'>
                    <div className='card-wrapper'>
                        {experiences.map(e => ( <Experience key = {e.id} item = {e} /> ))}
                        {experiences.map(e => ( <Experience key = {e.id} item = {e} /> ))}
                        {experiences.map(e => ( <Experience key = {e.id} item = {e} /> ))}
                        {experiences.map(e => ( <Experience key = {e.id} item = {e} /> ))}
                        {experiences.map(e => ( <Experience key = {e.id} item = {e} /> ))}
                        {experiences.map(e => ( <Experience key = {e.id} item = {e} /> ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExperienceList;