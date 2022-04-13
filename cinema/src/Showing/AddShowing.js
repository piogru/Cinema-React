import React, { Component } from 'react';
import ShowingClass from './ShowingClass';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class AddShowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      date: '',
      movieId: -1,
      roomId: -1,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.addShowing();
  }

  addShowing = () => {
    let date = new Date(this.state.date);
    var coeff = 1000 * 60 * 15;
    var rounded_date = new Date(Math.round(date.getTime() / coeff) * coeff)
    rounded_date.setHours(rounded_date.getHours() - rounded_date.getTimezoneOffset() / 60)

    let showing = new ShowingClass(rounded_date.toGMTString(), parseInt(this.state.movieId), parseInt(this.state.roomId));

    console.log("AddShowing", showing)
    this.props.addShowing(showing);
    this.setState({
      status: true,
    });
  }

  change(event) {
    let target = event.target.id;
    console.log("add showing event val", event.target.value)
    this.setState({
        [target]: event.target.value
    });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <div className="mb-3">
          <Form.Label>Data i godzina (GMT)</Form.Label>
          <Form.Control
            type="datetime-local"
            id="date"
            value={this.state.date}
            onChange={(e) => this.change(e)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Film</Form.Label>
          <Form.Select
            id="movieId"
            onChange={(e) => this.change(e)}>
            <option value="-1">Wybierz film</option>
            {
              this.props.moviesList.map((movie, index, key) => {
                return (
                  <option value={movie.id} key={movie.id}>
                    {movie.title}
                  </option>
                );
              })
            }
          </Form.Select>
        </div>
        <div className="mb-3">
          <Form.Label>Sala</Form.Label>
          <Form.Select
            id="roomId"
            onChange={(e) => this.change(e)}>
            <option value="-1">Wybierz salę</option>
            {
              this.props.roomsList.map((room, index, key) => {
                return (
                  <option value={room.id} key={room.id}>
                    Sala nr: {room.id} Miejsc: {room.capacity}
                  </option>
                );
              })
            }
          </Form.Select>
        </div>
        <Button type="submit">Add</Button>
      </Form>
    );
  }
}

AddShowing.propTypes = {
  addShowing: PropTypes.func,
  roomsList: PropTypes.array,
  moviesList: PropTypes.array,
}

export default AddShowing;
