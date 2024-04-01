import './dashboard.css';
import React from 'react';
import Authenticate from '../../Components/Authenticator/authenticator';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

  const history = useNavigate();

  const handleClickTriaje = () => {
    history("/triaje");
  };

  const handleClickNoTriaje = () => {
    history("/cuestionario");
  };
  return (
    <section className="Dashboard">
      <div className='Nav'>
      <Authenticate></Authenticate>
      </div>

      <div className='Options'>
          <button className='optionsButton button1' onClick={handleClickNoTriaje}> Realizar Triaje</button>
          <button className='optionsButton button2' onClick={handleClickTriaje}> Triaje Realizado</button>
      </div>
    </section>
    
  );
}

export default Dashboard;
