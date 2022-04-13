import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Form, FormControl, FormLabel } from 'react-bootstrap';

import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Ilość sprzedanych biletów',
    },
  },
  scales: {
    y: {
       ticks: {
          stepSize: 1
       }
    },
 },
};
const BLUE = 'rgba(54, 162, 235, 0.2)'
const PURPLE = '#79018C'

function MovieDetails ({moviesList, showingsList}){
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [date, setDate] = useState(moment(new Date).format('YYYY-MM-DD'))
  const [chartData, setChartData] = useState([])
  const [chartLabels, setChartLabels] = useState([])

  useEffect(() => {
    if (params?.id) {
      const tmpMovie = moviesList.find(m => {
        return m.id == params?.id
      })
      setMovie(tmpMovie);
    }
  }, [params?.id, moviesList])

  function countSoldTickets(selectedDate) {
    return showingsList.reduce((c, show) => {
      const showDate = moment(show.date).format('YYYY-MM-DD')
      return movie?.id === show.movieId && showDate === selectedDate ? c + show.ticketsSold : c
    }, 0)
  }

  useEffect(() => {
    const startDate = moment(date).subtract(3, 'day')
    const labels = []
    for (let i = 0; i < 7; i++) {
      labels.push(startDate.clone().add(i, 'day').format('YYYY-MM-DD'))
    }
    const ticketsCount = labels.map(label => {
      return countSoldTickets(label)
    })
    setChartData(ticketsCount)
    setChartLabels(labels)
  }, [date, movie])

  function updateDate(e) {
    setDate(e.target.value)
  }

  function renderChart(labels, data) {
    return <Bar options={chartOptions} data={{
      labels,
      datasets: [
        {
          label: 'Ilość sprzedanych biletów',
          data,
          backgroundColor: [BLUE, BLUE, BLUE, PURPLE, BLUE, BLUE, BLUE],
        },
      ],
    }}/>
  }

  return (
    <div>
      <h1>{movie?.title}</h1>
      <div>
        <div className="fw-bold">Id</div>
        <p>{movie?.id}</p>
      </div>
      <div>
        <div className="fw-bold">Czas trwania</div>
        <p>{movie?.length}</p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-5">
            <Form.Label htmlFor="start" className="fw-bold">Sprawdź popularność filmu: </Form.Label><br/>
            <Form.Control className="justify-content-center" type="date" id="start" name="movieDate-start" value={date} min="2015-01-01" max="2022-12-19" onChange={updateDate} />
            <p><i>* Popularność filmu na tle trzech poprzednich i trzech następnych dni od wybranej daty.</i></p>
          </div>
        </div>
      </div>
      {/* <div className="container justify-content-center"> */}
        <div className="row justify-content-center">
          <div className="col-6">
            {chartLabels.length && renderChart(chartLabels, chartData)}
          </div>
        </div>
      </div>
    // </div>
  );
}

MovieDetails.propTypes = {
   moviesList: PropTypes.array,
   showingsList: PropTypes.array,
};

export default MovieDetails;
