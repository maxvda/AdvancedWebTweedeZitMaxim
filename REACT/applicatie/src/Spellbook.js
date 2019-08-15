import React from 'react';
import Spellpage from "./Spellpage";
import axios from 'axios';


class Spellbook extends React.Component{
    constructor() {
        super();
        this.state = {
            cards: [],
        };
    }

    componentDidMount() {
        axios.get('http://www.dnd5eapi.co/api/spells')
            .then(response => {
                this.setState({cards: response.data.results});
            });
    }

    render() {
        const { cards } = this.state;
        const cardlist = cards.map((card, key) => {
            return (<Spellpage name={card.name}></Spellpage>);
        });
        return <div>
            <p>Deckrender</p>
            <div id="Decklist">
                {cardlist}
            </div>
        </div>;
    }
}

export default Spellbook;