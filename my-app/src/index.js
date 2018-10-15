import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './index.css';





  class TodoApp extends React.Component {
      constructor() {
        super();
        this.state = {
             todos: [],
          currentPage: 1,
          todosPerPage: 10
        };
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }


      componentDidMount() {
    fetch("http://cult.intigate.co.in/home/react_mail")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            todos: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }




      render() {
        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map(item => {
          return <li> <label className="lblchk">
          <span>{item.Subject}</span>
<input type="checkbox"  value="" />
<span className="checkmark"></span> <span><strong><span >{item.To}</span></strong> </span> <span>{item.Type}</span>
</label>  <span className="description">{item.Body}</span></li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li className="page-item"
              
              
            >
            <a className="page-link" key={number}
              id={number} onClick={this.handleClick} href="javascript:void(0);">
              {number}
              </a>
            </li>


          );
        });

        return (
         
           
              <div className="outerdiv">
 <div className="innerdiv">

<div className="sltbox"><label >Filter :</label>

 <select >

<option>All </option>
<option>Unread </option>
<option> Read </option>
</select>
 </div>
<div>
<a className="markbtn" href="" >Mark as Read</a></div>

      </div>


      <div>
                <ul className="email_subj">
     {renderTodos}
        </ul>

         <ul className="pagination">
             
            </ul>
      </div>
      <nav className="pagi_cntr" aria-label="Page navigation example">
  <ul className="pagination">
     {renderPageNumbers}
  </ul>
</nav>
     

      </div>
          

        );
      }
    }


    ReactDOM.render(
      <TodoApp />,
      document.getElementById('root')
    );