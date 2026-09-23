import React from 'react';
import tortugaImg from '../../assets/Tortuga.png';

function Tortuga({ posicion, mirandoIzquierda }) {
    return (
        <div 
            className="avatar-tortuga"
            style={{ left: `${posicion}%` }}
        >
            <img 
                src={tortugaImg} 
                alt="Tortuga Koopa" 
                className={`imagen-tortuga ${mirandoIzquierda ? 'volteada' : ''}`} 
            />
        </div>
    );
}

export default Tortuga;