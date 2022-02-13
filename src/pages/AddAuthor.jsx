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
  age: "",
  gender: "",
  country: "",
  name_error: "",
  age_error: "",
  gender_error: "",
  country_error: "",
};
/**
 * @description:- class represents page for adding new author by filling the form. On submit request will be made to the given api and
 * on success alert message will be displayed and if not then alert containing the error message will be showcased
 */
export default class AddAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

   /**
   * To handle the closing of this popup page by calling the parent function
   * @param {*} event :- which triggers the closing of the popup page
   */
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
    let age_error = "";
    let gender_error = "";
    let country_error = "";
    if (!this.state.name.match(/^[a-zA-Z\s.]{2,}$/)) {
      name_error = "name is invalid";
    }
    if (!this.state.age.match(/^[1-9][0-9]$/)) {
      age_error = "age is invalid";
    }

    if (
      !(
        this.state.gender === "Female" ||
        this.state.gender === "Male" ||
        this.state.gender === "Others"
      )
    ) {
      gender_error = "gender can be Male, Female or Others";
    }

    if (!this.state.country.match(/^[a-zA-Z\s.]{2,}$/)) {
      country_error = "country name is invalid";
    }

    if (name_error || age_error || gender_error || country_error) {
      this.setState({
        name_error,
        age_error,
        gender_error,
        country_error,
      });
      return false;
    }

    return true;
  };

  /**
   * @description:- function is used to get the data from the form and make the api call with data and set the appropriate response in the alert box according to
   * the failure or success of api call
   * @param {*} event :- submission of form event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid=this.validate()
    if(isValid){
        const data = {
            name: this.state.name,
            age: parseInt(this.state.age, 10),
            gender: this.state.gender,
            country: this.state.country,
          };
          (async () => {
            let response = await new Service().addAuthor("author/", data);
            if (response.status === 200) {
              alert(response.data.message);
              this.props.handleClose();
            } else alert(response);
            this.setState(initialState);
          })();
    }
  };

  /**
   * @description:- html code to render the form for adding new author
   */
  render() {
    return (
      <div className="add-author-div">
        <Card elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <div className="add-author-content">
                <span>
                  <h4>Provide Author Details!!!</h4>
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
                <Input
                onChange={this.handleChange}
                name="age"
                placeholder="age..."
                value={this.state.age}
                fullWidth
                required
              />
               <div className="add-author-error">{this.state.age_error}</div>
              <Input
                onChange={this.handleChange}
                name="gender"
                placeholder="gender..."
                value={this.state.gender}
                fullWidth
                required
              />

               <div className="add-author-error">{this.state.gender_error}</div>
              <Input
                onChange={this.handleChange}
                name="country"
                placeholder="country..."
                value={this.state.country}
                fullWidth
                required
              />
               <div className="add-author-error">{this.state.country_error}</div>
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
