import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Movie = props => {
  return (
    <tr className="align-middle">
      <td>
          {props.title}
      </td>
      <td>{props.length}</td>
      <td>
        <div>
          <Icon.Eye size={30} color="black"/>
          <Link to={'/movies/' + props.id}>Szczegóły</Link>
        </div>
        <div>
          <Icon.Trash size={30} color="black" className="Item" />
          <Link to={'/movies/' + props.id + '/edit'}>Edytuj</Link>
        </div>
        <div onClick={() => props.showDeleteForm(props.id)}>

          <i>Usuń</i>
        </div>
      </td>
    </tr>
  );
}

Movie.propTypes = {
  id: PropTypes.number,
  title: function(props, propName){
    if(props[propName].length<1 || (props[propName].charAt(0) !== props[propName].charAt(0).toUpperCase() && isNaN(props[propName])) || (props[propName].charAt(0) === props[propName].charAt(0).toUpperCase() && !isNaN(props[propName]))) {
      return new Error(propName+" nie jest większe od 1 lub nie zaczyna się wielką literą/cyfrą")
    }
  },
  length: function(props, propName){
    if(props[propName]<30 || props[propName]>300 || (Math.floor(props[propName]) != props[propName])) {
      return new Error(propName+" nie jest większe od 30 lub nie jest mniejsze od 300 lub nie jest liczbą całkowitą")
    }
  },
  showDeleteForm: PropTypes.func,
};

export default Movie;
