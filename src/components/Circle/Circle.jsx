import React from 'react';
import css from './Circle.module.css';
import DogPhoto from './../Files/dog.jpg';
import {connect} from "react-redux";
import {plusClickAction} from "../Redux/ReducerGame";
import dogAudio from './../Files/dog.mp3';

const AudioOnClickDog = new Audio(dogAudio);

class Circle extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(check) {
        if (check) {
            this.props.plusClickAction();
            AudioOnClickDog.currentTime = 0;
            AudioOnClickDog.play();
        }
    };

    render() {
        let photoShow = this.props.checkClick === true ? `${css.show}` : `${css.photo}`;
        return (
            <div className={css.item} onClick={() => this.onClick(this.props.checkClick,)}>
                <img className={photoShow} src={DogPhoto} alt={this.props.id}/>
            </div>
        )
    }
}

export default connect(null, {plusClickAction})(Circle);