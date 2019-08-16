import React from 'react';
import Spell from "./Spell";


class Deck extends React.Component{
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            cards: [],
            filtered: [],
        };
    }

    componentDidMount() {
        let dndStored = localStorage.getItem('dnd');
        this.setState({cards: JSON.parse(dndStored)});
        this.setState({filtered: JSON.parse(dndStored)});
    }

    handleChange(e) {//deze functie is code van https://dev.to/iam_timsmith/lets-build-a-search-bar-in-react-120j
        const { cards } = this.state;
        let currentList = [];
        let newList = [];
        if (e.target.value !== "") {
            currentList = cards;
            newList = currentList.filter(item => {
                const spellname = item.name.toLowerCase();
                const word = e.target.value.toLowerCase();
                return spellname.includes(word);
            });
        } else {
            newList = cards;
        }
        this.setState({
            filtered: newList
        });
    }

    render() {
        const { filtered } = this.state;
        let cardlist = <div>cards not taken from the ether</div>
        if (filtered) {
            cardlist = filtered.map((card, key) => {
                return (<Spell key={card.name} name={card.name}/>);
            });
        }
        return <div>
            <div>
                <input type="text" className="input" placeholder="Search Spells..." onChange={this.handleChange}/>
            </div>
            <div id="Decklist">
                {cardlist}
            </div>
        </div>;
    }
}

export default Deck;