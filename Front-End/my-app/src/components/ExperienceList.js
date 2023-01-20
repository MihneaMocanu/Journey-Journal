import './ExperienceList.css'
import Experience from './Experience';
import { useEffect, useState } from "react";
import { SERVER_URL } from './constants';
import { useParams } from "react-router-dom";

function ExperienceList(){
    const params = useParams();
    let word = params.word;
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getExperiences = async () => {
        if (!experiences.length) {
            try {
                setIsLoading(true);
                const response = await fetch(`${SERVER_URL}/experiences`);
                const data = await response.json();
                setExperiences(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getExperiencesByWord = async () => {
        if (!experiences.length) {
            try {
                setIsLoading(true);
                const response = await fetch(`${SERVER_URL}/experiences/word/${word}`);
                const data = await response.json();
                setExperiences(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    
    useEffect(() => {
        if(word){
            getExperiencesByWord();
        }
        else{
            getExperiences();
        }
    }, []);

    if (isLoading) return <div>Loading...</div>;
    return(
        <div className='main-experiences'>
            <div className='experience-container'>
                <div className='experience-list'>
                    <div className='card-wrapper'>
                        {experiences.map(e => ( <Experience key = {e.id} item = {e} /> ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExperienceList;