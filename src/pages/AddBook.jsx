import { Component } from "react";
import {
  Input,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from "@material-ui/core";
import Service from "../services/Service";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import "../scss/AddAuthor.scss";

const initialState = {
  name: "",
  author: "",
  date: "",
  rating: "",
  pages: "",
  name_error: "",
  date_error: "",
  rating_error: "",
  page_error: "",
};
export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleClick = (event) => {
    event.stopPropagation();
    this.props.handleClose();
  };

  /**
   * @description:- the function handles the state change if any in the properties of the component by using set state and assigning value to the targated
   * name
   * @param {*} event :- which triggers the change in the value or state of the field
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * @description :- funtion is used to validate the details filled by the user in the respective field is valid or not. If not then respective error
   * will be set and will be reflected on the page on return
   * @returns :- false if any of the fields data is invalid else true will be returned
   */
  validate = () => {
    let name_error = "";
    let date_error = "";
    let rating_error = "";
    let page_error = "";
    if (!this.state.name.match(/^[a-zA-Z\s.]{2,}$/)) {
      name_error = "name is invalid";
    }

    if (!this.state.date.match(/^[1-9][0-9]{3}-[0-1][1-9]-[0-3][1-9]$/)) {
      date_error = "please give date in yyyy-mm-dd format";
    }

    if (!this.state.rating.match(/^10$|^[1-9]{1}$/)) {
      rating_error = "rating is between 1 to 10";
    }

    if (!this.state.pages.match(/^[1-9][0-9]{2,4}$/)) {
      page_error = "number of pages is invalid";
    }

    if (name_error || page_error || date_error || rating_error) {
      this.setState({
        name_error,
        page_error,
        date_error,
        rating_error,
      });
      return false;
    }

    return true;
  };

  /**
   * @description:- function is used to get the from data and make the api call with data and set the appropriate response in the alert box according to
   * the failure or success of api call
   * @param {*} event :- submission of form event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const data = {
        name: this.state.name,
        author: this.state.author,
        date_of_publishing: this.state.date,
        average_critics_rating: parseInt(this.state.rating, 10),
        number_of_pages: parseInt(this.state.pages, 10),
      };
      (async () => {
        let response = await new Service().addAuthor("book/", data);
        if (response.status === 200) {
          alert(response.data.message);
          this.props.handleClose();
        } else alert(response);
        this.setState(initialState);
      })();
    }
  };

  /**
   * @description:- html code to render the note details in the card form
   * @returns :- html code to render note
   */
  render() {
    return (
      <div className="add-author-div">
        <Card elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <div className="add-author-content">
                <span>
                  <h4>Provide Book Details!!!</h4>
                </span>
                <IconButton onClick={this.handleClick}>
                  <CancelPresentationTwoToneIcon />
                </IconButton>
              </div>
              <Input
                onChange={this.handleChange}
                placeholder="name...."
                name="name"
                value={this.state.name}
                fullWidth
                required
              />
              <div className="add-author-error">{this.state.name_error}</div>
              <select name="author" value={this.state.author} onChange={this.handleChange} style={{margin:"4px 0px"}}>
                <option value="">Choose Author Name</option>
                <option value="Jane Austen">Jane Austen</option>
                <option value="William Shakespeare">William Shakespeare</option>
                <option value="J. K. Rowling">J. K. Rowling</option>
                <option value="Stephen King">Stephen King</option>
                <option value="J. R. R. Tolkien">J. R. R. Tolkien</option>
                <option value="Dan Brown">Dan Brown</option>
                <option value="Anne Rice">Anne Rice</option>
                <option value="Stephenie Meyer">Stephenie Meyer</option>
                <option value="Evan Hunter">Evan Hunter</option>
                <option value="Mary Higgins Clark">Mary Higgins Clarkv</option>
                <option value="Amy Tan">Amy Tan</option>
                <option value="Khaled Hosseini">Khaled Hosseini</option>
                <option value="Tana French">Tana French</option>
                <option value="George R.R Martin">George R.R Martin</option>
                <option value="Danzy Senna">Danzy Senna</option>
                <option value="Chetan Bhagat">Chetan Bhagat</option>
                <option value="R. K. Narayan">R. K. Narayan</option>
                <option value="Rabindranath Tagore">Rabindranath Tagore</option>
                <option value="Arundhati Roy">Arundhati Roy</option>
                <option value="Vikram Seth">Vikram Seth</option>
                <option value="Amrita Pritam">Amrita Pritam</option>
                <option value="Malala Yousafzai">Malala Yousafzai</option>
              </select>
              <Input
                onChange={this.handleChange}
                name="date"
                placeholder="yyyy-mm-dd"
                value={this.state.date}
                fullWidth
                required
              />
              <div className="add-author-error">{this.state.date_error}</div>
              <Input
                onChange={this.handleChange}
                name="rating"
                placeholder="rating..."
                value={this.state.rating}
                fullWidth
                required
              />
              <div className="add-author-error">{this.state.rating_error}</div>
              <Input
                onChange={this.handleChange}
                name="pages"
                placeholder="total pages..."
                value={this.state.pages}
                fullWidth
                required
              />
              <div className="add-author-error">{this.state.page_error}</div>
            </CardContent>
            <CardActions>
              <div className="add-author-action">
                <button className="add-author-submit" type="submit">
                  submit
                </button>
              </div>
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}
