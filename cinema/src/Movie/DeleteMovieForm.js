import React from "react";
import Button from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const DeleteMovieForm = ({ deleteMovie, onClose, index }) => {
    return (
        <div className="alertForm">
            <span className="closeButton">
                <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
            </span>
            <div className="importantInfoInAlert">
                <Icon.Info size={60} color="#017BFF" />
                Czy na pewno chcesz usunąć ten film?
            </div>
            <div className="thingDeleteButtons">
                <Button variant="primary" onClick={() => onClose()}>Nie</Button>
                <Button variant="danger" style={{ marginLeft: "10px" }}
                    onClick={() => {
                        deleteMovie(index);
                        onClose();
                    }}>Tak</Button>
            </div>
        </div>
    );
}

DeleteMovieForm.propTypes = {
    deleteMovie: PropTypes.func,
    onClose: PropTypes.func,
    index: PropTypes.number,
}

export default DeleteMovieForm;
