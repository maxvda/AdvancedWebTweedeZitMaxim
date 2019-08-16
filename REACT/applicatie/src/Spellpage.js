import React from 'react';
import axios from "axios";


class Spellpage extends React.Component{
    constructor() {
        super();
        this.removeFromBook = this.removeFromBook.bind(this);
        this.state = {
            name: "",
            level: 0,
            desc: "",
            dndClass: "",
        };
    }

    componentDidMount() {
        const spellName = this.props.name;
        this.setState({name: spellName});
        const spells = JSON.parse(localStorage.getItem("dnd"));
        let spellUrl = "";
        let foundSpell = spells.filter(item => {
            const itemname = item.name.toLowerCase();
            const word = spellName.toLowerCase();
            return itemname.includes(word);
        });
        if (foundSpell) {
            spellUrl = foundSpell[0].url;
            axios.get(spellUrl)
                .then(response => {
                    this.setState({
                        level: response.data.level,
                        desc: response.data.desc,
                        dndClass: response.data.classes[0].name,
                    })
                });
        }
    }

    removeFromBook(){
        const { name } = this.state;
        const currentStorage = JSON.parse(localStorage.getItem('book'));
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
        this.props.change();
    }

    render() {
        const { name, level, desc, dndClass } = this.state;

        return <div className="spell">
            <h3>{name} LV.{level}</h3>
            <p>{desc}</p>
            <h5>{dndClass}</h5>
            <p className="pointer remove" onClick={this.removeFromBook}>x</p>

        </div>;
    }
}

export default Spellpage;