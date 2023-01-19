import './ExperienceList.css'
import UserExperience from './UserExperience';
import { useEffect, useState } from "react";
import { SERVER_URL } from './constants';
import { useSelector, useDispatch } from "react-redux";

function UserExperienceList(props){
    const idUser = useSelector((state) => state.idUser);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [experiences, setExperiences] = useState([]);
    const getExperiences = async () => {
        const response = await fetch(`${SERVER_URL}/experiences/UserId/${idUser}`);
        const data = await response.json();
        setExperiences(data);
    };

    useEffect(() => {
        getExperiences();
    }, []);
    
    if(!experiences) return <div></div>;

    return(
        <div className='main-experiences'>
            <div className='experience-container'>
                <div className='experience-list'>
                    <div className='card-wrapper'>
                        {experiences.map(e => ( <UserExperience key = {e.id} item = {e} /> ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserExperienceList;