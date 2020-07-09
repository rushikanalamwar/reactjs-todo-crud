import React, {Component} from 'react';
import axios from 'axios';
import '../App.css'

export default class EditTodo extends Component {

    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deletelol = this.deletelol.bind(this);

        this.state ={
            description: '',
            responsible: '',
            completed: false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    responsible: response.data.responsible,
                    completed: response.data.completed
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    onChangeCompleted(e){
        this.setState({
            completed: !this.state.completed
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }

    onChangeResponsible(e){
        this.setState({
            responsible: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const listUpdate = {
            description: this.state.description,
            responsible: this.state.responsible,
            completed: this.state.completed
        }
        // console.log(listUpdate)
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, listUpdate)
            .then(res => console.log(res.data));

            this.props.history.push('/')

        this.props.history.push('/')


        
    }
    deletelol(id){
        id.preventDefault();
        axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));

            this.props.history.push('/')

        this.props.history.push('/')

        
    }



    render(){
        return(
            <div class='content'>
                <br /> <br />
                <div class="row">
                    <div class="lol col s12">
                        <label>DESCRIPTION</label>
                        <input
                        type='text'
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        ></input>
                   </div>
                </div>

                <div class='row'>
                    <div class=" lol col s12">
                        <label>DUE</label>
                        <input
                        type='date'
                        value={this.state.responsible}
                        onChange={this.onChangeResponsible}
                        ></input>
                    </div>
                </div>
                

                <p>
                    <label class='check'>
                        <input type="checkbox" 
                        onChange={this.onChangeCompleted}
                        checked={this.state.completed}
                        value={this.state.completed}
                        />
                        <span>completed??</span>
                    </label>
                </p>
                
                    
                <p class='center-align'>
                <button class="btn waves-effect waves-light" type="submit" name="action" id='UpdateBtn'onClick={this.onSubmit}>Update
                
                </button>

                <button class="btn waves-effect waves-light" type="submit" name="action" id='UpdateBtn' onClick={this.deletelol}>Delete
                
                </button>
                </p>
            </div>
            
        )
    }
}