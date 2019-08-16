import React from 'react';
import Spellpage from "./Spellpage";


class Spellbook extends React.Component{
    constructor() {
        super();
        this.changer = this.changer.bind(this);
        this.state = {
            changed: false,
        };
    }

    changer(){
        const  {change} = this.state;
        this.setState({change:!change});
    }

    render() {
        let spellList = <div>You haven't added any spells to your SpellBook. Pick a card from the Deck.</div>
        let spellBook = JSON.parse(localStorage.getItem('book'));
        if (spellBook) {
            spellList = spellBook.map((spell, key) => {
                return (<Spellpage key={spell.spell} name={spell.spell} change={this.changer}/>);
            });
        }
        return <div>
            <div id="Decklist">
                {spellList}
            </div>
        </div>;
    }
}

export default Spellbook;