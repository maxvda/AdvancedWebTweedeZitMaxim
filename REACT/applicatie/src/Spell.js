import React from 'react';
import axios from "axios";


class Spell extends React.Component{
    constructor() {
        super();
        this.addToBook = this.addToBook.bind(this);
        this.removeFromBook = this.removeFromBook.bind(this);
        this.state = {
            name: "",
            level: 0,
            contains: false,
        };
    }

    addToBook(){
        const { name } = this.state;
        this.setState({contains: true});
        const currentStorage = JSON.parse(localStorage.getItem('book'));
        let total = [];
        if(currentStorage === null){
            total = [{spell:name}];
        } else {
            total = currentStorage;
            total.push({spell: name});
        }
        localStorage.setItem('book', JSON.stringify(total));
    }

    removeFromBook(){
        const { name } = this.state;
        const currentStorage = JSON.parse(localStorage.getItem('book'));
        this.setState({contains: false});
        let total = [];
        if(currentStorage !== null){
            total = currentStorage;
            const removed = total.filter(item => {
                const exists = item.spell.toLowerCase();
                const current = name.toLowerCase();
                return exists !== current;
            });
            localStorage.setItem('book', JSON.stringify(removed));
        }
    }

    componentDidMount() {
        const spellName = this.props.name;
        const spells = JSON.parse(localStorage.getItem("dnd"));
        const book = JSON.parse(localStorage.getItem("book"));
        let spellUrl = "";
        let foundSpell = spells.filter(item => {
            const itemname = item.name.toLowerCase();
            const word = spellName.toLowerCase();
            return itemname.includes(word);
        });
        if (foundSpell) {
            spellUrl = foundSpell[0].url;
        }
                axios.get(spellUrl)
                    .then(response => {
                        this.setState({
                            level: response.data.level,
                        })
                    });

        let ownedSpell = book.filter(item => {
            const itemname = item.spell.toLowerCase();
            const word = spellName.toLowerCase();
            return itemname.includes(word);
        });
        if (ownedSpell.length > 0) {
            this.setState({contains: true});
        }

        this.setState({
            name: spellName,
        });
    }

    render() {
        const { name, level, contains } = this.state;
        let action = "";
        if(contains){
            action = <p className="pointer" onClick={this.removeFromBook}>&#10003;</p>;
        } else {
            action = <p className="pointer" onClick={this.addToBook}>+</p>;
        }
        return <div className="spell">
            <h3>{name}</h3>
            <p>
                lvl.{level}
            </p>
            {action}

        </div>;
    }
}

export default Spell;