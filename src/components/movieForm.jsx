import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "./../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  // object destructuring to get state property of react link

  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };
  // a mthod to pupulate genres
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  //a method to populate movie
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      // if the id is new then we do not need to populate the form with a movie object
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      // if movie does not exist then redirect the user to not found
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  //componentDidMount lifecycle hook to initialize values
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  //this function maps the movie object to the type of object required by the form
  // this function basiclally maps movie.genre._id to movie.genreId
  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {/* renders the dropdown list */}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
