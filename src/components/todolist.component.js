import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../index.css';
import '../App.css'

const Todo = props => (
    <tr>
        <td className={props.todo.completed ? 'completed' : ''} > {props.todo.description}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.responsible }</td>
        <td>
            <Link to={'/edit/' + props.todo._id}>Edit</Link>
        </td>
        
    </tr>
)

export default class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/todos/')
            .then(Response => {
                this.setState({ todos : Response.data })
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    // delete(id){
    //     console.log(id);
    //     axios.delete('/todos/delete'+this.params._id)
    //       .then((result) => {
    //         this.props.history.push("/")
    //       });
    //   }

    onSubmit(e){
        e.preventDefault();
        const listUpdate = {
            description: this.state.description,
            responsible: this.state.responsible,
            completed: this.state.completed
        }
        console.log(listUpdate)
        axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id, listUpdate)
            .then(res => console.log(res.data));

        this.props.history.push('/')

        
    }


    TodoList() {
        return this.state.todos.map(function(currentTodo , i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }


    render(){
        return(
            <div class='content'>
                <table class='highlight '>
                    <thead class='centered '>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>DEADLINE</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>

                    <tbody class='centered '>
                        { this.TodoList() }
                        
                    </tbody>
                </table>
            </div>
        )
    }
}