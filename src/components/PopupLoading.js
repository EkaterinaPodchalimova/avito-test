import image from '../images/159612.png';
import React from "react";
import {Link} from 'react-router-dom';

function PopupLoading(props) {
    return (
        <div className={`popup ${props.popupLoadingOpen && 'popup_open'}`}>
            <div className='popup__container'>
                <img src={image} className='popup__image' alt="идет загрузка"/>
                <h2 className='popup__title'>Подождите, пожалуйста, идет загрузка...</h2>
            </div>
        </div>
    )
}

export default PopupLoading;