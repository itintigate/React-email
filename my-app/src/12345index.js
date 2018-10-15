import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './index.css';


const  PER_PAGE=3 ;


class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
       currentPage: 1,
          todosPerPage: 3

    };
   
  }

handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

 componentDidMount() {
    fetch("http://localhost/test/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
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
 const { error, isLoaded, items } = this.state;
 const  TOTAL_COUNT=items.len;
console.log(this.state);
  if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else { 
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
      {items.map(item => (          
<li> <label className="lblchk">{item.Subject}
<input type="checkbox"  value={item.Id} />
<span className="checkmark"></span>
</label></li>
))}

        </ul>
      </div>

      <nav className="pagi_cntr" aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">«</span>
       
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">Prev</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
    
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">»</span>
       
      </a>
    </li>
  </ul>
</nav>

  <div>
         <Pagination
      activePage={this.state.activePage}
      itemsCountPerPage={PER_PAGE}
      totalItemsCount={TOTAL_COUNT}
      onChange={this.handlePageChange}
    />
      </div>


      </div>

    );
  }
}

}




ReactDOM.render(
  <MainPage subreddit="reactjs"/>,
  document.getElementById('root')
);