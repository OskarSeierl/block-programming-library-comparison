import React from "react";
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                <div className="big-text">Weitere Seiten</div>
                <div>
                    <a className="hover-link" href="/impressum">
                        Impressum
                    </a>
                </div>
                <div>
                    <a className="hover-link" href="/style">
                        Style Guide
                    </a>
                </div>
            </div>
            <div>
                <div className="big-text">Kontakt</div>
                <div>
                    <a className="hover-link" href="mailto:dasgrossetreiben@gmail.com">
                        dasgrossetreiben@gmail.com
                    </a>
                </div>
                <div>
                    <a className="hover-link" href="tel:00436504040537">
                        Tel.: +43 650 4040 537
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;