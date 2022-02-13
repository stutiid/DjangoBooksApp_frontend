import { Component } from "react";
import { AppBar, Toolbar, TextField, Button, Modal } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "../scss/AuthorDashboard.scss";
import AddAuthor from "./AddAuthor";
import Author from "./Author";
import Service from "../services/Service";

/**
 * @description :- the class represents a page containing the list of authors nd other operations.
 */
export default class AuthorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchName: "",
      genderFilter: "All",
      ageFilter: "All",
      addAuthor: false,
    };
  }

  /**
   * @description:- the function handles the state change if any in the propeerties of the component by using set state and assigning value to the targeted
   * name
   * @param {*} event :- which triggers the change in the value or state of the field
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * @description:- to set the state for the genderFilter and then calling the filterAuthors method to change the page content accordingly
   * @param {*} event :- which triggers the change in the value or state of the field
   */
  handleGenderFilter = (event) => {
    this.setState(
      {
        genderFilter: event.target.value,
      },
      () => {
        if (this.state.genderFilter === "All") {
          this.getAuthors("author/");
        } else {
          this.filterAuthors("author/", this.state.genderFilter, "gender");
        }
      }
    );
  };

  /**
   * @description:- to handle the opening of popup page to add new author by setting the state of addAuthor to true
   */
  handleClick = () => {
    this.setState({
      addAuthor: true,
    });
  };

  /**
   * @description:- to handle the closing of popup page by setting the state of addAuthor to false
   */
  handleClose = () => {
    this.setState(
      {
        addAuthor: false,
      },
      this.getAuthors("author/")
    );
  };

  /**
   * @description:- to set the state for the ageFilter and then calling the filterAuthors method to change the page content accordingly
   * @param {*} event :- which triggers the change in the value or state of the field
   */
  handleAgeFilter = (event) => {
    this.setState(
      {
        ageFilter: event.target.value,
      },
      () => {
        if (this.state.ageFilter === "All") {
          this.getAuthors("author/");
        } else {
          this.filterAuthors("author/", this.state.ageFilter, "age");
        }
      }
    );
  };

  /**
   * @description:- to reload the contents of page by author name given by user
   */
  handleReload = () => {
    this.filterAuthors("author/", this.state.searchName, "name");
  };

  /**
   * @description:- the function is responsible for calling the other function to retrieve the data when the component is mounted
   */
  componentDidMount() {
    this.getAuthors("author/");
  }

  /**
   * @description:- function handles the retrieving of authord from the backend by making the call to the backend api and then if response is ok then
   * setting the data state to response data and also setting the timer for refresh period
   */
  getAuthors = (url) => {
    (async () => {
      let response = await new Service().getAuthors(url);
      if (response.status === 200) {
        this.setState({
          data: response.data.data,
        });
      } else alert(response);
    })();
  };

  /**
   * @description:- function handles the loading of author data to the CSV file by making a call to backend API
   */
  exportData = () => {
    (async () => {
      let response = await new Service().getAuthors("file_operations_author/");
      if (response.status === 200) {
        alert(response.data.message);
      } else alert(response);
    })();
  };

  /**
   * To get the data from the backend according to the filter given by the user
   * @param {*} url :- backend url
   * @param {*} params :- filter value given by user
   * @param {*} type :- filter type like name, gender and age
   */
  filterAuthors = (url, params, type) => {
    (async () => {
      let response = await new Service().filterAuthorsByName(url, params, type);
      if (response.status === 200) {
        this.setState({ data: response.data.data });
      } else alert(response);
    })();
  };

  /**
   * @description :- function renders the dashboard html page
   */
  render() {
    var display = null;
    const authors = this.state.data;
    if (this.state.addAuthor) {
      display = (
        <Modal open={this.state.addAuthor} onClose={this.handleClose}>
          <div className="add-author-modal">
            <AddAuthor handleClose={this.handleClose} />
          </div>
        </Modal>
      );
    }
    return (
      <div className="dashboard-main-div">
        <AppBar position="static" style={{ background: "#00131c" }}>
          <Toolbar>
            <AccountBoxIcon />
            <span>
              <h3>Authors List</h3>
            </span>
            <div className="dashboard-search-div">
              <TextField
                className="dashboard-search-text"
                variant="standard"
                label="Search"
                name="searchName"
                value={this.state.searchName}
                onChange={this.handleChange}
                required
              />
              <Button onClick={this.handleReload}>
                <SearchIcon />
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <div className="dashboard-content-div">
        <button onClick={(event) => (window.location.href = "./book_dashboard")} className="dashboard-button-author">
            <h4>Book Page</h4>
          </button>
          <button onClick={this.handleClick} className="dashboard-button">
            <h4>Add Author</h4>
            {display}
          </button>
          <button onClick={this.exportData} className="dashboard-button">
            <h4>Export Data</h4>
          </button>
          <select
            value={this.state.genderFilter}
            onChange={this.handleGenderFilter}
            className="dashboard-button"
          >
            <option value="All">Filter by Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Others">Others</option>
          </select>
          <select
            value={this.state.ageFilter}
            onChange={this.handleAgeFilter}
            className="dashboard-button"
          >
            <option value="All">Filter by Age</option>
            <option value="40-50">40-50</option>
            <option value="50-60">50-60</option>
            <option value="60-70">60-70</option>
            <option value="70-80">60-70</option>
            <option value="80-90">80-90</option>
            <option value="90-100">90-100</option>
          </select>
        </div>
        <div className="dashboard-author-div">
          {authors.map((author) => (
            <Author author={author} key={author.id} />
          ))}
        </div>
      </div>
    );
  }
}
