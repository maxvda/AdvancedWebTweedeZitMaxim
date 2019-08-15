import React from 'react';
import Deck from './Deck';
import Spellbook from "./Spellbook";
import axios from "axios";


class Switcher extends React.Component{
    constructor() {
        super();
        this.state = {
            selected: true,
        };
    }

    componentDidMount() {
        let current = localStorage.getItem('page');
        let dnd = localStorage.getItem('dnd');
        if (current !== null) {
            this.setState({selected: current});
        }
            axios.get('http://www.dnd5eapi.co/api/spells')
                .then(response => {
                    localStorage.setItem('dnd', JSON.stringify(response.data.results));
                });
    }

    handleClick () {
        var selected = this.state.selected;
        var newSelected = selected ? false : true;
        this.setState({
            selected: newSelected
        });
    }

    render() {
        var { selected } = this.state;
        return (
            <div>
                <div id="navigation">
                    <div className={selected ? 'navItem selected' : 'navItem deselected'} onClick={()=>{this.handleClick();}}><h2>Decklist</h2></div>
                    <div className={!selected ? 'navItem selected' : 'navItem deselected'} onClick={()=>{this.handleClick();}}><h2>SpellBook</h2></div>
                </div>
                <div id="navCorrect">
                    {selected ? <Deck></Deck> : <Spellbook></Spellbook>}
                </div>
            </div>
        );
    }
}

export default Switcher;