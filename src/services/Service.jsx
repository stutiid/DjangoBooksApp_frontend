import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
/**
 * @description:- class is used to make api calls using axios to the backend server and return the appropriate response or error
 */
export default class Service {
  /**
   * @description:- function is used to call the api to add the new author or new book with the data provided by the user. Using axios to get appropriate response
   * on completion or failure of task
   * @param {*} url_append :- url to be appended to the base url to call the api for adding book or author
   * @param {*} data :- given by user to be sent with the request to add the new book or author
   * @returns :- response on completion of promise which will be either success response or failure error
   */
  addAuthor(url_append, data) {
    return axios
      .post(url_append, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data.message;
      });
  }

  /**
   * @description:- function is used to get all the authors or book details from the backend
   * @param {*} url_append :- url to be appended to the base url to call get api for book or author
   * @returns :- response on completion of promise which will be either success response or failure error
   */
  getAuthors(url_append) {
    return axios
      .get(url_append)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data.message;
      });
  }

  /**
   * @description :- function is used to get the filtered list of authors based on the filter value and type provided by the user
   * @param {*} url_append :- url to be appended to the base url to call get api for author
   * @param {*} value :- query parameter value given bu user
   * @param {*} type :- query parameter key given by user on the basis of which filtering is to be done
   * @returns:- response on completion of promise which will be either success response or failure error
   */
  filterAuthorsByName(url_append, value, type) {
    let params;
    if (type === "name") {
      params = {
        name: value,
      };
    }
    if (type === "gender") {
      params = {
        gender: value,
      };
    }
    if (type === "age") {
      params = {
        age: value,
      };
    }
    return axios
      .get(url_append, {
        params: params,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data.message;
      });
  }

  /**
   * @description :- function is used to get the filtered list of books based on the filter value and type provided by the user
   * @param {*} url_append :- url to be appended to the base url to call get api for book
   * @param {*} value :- query parameter value given bu user
   * @param {*} type :- query parameter key given by user on the basis of which filtering is to be done
   * @returns:- response on completion of promise which will be either success response or failure error
   */
  filterBooksByName(url_append, value, type) {
    let params;
    if (type === "name") {
      params = {
        name: value,
      };
    }
    if (type === "average_critics_rating") {
      params = {
        average_critics_rating: value,
      };
    }
    if (type === "year_of_publishing") {
      params = {
        year_of_publishing: value,
      };
    }
    if (type === "no_of_pages") {
      params = {
        no_of_pages: value,
      };
    }
    return axios
      .get(url_append, {
        params: params,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data.message;
      });
  }
}
