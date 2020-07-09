import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import './App.css';
import './index.css';
import CreateTodo from './components/create-todo.component'
import EditTodo from './components/edit-todo.component'
import TodoList from './components/todolist.component'



function App() {
  return (
    <Router>
      <div className='container'>

          <nav class="nav-extended" id='navbar'>

              <div class="nav-wrapper">
                <Link to='/' class="brand-logo">MERN TODO</Link>
              </div>

              <div class="nav-content">
                  <ul class="tabs tabs-transparent">
                    <Link to='/create'class="tab"><a class="tab" href="#test2">Create</a></Link>
                    <Link to='/' class="tab"><a href="#test1">MyTodo</a></Link>
                  </ul>
              </div>

          </nav>

          <ul class="sidenav" id="mobile-demo">
                <Link to='/create'class="tab"><a class="active" href="#test2">Create</a></Link>
                <Link to='/' class="tab"><a href="#test1">MyTodo</a></Link>      
          </ul>


        <Route path='/' exact component={TodoList}></Route>
        <Route path='/edit/:id' component={EditTodo}></Route>
        <Route path='/create' component={CreateTodo}></Route>
      </div>
    </Router>
  );
}

export default App;
