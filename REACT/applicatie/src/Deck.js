import React from 'react';
import Spell from "./Spell";
import axios from 'axios';


class Deck extends React.Component{
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
            return (<Spell class="Spell" name={card.name}></Spell>);
        });
        return <div>
            <p>Deckrender</p>
            <div id="Decklist">
                {cardlist}
            </div>
        </div>;
    }
}

export default Deck;