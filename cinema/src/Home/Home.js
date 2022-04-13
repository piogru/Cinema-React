import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Showing from '../Showing/Showing';
import React, { useEffect, useState} from 'react';
import { Table, Form, FormControl, FormLabel, Container } from 'react-bootstrap';
import moment from 'moment'

function Home({currentShowings, moviesList, showingsList}) {
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [dayShowings, setDayShowings] = useState([])

  function isToday(showing, index, array) {
    let showingDate = moment(showing.date).format('YYYY-MM-DD')
    console.log("home",date);

    if(showingDate === date) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    console.log(date)
    let temp = showingsList.filter(isToday)
    setDayShowings(temp);
  }, [])

  useEffect(() => {
    console.log(date)
    let temp = showingsList.filter(isToday)
    setDayShowings(temp);
  }, [date, showingsList])

  function updateDate(e) {
    setDate(moment(e.target.value).format('YYYY-MM-DD'))
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="todayHeader">Seanse w dniu</h1>
        <div className="todayShowings">
          <div className="row justify-content-center">
            <div className="col-4 mb-3">
              <Form.Control className="justify-content-center" type="date" id="start" name="movieDate-start" defaultValue={date} min="2015-01-01" max="2022-12-19" onChange={updateDate} />
            </div>
          </div>

          {
            dayShowings.length !== 0 ? (
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Film</th>
                    <th>Sala</th>
                    <th>Bilety sprzedane</th>
                    <th>Bilety dostępne</th>
                    <th>Zajęte miejsca</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dayShowings.map(showing => {
                      return(
                          <Showing key={showing.id}
                            id={showing.id}
                            date={showing.date}
                            movieTitle={moviesList.find(element => element.id == showing.movieId).title}
                            roomId={showing.roomId}
                            ticketsSold={showing.ticketsSold}
                            ticketsAvailable={showing.ticketsAvailable}
                            takenSeats={showing.takenSeats}
                          />
                      );
                    })
                  }
                </tbody>
              </Table>

              ) : (
                  <p>Brak seansów</p>
              )
          }
        </div>

        <h1 className="currentHeader">Trwające seanse</h1>
        <div className="currentShowings">
          {
            currentShowings.length !== 0 ? (
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Film</th>
                    <th>Sala</th>
                    <th>Bilety sprzedane</th>
                    <th>Bilety dostępne</th>
                    <th>Zajęte miejsca</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentShowings.map(showing => {
                      return(
                        <Showing key={showing.id}
                          id={showing.id}
                          date={showing.date}
                          movieTitle={moviesList.find(element => element.id == showing.movieId).title}
                          roomId={showing.roomId}
                          ticketsSold={showing.ticketsSold}
                          ticketsAvailable={showing.ticketsAvailable}
                          takenSeats={showing.takenSeats}
                        />
                      );
                    })
                  }
                </tbody>
              </Table>

              ) : (
                  <p>Brak seansów</p>
              )
          }
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  currentShowings: PropTypes.array,
  moviesList: PropTypes.array,
  showingsList: PropTypes.array,
}

export default Home
