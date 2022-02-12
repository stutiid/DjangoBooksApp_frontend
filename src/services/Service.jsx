import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
/**
 * @description:- class is used to make api calls using axios to the backend server and return the appropriate response or error
 */
export default class Service {
  /**
   * @description:- function is used to call the api to register the user or to call the api for forgot password with the data provided by the user. Using axios to get appropriate response
   * on completion or failure of task
   * @param {*} url_append :- url to be appended to the base url to call the register api or the forgot api
   * @param {*} data :- given by user to be sent with the request to register the user or to set the password depends on the url_append and the data
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

  filterAuthorsByName(url_append,value,type) {
    let params
    if (type === "name"){
      params = {
        name:value
      };
    }
    if (type === "gender"){
      params = {
        gender:value
      };
    }
    if(type==="age"){
      params = {
        age:value
      };
    }
    return axios
      .get(url_append,{
        params: params
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data.message;
      });
  }

  filterBooksByName(url_append,value,type) {
    let params
    if (type === "name"){
      params = {
        name:value
      };
    }
    if (type === "average_critics_rating"){
      params = {
        average_critics_rating:value
      };
    }
    if(type==="year_of_publishing"){
      params = {
        year_of_publishing:value
      };
    }
    if(type==="no_of_pages"){
      params = {
        no_of_pages:value
      };
    }
    return axios
      .get(url_append,{
        params: params
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data.message;
      });
  }
}