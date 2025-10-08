import React from "react";
import './Header.css';
import RunningText from "../RunningText/RunningText";

const Header: React.FC = () => {
    return (
        <header>
            <RunningText />
            <div className="header__wrapper">
                <div className="header__side header__side--left header__wrapper__side">
                    <img className="header__vienna-logo image-colorized" src="/images/Wien_Wappen.png" alt="vienna"/>
                </div>
                <div>
                    <a className="hidden-link" href="/">
                        <img
                            className="header__simple-logo image-colorized"
                            src="/images/logo-simple.png"
                            alt="DGT Logo"
                        />
                    </a>
                </div>
                <div className="header__side header__side--right header__wrapper__side">
                    <a
                        className="hidden-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://whatsapp.com/channel/0029VaDOOaf11ulOVNR1gp2d"
                    >
                        <img
                            className="header__social-logo image-colorized"
                            src="/images/socialMedia/WhatsApp_Glyph_White.png"
                            alt="WhatsApp"
                        />
                    </a>
                    <a
                        className="hidden-link"
                        target="_blank"
                        href="https://instagram.com/dasgrossetreiben/"
                        rel="noreferrer"
                    >
                        <img
                            className="header__social-logo image-colorized"
                            src="/images/socialMedia/Instagram_Glyph_White.png"
                            alt="Instagram"
                        />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;