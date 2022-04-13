import React from "react";

const Room = props => {
  return (
    <tr className="align-middle">
      <td>{props.id}</td>
      <td>{props.capacity}</td>
    </tr>
  );
}

Room.propTypes = {
  id: function(props, propName){
    if(props[propName]<0 || (Math.floor(props[propName]) != props[propName])){
      return new Error(propName+" nie jest większe od zera lub nie jest wartością całkowitą")
    }
  },
  capacity: function(props, propName){
    if(props[propName]<10 || props[propName]>200 || Math.floor(props[propName]) != props[propName]){
      return new Error(propName+" nie jest większe od 10 lub nie jest mniejsze od 200 lub nie jest liczbą całkowitą")
    }
  },
};

export default Room;
