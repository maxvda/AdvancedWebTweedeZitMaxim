import React from 'react';
import axios from "axios";


class Spell extends React.Component{
    constructor() {
        super();
        this.state = {
            name: "",
            level: 0,
        };
    }

    componentDidMount() {
        const spellName = this.props.name;
        var spellUrl = "";
        axios.get('http://www.dnd5eapi.co/api/spells/?name=' +  spellName.split(' ').join('+'))
            .then(response => {
                spellUrl =response.data.results[0].url;
                axios.get(spellUrl)
                    .then(response => {
                        this.setState({
                            level: response.data.level,
                        })
                    });
            });
        this.setState({
            name: spellName,
        });
    }

    render() {
        const { name, level } = this.state;
        return <div className="spell">
            <h3>{name}</h3>
            <p>
                lvl.{level}
            </p>
        </div>;
    }
}

export default Spell;