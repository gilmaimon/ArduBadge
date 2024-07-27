import React from 'react';
import './footer.css'

function Footer (props) {
    return (
        <div className="appFooter">
            <div className="footerText">
                <a href="/" className="homeLink">
                    ArduBadge
                </a>
                <div className="spacing"/>
                <a href="https://github.com/gilmaimon" className="contactLink">
                    Gil Maimon &lt;mail.gilmaimon@gmail.com&gt;
                </a>
            </div>
        </div>
    );
}

export default Footer;