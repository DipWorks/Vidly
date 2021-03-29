import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

// component movies
class Movies extends Component {
  state = {
    // It's important to initialize these objects so they are not returned
    //as undefined until the lifecycle hook method is called into action
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  //lifecycle hook method which gets called after the component is rendered in the
  //DOM
  async componentDidMount() {
    // calling the server first for genres
    // here we do not need to wrap these methods in try catch block because
    // there are no expected errors and we do not need to revert the
    // UI to it's previous state
    // Furthermore, if an unexpected error occurs than the interceptor
    // kicks in and logs a generic message
    const { data: genreList } = await getGenres();
    const { data: movies } = await getMovies();
    //first we are adding a new genre to the existing list of genres
    //All genres needs to have an _id property cause we are using it as a key
    //while displaying genres in the list later on
    // Adding all genres to the genres list
    const genres = [{ _id: 1, name: "All Genres" }, ...genreList];
    // set the list of movies and list of genres to respective state objects
    this.setState({ movies, genres });
  }

  // A method that hanles click to the like component
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  // A method that handles delete movies
  // Using optimistic update
  handleDelete = async (movieId) => {
    // store the original movies in case we need to revert back
    const originalMovies = this.state.movies;
    // update the state optimistically
    const movies = originalMovies.filter((m) => m._id !== movieId);
    this.setState({ movies });
    // now call the server
    try {
      await deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      // undo the changes
      this.setState({ movies: originalMovies });
    }
  };

  //A method to handle sorting
  handleSort = (sortColumn) => {
    // set the sortColumn to current column
    this.setState({ sortColumn });
  };

  // A method that handles page change
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  // A method that handles what to display for a particular genre
  handleGenreSelect = (genre) => {
    //we should also set the current page to one so it does not go to the second page of that genre
    // and reset the searchQuery
    this.setState({
      selectedGenre: genre,
      searchQuery: "",
      currentPage: 1,
    });
  };

  // A method that reacts to search query and generates search results
  handleSearch = (query) => {
    //set searchQuery and reset selected genre and currentPage
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  //A method that gets the data to be displayed
  getPageData() {
    //using object destructuring
    const {
      pageSize,
      movies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    //using seperate assignment for currentpage because we need it to be a variable
    let { currentPage } = this.state;

    //make an empty array filteredmovies
    let filteredMovies = movies;

    //check if there is a search query and decide next step
    if (!searchQuery) {
      //filtering items if selectedGenre is truthy
      filteredMovies =
        selectedGenre && !(selectedGenre._id === 1)
          ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
          : movies;
    } else {
      // get the search results
      filteredMovies = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) === true
      );
    }

    //sorting the movies
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    //getting movies from the paginate function
    const moviesForPage = paginate(sortedMovies, currentPage, pageSize);

    //return an object with totalcount and movies
    return { totalcount: filteredMovies.length, data: moviesForPage };
  }

  render() {
    //using object destructuring
    const {
      pageSize,
      genres,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    const { user } = this.props;

    //using seperate assignment for currentpage because we need it to be a variable
    let { currentPage } = this.state;

    // usign object destructuring to get the object properties
    //returned from the method getPageData() and rename data to movies
    const { totalcount, data: movies } = this.getPageData();

    // render method which represents entire movies component
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <div>
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New movie
              </Link>
            </div>
          )}

          {<p>Showing {movies.length} movies. </p>}
          <SearchBox value={searchQuery} onSearch={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalcount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
