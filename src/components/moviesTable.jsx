import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

//component movies table which represents the table displayed in the movies page
class MoviesTable extends Component {
  // Because this property does not change throughout the lifecycle of this component
  //a simple property is sufficeint i.e. it does have to be a state object
  // It needs two more empty objects for the header of like and delete buttons

  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLike={() => {
            this.props.onLike(movie);
          }}
        />
      ),
    },
    // content is a function that takes movie as a parameter
    // the content properties are rendered in tableBody component
    {
      key: "delete",
      label: "Delete",
      content: (movie) => (
        <button
          onClick={() => {
            this.props.onDelete(movie._id);
          }}
          disabled={this.setDeleteColumn()}
          className="btn btn-danger"
        >
          delete
        </button>
      ),
    },
  ];

  setDeleteColumn = () => {
    const user = auth.getCurrentUser();

    if (user && user.isAdmin) return false;
    return true;
  };

  render() {
    console.log(this.setDeleteColumn());
    // using object destructuring to get props
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
