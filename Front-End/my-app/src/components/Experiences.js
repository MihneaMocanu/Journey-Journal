import './Experiences.css'
import { useEffect, useState } from "react";

function Experiences(){
    const [experiences, setExperiences] = useState([]);
    const getExperiences = async () => {
        const response = await fetch(`${SERVER}/experiences`);
        const data = await response.json();
        setExperiences(data);
    };

    useEffect(() => {
        getExperiences();
    }, []);

    function renderSwitch(param) {
        switch(param) {
          case 'foo':
            return 'bar';
          default:
            return 'foo';
        }
      }

      
    return(
        <div className='experiences'>
            <div className='slide-container'>
                <div className='slide-content'>
                    <div className='card-wrapper'>
                        {experiences.map((e) => (
                            <div className='card'>
                                <div className='image-content'>
                                    <span className='overlay'></span>

                                    <div className='card-image'>
                                        {this.renderSwitch()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experiences;