import './App.css';
import React, { useState, useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MovieDetails from './Movie/MovieDetails';
import AddMovie from './Movie/AddMovie';
import EditMovie from './Movie/EditMovie';

import AddShowing from './Showing/AddShowing';
import EditShowing from './Showing/EditShowing';
import ShowingTickets from './Showing/ShowingTickets';

import Home from './Home/Home'
import Navbar from './components/Navbar'

import MoviesPage from './pages/MoviesPage'
import RoomsPage from './pages/RoomsPage'
import ShowingsPage from './pages/ShowingsPage'

import * as MovieActions from './Actions/MovieActions';
import * as RoomActions from './Actions/RoomActions';
import * as ShowingActions from './Actions/ShowingActions';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  let dispatch = useDispatch()
  const state = useSelector(state => state);
  const movies = useSelector(state => state.movies);
  const rooms = useSelector(state => state.rooms);
  const showings = useSelector(state => state.showings);
  const [todayDate, setTodayDate] = useState()
  const [currentShowings, setCurrentShowings] = useState()
  const [todayLoaded, setTodayLoaded] = useState()

  useEffect(() => {
    console.log("App state", state)
    console.log("App movies", movies)
    console.log("App rooms", rooms)
    console.log("App showings", showings)
    dispatch(MovieActions.getMovies());
    dispatch(RoomActions.getRooms());
    dispatch(ShowingActions.getShowings());

    setTodayDate(new Date());

    // console.log("useEffect App", todayShowings, currentShowings)
  }, [])

  useEffect(() => {
    setCurrentShowings(showings.showingsList.filter(isCurrent));
    setTodayLoaded(true);
  }, [showings, todayDate, movies.loaded])

  function createNotification(message, type) {
    switch (type) {
      case "ERROR":
        NotificationManager.error(message, 'Error');
        break;
      default:
        break;
    }
  }

  function validateMovieForm (movie) {
    var messages = [];

    if ((movie.title.charAt(0) !== movie.title.charAt(0).toUpperCase() && isNaN(movie.title)) || (movie.title.charAt(0) === movie.title.charAt(0).toUpperCase() && !isNaN(movie.title))) {
      messages.push("Tytuł filmu musi zaczynać się wielką literą lub cyfrą\n");
    }

    if (movie.title.length < 1) {
      messages.push("Tytuł filmu musi mieć więcej niż jeden znak\n");
    }

    if (movie.length <= 30) {
      messages.push("Długość filmu musi być większa od 30\n");
    }

    if (movie.length >= 300) {
      messages.push("Długość filmu musi być mniejsza od 300\n");
    }

    if (Math.floor(movie.length) != movie.length) {
      messages.push("Długość filmu musi być liczbą całkowitą\n");
    }
    return messages;
  }

  function validateDeleteMovie (movieId) {
    var messages = [];

    let showing = showings.showingsList.find(element => element.movieId == movieId);

    if (showing) {
      messages.push("Nie można usunąć filmu, który ma utworzony seans\n");
    }

    return messages;
  }

  function validateShowingForm (form_showing) {
    var messages = [];

    let showing;
    // console.log("showing form validate", form_showing)
    if(form_showing.id >= 0) {
      showing = showings.showingsList.find(element => element.id == form_showing.id)

      // console.log("ShowingForm date", current_date, showing_date);
      // console.log("Validate timeDiff", new Date(showing.date).getTime(), new Date().getTime())

      if(new Date(showing.date).getTime() < new Date().getTime()) {
        messages.push("Nie można edytować seansu, który się odbył\n");
      }

      // console.log("Showing validate tickets sold", showing.ticketsSold, showing.ticketsSold > 0)
      if(showing.ticketsSold > 0) {
        messages.push("Nie można edytować seansu, na który został kupiony bilet\n");
      }
    }

    let db_room = rooms.roomsList.find(element => element.id == form_showing.roomId);
    let db_movie = movies.moviesList.find(element => element.id == form_showing.movieId);
    let current_date = new Date();
    let showing_date = new Date(form_showing.date);

    if(form_showing.date === 'Invalid date') {
      messages.push("Data jest wymagana\n");
    }
    if(form_showing.movieId === -1) {
      messages.push("Film jest wymagany\n");
    }
    if(form_showing.roomId === -1) {
      messages.push("Sala jest wymagana\n");
    }

    if (db_movie === undefined) {
      messages.push("Film musi istnieć w bazie danych\n");
    }

    if (db_room === undefined) {
      messages.push("Sala musi istnieć w bazie danych\n");
    }

    if (current_date.getTime() > showing_date.getTime()) {
      messages.push("Data nie może być wcześniejsza od bieżącej\n");
    }

    if (showing_date.getMinutes() % 15 !== 0) {
      messages.push("Godzina musi być zaokrąglona do kwadransu\n");
    }

    return messages;
  }

  function validateDeleteShowing (showingId) {
    var messages = [];

    let showing = showings.showingsList.find(element => element.id == showingId);

    if(new Date(showing.date).getTime() < new Date().getTime()) {
      messages.push("Nie można edytować seansu, który się odbył\n");
    }

    if(showing.ticketsSold > 0) {
      messages.push("Nie można edytować seansu, na który został kupiony bilet\n");
    }

    return messages;
  }

  function validateShowingTicket (paramShowing, choice) {
    var messages = [];

    let showing = showings.showingsList.find(element => element.id == paramShowing.id);

    if(new Date(showing.date).getTime() < new Date().getTime()) {
      messages.push("Nie można kupić biletu na seans, który się odbył\n");
    }

    console.log("Validate ticket", showing.takenSeats, choice)
    if(showing.takenSeats.includes(choice)) {
      messages.push("Miejsce zajęte. Nie można sprzedać biletu.\n");
    }

    return messages;
  }

  //Movie functions ====================
  function addMovie (obj) {
    console.log("App addMovie", obj)
    var message = validateMovieForm(obj);

    if (message.length == 0) {
      dispatch(MovieActions.addMovie(obj))
    } else {
      createNotification(message, "ERROR");
    }
  }

  function editMovie (obj) {
    console.log("App editMovie", obj)
    var message = validateMovieForm(obj);

    if (message.length == 0) {
      dispatch(MovieActions.editMovie(obj))
    } else {
      createNotification(message, "ERROR");
    }
  }

  function deleteMovie(id) {
    console.log("App deleteMovie", id)
    // dispatch(MovieActions.deleteMovie(id))
    var message = validateDeleteMovie(id);

    if (message.length == 0) {
      dispatch(MovieActions.deleteMovie(id))
    } else {
      createNotification(message, "ERROR");
    }
  }

  //Showing functions ====================
  function addShowing (obj) {
    if(obj.roomId !== -1) {
      let room = rooms.roomsList.find(element => element.id === obj.roomId);
      obj.ticketsAvailable = room.capacity;
    }
    console.log("App addShowing", obj)
    var message = validateShowingForm(obj);

    if (message.length == 0) {
      dispatch(ShowingActions.addShowing(obj))
    } else {
      createNotification(message, "ERROR");
    }
  }

  function editShowing (obj) {
    console.log("App editShowing", obj)

    // let showing = showings.showingsList.find(element => element.id == obj.id);
    var message = validateShowingForm(obj);

    if (message.length == 0) {
      dispatch(ShowingActions.editShowing(obj))
    } else {
      createNotification(message, "ERROR");
    }
  }

  function buyShowingTicket (showing, choice) {
    console.log("App buyShowingTicket", showing)

    var message = validateShowingTicket(showing, choice);

    if (message.length == 0) {
      showing.takenSeats.push(parseInt(choice));
      showing.takenSeats.sort(function (a, b) {  return a - b;  })
      dispatch(ShowingActions.editShowing(showing))
    } else {
      createNotification(message, "ERROR");
    }
  }

  function deleteShowing (id) {
    console.log("App deleteShowing", id)
    // dispatch(ShowingActions.deleteShowing(id))

    var message = validateDeleteShowing(id);

    if (message.length == 0) {
      dispatch(ShowingActions.deleteShowing(id))
    } else {
      createNotification(message, "ERROR");
    }
  }

  function isCurrent(showing, index, array) {
    // console.log("iscurrent movies", showing.movieId)

    let movieLength = movies.moviesList.find(element => element.id == showing.movieId);
    if(!movieLength) {
      return false;
    }

    movieLength = movieLength.length;

    let showingTime = parseInt(new Date(showing.date).getTime()) + movieLength * 60 * 1000;
    let currentTime = parseInt(new Date().getTime());

    let timeDiff = showingTime - currentTime;
    timeDiff = timeDiff / 1000 / 60; // convert to minutes

    // console.log("isCurrent", timeDiff / 1000 / 60);

    if(timeDiff > 0 && timeDiff < movieLength) {
      // console.log("isCurrent timeleft", timeDiff, timeDiff < movieLength)
      return true;
    }
    return false;
  }

  return (
    <div className="App">
      <NotificationContainer />

      <BrowserRouter>
        <Navbar />
        <Routes>
          { todayLoaded && movies.loaded &&
            <Route path="/" element={
              <Home
                currentShowings={currentShowings}
                moviesList={movies.moviesList}
                showingsList={showings.showingsList}
              />}
            />
          }
          { movies.loaded &&
            <Route path="/movies" element={<MoviesPage moviesList={movies.moviesList} addMovie={addMovie} deleteMovie = {deleteMovie}/>} />
          }
          <Route path="/movies/:id" element={<MovieDetails moviesList={movies.moviesList} showingsList={showings.showingsList}/>} />
          <Route path="/movies/:id/edit" element={<EditMovie editMovie={editMovie} moviesList={movies.moviesList} />} />

          { rooms.loaded &&
            <Route path="/rooms" element={<RoomsPage roomsList={rooms.roomsList}/>} />
          }

          { showings.loaded && rooms.loaded && movies.loaded &&
            <Route path="/showings" element={
              <ShowingsPage
                showingsList={showings.showingsList}
                roomsList={rooms.roomsList}
                moviesList={movies.moviesList}
                addShowing={addShowing}
                deleteShowing = {deleteShowing}/>
            } />
          }
          <Route path="/showings/:id" element={
            <ShowingTickets
              showingsList={showings.showingsList}
              moviesList={movies.moviesList}
              buyShowingTicket={buyShowingTicket}
            />
          }/>
          <Route path="/showings/:id/edit" element={
            <EditShowing
              editShowing={editShowing}
              showingsList={showings.showingsList}
              moviesList = {movies.moviesList}
              roomsList = {rooms.roomsList}
            />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
