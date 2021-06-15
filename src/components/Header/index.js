import React from 'react';
import './styles.scss';

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <a href="#" className="header__logo-link">
                    Phuc<span>Huynh</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;