import Card from "../../Card/Card";

interface Publication {
    title: string;
    editor: string;
    link: string;
}

const publications: Publication[] = [
    {
        title: "Teenies planschen mit Gummi-Ente und Bier in Donaukanal",
        editor: "Heute.at",
        link: "https://www.heute.at/s/teenies-planschen-mit-gummi-ente-und-bier-in-donaukanal-100283862"
    }
];

const Publications = () => {
    return (
        <div className="container--horizontal">
            {
                publications.map((publication, index) => (
                    <Card key={"p" + index}>
                        <div>
                            <h3>"{publication.title}"</h3>
                            <span>{ publication.editor }</span>
                        </div>
                        <a className="button" target="_blank" href={publication.link}>Lesen</a>
                    </Card>
                ))
            }
        </div>
    );
};

export default Publications;