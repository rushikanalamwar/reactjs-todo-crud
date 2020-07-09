import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import axios from 'axios';
import '../App.css'
import '../index.css'

import 'materialize-css';

export default class CreateTodo extends Component{
    constructor(props){
        super(props);

        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeResponsible=this.onChangeResponsible.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            description:'',
            responsible: '',
            completed: false
        }
    }
    
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeResponsible(e){
        this.setState({
            responsible: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`submitted`)
        console.log(`desc: ${this.state.description}`)
        console.log(`res: ${this.state.responsible}`)

        const newList ={
            description: this.state.description,
            responsible: this.state.responsible,
            completed: this.state.completed
        };

        axios.post('http://localhost:4000/todos/add', newList)
            .then(res => console.log(res.data))

        this.setState({
            description:'',
            responsible: '',
            completed: false
        })
    }

    render() {
        return (
            <div class='content'>
                <br />
            <form onSubmit={this.onSubmit}>
                <div class="row">
                    <div class="input-field col s12">
                    <input
                        type='text'
                        required='true'
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        >
                    </input>
                    <label>DESCRIPTION</label>
                    </div>
                </div>

                <div class='row'>
                    <div class=" lol col s12">
                    <label>DUE DATE</label>
                    <input
                        type='date'
                        required='true'
                        class='datepicker'
                        value={this.state.responsible}
                        onChange={this.onChangeResponsible}
                        >
                    </input>
                    </div>
                </div>

                <p class='center-align'>            
                <button class="btn waves-effect waves-light " type="submit" name="action" id='send'>ADD TODO
                </button>
                </p> 
            </form>
            </div>
        )
    }
}