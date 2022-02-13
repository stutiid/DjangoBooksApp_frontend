import { Component } from "react";
import { AppBar, Toolbar, TextField, Button, Modal } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import "../scss/AuthorDashboard.scss";
import Book from "./Book";
import AddBook from "./AddBook";
import Service from "../services/Service";

/**
 * @description :- the class represents a page containing the collection of books and other operations
 */
var bookUrl = "book/";
export default class AuthorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchName: "",
      yearFilter: "All",
      ratingFilter: "All",
      pageFilter: "All",
      addBook: false,
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
   * @description:- to set the state for the yearFilter and then calling the filterBooks method to change the page content accordingly
   * @param {*} event :- which triggers the change in the value or state of the field
   */
  handleYearFilter = (event) => {
    this.setState(
      {
        yearFilter: event.target.value,
      },
      () => {
        if (this.state.yearFilter === "All") {
          this.getBooks(bookUrl);
        } else {
          this.filterBooks(
            bookUrl,
            this.state.yearFilter,
            "year_of_publishing"
          );
        }
      }
    );
  };

  /**
   * @description:- to handle the opening of popup page to add new book by setting the state of addBook to true
   */
  handleClick = () => {
    this.setState({
      addBook: true,
    });
  };

  /**
   * @description:- to handle the closing of popup page by setting the state of addBook to false
   */
  handleClose = () => {
    this.setState(
      {
        addBook: false,
      },
      this.getBooks(bookUrl)
    );
  };

  /**
   * @description:- to set the state for the ratingFilter and then calling the filterBooks method to change the page content accordingly
   * @param {*} event :- which triggers the change in the value or state of the field
   */
  handleRatingFilter = (event) => {
    this.setState(
      {
        ratingFilter: event.target.value,
      },
      () => {
        if (this.state.ratingFilter === "All") {
          this.getBooks(bookUrl);
        } else {
          this.filterBooks(
            bookUrl,
            this.state.ratingFilter,
            "average_critics_rating"
          );
        }
      }
    );
  };

  /**
   * @description:- to set the state for the pageFilter and then calling the filterBooks method to change the page content accordingly
   * @param {*} event :- which triggers the change in the value or state of the field
   */
  handlePageFilter = (event) => {
    this.setState(
      {
        pageFilter: event.target.value,
      },
      () => {
        if (this.state.pageFilter === "All") {
          this.getBooks(bookUrl);
        } else {
          this.filterBooks(bookUrl, this.state.pageFilter, "no_of_pages");
        }
      }
    );
  };

  /**
   * @description:- to reload the contents of page by book name given by user
   */
  handleReload = () => {
    this.filterBooks(bookUrl, this.state.searchName, "name");
  };

  /**
   * @description:- the function is responsible for calling the other function to retrieve the data when the component is mounted
   */
  componentDidMount() {
    this.getBooks(bookUrl);
  }

  /**
   * @description:- function handles the retrieving of books from the backend by making the call to the backend api and then if response is ok then
   * setting the data state to response data
   */
  getBooks = (url) => {
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
   * @description:- function handles the loading of book data to the CSV file by making a call to backend API
   */
  exportData = () => {
    (async () => {
      let response = await new Service().getAuthors("file_operations_book/");
      if (response.status === 200) {
        alert(response.data.message);
      } else alert(response);
    })();
  };

  /**
   * To get the data from the backend according to the filter given by the user
   * @param {*} url :- backend url
   * @param {*} params :- filter value given by user
   * @param {*} type :- filter type like name, year, rating or number of page
   */
  filterBooks = (url, params, type) => {
    (async () => {
      let response = await new Service().filterBooksByName(url, params, type);
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
    const books = this.state.data;
    if (this.state.addBook) {
      display = (
        <Modal open={this.state.addBook} onClose={this.handleClose}>
          <div className="add-author-modal">
            <AddBook handleClose={this.handleClose} />
          </div>
        </Modal>
      );
    }
    return (
      <div className="dashboard-main-div">
        <AppBar position="static" style={{ background: "#00131c" }}>
          <Toolbar>
            <MenuBookTwoToneIcon />
            <span>
              <h3>Books List</h3>
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
          <button onClick={(event) => (window.location.href = "./author_dashboard")} className="dashboard-button-author">
            <h4>Author Page</h4>
          </button>
          <button
            onClick={this.handleClick}
            className="dashboard-button"
          >
            <h4>Add Book</h4>
            {display}
          </button>
          <button onClick={this.exportData} className="dashboard-button">
            <h4>Export Data</h4>
          </button>
          <select
            value={this.state.yearFilter}
            onChange={this.handleYearFilter}
            className="dashboard-button"
          >
            <option value="All">Filter by Year</option>
            <option value="1989">1989</option>
            <option value="2000">2000</option>
            <option value="2003">2003</option>
            <option value="2005">2005</option>
            <option value="2008">2008</option>
            <option value="2015">2015</option>
            <option value="2018">2018</option>
          </select>
          <select
            value={this.state.ratingFilter}
            onChange={this.handleRatingFilter}
            className="dashboard-button"
          >
            <option value="All">Filter by Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <select
            value={this.state.pageFilter}
            onChange={this.handlePageFilter}
            className="dashboard-button"
          >
            <option value="All">Filter by Page Number</option>
            <option value="0-100">0-100</option>
            <option value="100-200">100-200</option>
            <option value="200-300">200-300</option>
            <option value="300-400">300-400</option>
            <option value="400-500">400-500</option>
            <option value="500-600">500-600</option>
            <option value="600-700">600-700</option>
            <option value="700-800">700-800</option>
            <option value="800-900">800-900</option>
            <option value="900-1000">900-1000</option>
            <option value="1000-1500">1000-1500</option>
          </select>
        </div>
        <div className="dashboard-author-div">
          {books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    );
  }
}
