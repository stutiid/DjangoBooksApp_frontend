import { Card, CardActions, CardContent } from "@material-ui/core";
import { Component } from "react";
import StarIcon from "@mui/icons-material/Star";
import "../scss/Author.scss";

/**
 * @description:- the class represents a book by showcasing its details on the card
 */
export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
    };
  }

  /**
   * @description :- to handle the click on more details button and redirecting user to the particular page
   */
  handleClick = () => {
    if (
      window.confirm(
        "Click ok to explore more details, Cancel to Stay on this page"
      )
    ) {
      window.open(
        "https://en.wikipedia.org/wiki/List_of_best-selling_fiction_authors"
      );
    }
  };
  /**
   * @description:- function renders the book page
   * @returns :- the html document
   */
  render() {
    var book = this.state.book;
    return (
      <Card
        className="author-card-display"
        id={book.id}
        styles={{ padding: "0" }}
      >
        <CardContent className="author-content-div" styles={{ padding: "0" }}>
          <h4>Author Details:</h4>
          Name: {book.name}
          <br />
          Author: {book.author}
          <br />
          Date Of Publishing: {book.date_of_publishing}
          <br />
          Average Critics Rating: {book.average_critics_rating}
          <StarIcon style={{ fontSize: "small", color: "green" }} />
          <br />
          Number of Pages:{book.number_of_pages}
          <br />
        </CardContent>
        <CardActions>
          <button className="author-cart-button" onClick={this.handleClick}>
            More details
          </button>
        </CardActions>
      </Card>
    );
  }
}
