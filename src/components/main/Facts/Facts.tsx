import Card from "../../Card/Card";
import './Facts.css';

const Facts = () => {
    return (
        <div className="facts container--horizontal">
            <Card>
                <div className="big-text">
                    <b>WO?</b>
                </div>
                <a target="_blank" rel="noreferrer" href="https://maps.app.goo.gl/yQysuwGetmZVk8BG9">
                    Uferbahnbrücke, 1200 Wien
                </a>
                <iframe
                    title="Wo?"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d198.66051717473246!2d16.36901237048315!3d48.2585856190164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sde!2sat!4v1720807725441!5m2!1sde!2sat"
                    width="600"
                    height="450"
                    style={{border: 0}}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </Card>
            <Card>
                <div className="big-text">
                    <b>WANN?</b>
                </div>
                <div>29.06.2025, 15:00</div>
                <div>
                    <img src="/images/date.png" alt="Wann?" />
                </div>
            </Card>
            <Card>
                <div className="big-text">
                    <b>WAS?</b>
                </div>
                <div>
                    <i>"<span className="small-text">[...]</span> planschen mit Gummi-Ente und Bier <span className="small-text">[...]</span>"</i>
                </div>
                <div>
                    <img src="/images/treiben.jpg" alt="Was?"/>
                </div>
            </Card>
        </div>
    );
};

export default Facts;