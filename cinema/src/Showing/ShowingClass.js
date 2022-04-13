import * as RoomsApi from '../Api/RoomsApi';

class ShowingClass {
  constructor(date, movieId, roomId){
      this.date = date;
      this.movieId = movieId;
      this.roomId = roomId;
      this.ticketsSold = 0;
      this.takenSeats = [];
  }
}

export default ShowingClass;
