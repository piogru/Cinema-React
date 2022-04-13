import React, { Component } from 'react';
import MovieClass from './MovieClass';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      title: '',
      length: '',
    };
  }

  addMovie = () => {
    let movie = new MovieClass(this.state.title, this.state.length);

    console.log("AddMovie", movie)
    this.props.addMovie(movie);
    this.setState({
      status: true,
    });
  }

  change(event) {
    let target = event.target.id;
    this.setState({
        [target]: event.target.value
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="mb-3">
          <Form.Label>
            Tytuł
          </Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={this.state.title}
            onChange={(e) => this.change(e)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>
            Czas trwania
          </Form.Label>
          <Form.Control
            type="number"
            id="length"
            value={this.state.length}
            onChange={(e) => this.change(e)}
          />
        </div>
        <Button onClick={this.addMovie.bind()}>Add</Button>
      </div>
    );
  }
}

AddMovie.propTypes = {
  addMovie: PropTypes.func,
}

export default AddMovie;
