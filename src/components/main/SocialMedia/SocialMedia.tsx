import './SocialMedia.css';

const SocialMedia = () => {
    return (
        <div className="social-media container--horizontal">
            <div className="container--vertical container--align-center">
                <img src="/images/socialMedia/Instagram_QR.png" alt="Instagram" />
                <a className="button button--instagram" href="https://instagram.com/dasgrossetreiben/">
                    Folge uns hier!
                </a>
            </div>
            <div className="container--vertical container--align-center">
                <img src="/images/socialMedia/WhatsApp_QR.png" alt="Whatsapp" />
                <a className="button button--whatsapp" href="https://whatsapp.com/channel/0029VaDOOaf11ulOVNR1gp2d">
                    Trete hier bei!
                </a>
            </div>
        </div>
    );
};

export default SocialMedia;