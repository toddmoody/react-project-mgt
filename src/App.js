import React, { Component } from 'react';
import uuid from 'uuid';
import Projects from './components/Projects';
import AddProject from './components/AddProject'
import $ from 'jquery';
import Todos from './components/Todos'
import './App.css';

class App extends Component {
  
  // You want the data stored in state and then passed to components via properties.
  // the data should be immutable i.e. passed down.
  constructor(){
    //when you put a constructor in you have to call super() like so...
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }

  getToDos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      datatype: 'json',
      cache: 'false',
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        })
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }

    })
  }

  getProjects(){
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id: uuid.v4(),
        title: 'Social App',
        category: 'Mobile Development'
      },
      {
        id: uuid.v4(),
        title: 'eCommerce Shopping Cart',
        category: 'Web Development'
      }
    ]});
  }


  // this is a lifestyle method - this is also what you would use if you were doing an AJAX API call - either this or component did mount.
  // You could have the array of data in the constructor above but this is a better way to achieve it.
  componentWillMount(){
    this.getProjects();
    this.getToDos();
  }

  componentDidMount(){
    this.getToDos();
  }
  
  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects: projects});
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects})

  }

  render() {
    return (
      // You can only have one div at the very top level
      <div className="App">
      <AddProject AddProject={this.handleAddProject.bind(this)} />
      <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
      <hr />
      <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
