import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types'

class AddProject extends Component {

    constructor(){
        super();
        this.state = {
            newProject:{}
        }
    }


    //Want categories to be a prop of the component
    static defaultProps = {
        categories: ['Web Design', 'Web Development', 'Mobile Development']
    }
    
    //need to pass in an event parameter 
    handleSubmit(e){
        if(this.refs.title.value === ''){
            alert('Title is required');
        } else {
            this.setState({newProject:{
                id: uuid.v4(),
                title: this.refs.title.value,
                category: this.refs.category.value
            }}, function(){
                // console.log(this.state);
                this.props.AddProject(this.state.newProject);
            });
        }
        e.preventDefault();
    }

    
    


    render() {
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        })
    return (
      <div>
      <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                <label>Title</label><br />
                <input type="text" ref="title" />
            </div> 
            <div>
                <label>Category</label><br />
                <select ref="category">
                    {categoryOptions}
                </select>
            </div>  
            <br />
            <input type="submit" value="submit" /> 
        </form>
      </div>
    );
  }
}

AddProject.propTypes = {
    categories: PropTypes.array,
    AddProject: PropTypes.func
  } 

 
export default AddProject;
