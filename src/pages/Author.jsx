import { Card, CardActions, CardContent } from "@material-ui/core";
import { Component } from "react";
import "../scss/Author.scss";

/**
 * @description:- the class represents a book by showcasing its details like cover page, title, author and base_price to the user so on button
 * click user can add the book to its cart
 */
export default class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.author,
    };
  }

  handleClick=()=>{
    if (window.confirm('Click ok to explore more details, Cancel to Stay on this page'))
    {
    window.open('https://en.wikipedia.org/wiki/List_of_best-selling_fiction_authors');
    };
  }
  /**
   * @description:- function renders the book page
   * @returns :- the html document
   */
  render() {
    var author = this.state.author;
    return (
      <Card
        className="author-card-display"
        id={author.id}
        styles={{ padding: "0" }}
      >
        <CardContent className="author-content-div" styles={{ padding: "0" }}>
          <h4>Author Details:</h4>
          Name: {author.name}
          <br />
          Age: {author.age}
          <br />
          Gender: {author.gender}
          <br />
          Country: {author.country}
          <br />
        </CardContent>
        <CardActions>
          <button className="author-cart-button" onClick={this.handleClick}>More details</button>
        </CardActions>
      </Card>
    );
  }
}
