import React from "react";
import {Link} from 'react-router-dom';

function Header(props) {
    return (
        <header className='header'>
            <Link className='header__logo' to='/' onClick={props.comeBack}>Hacker News</Link>
            <button className={`header__update ${props.newsPageOpen && 'header__update_disable'}`} onClick={() => {
                props.editPopupLoading(true);
                props.getTopNews();
            }}/>
        </header>
    )
}

export default Header;