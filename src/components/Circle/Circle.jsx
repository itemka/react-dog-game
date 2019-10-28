import React from 'react';
import css from './Circle.module.css';
import {connect} from "react-redux";
import {plusClickAction} from "../Redux/ReducerGame";
import dogAudio from './../Files/dog.mp3';
import dogAudioError from './../Files/error.mp3';

const AudioOnClickDog = new Audio(dogAudio);
const AudioOnClickDogError = new Audio(dogAudioError);

class Circle extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(check) {
        if (check) {
            this.props.plusClickAction();
            AudioOnClickDog.currentTime = 0;
            AudioOnClickDog.play();
        } else {
            AudioOnClickDogError.currentTime = 0;
            AudioOnClickDogError.play();
        }
    };

    render() {
        let photoShow = this.props.checkClick === true ? (`${css.show}`) : `${css.hide}`;
        return (
            <div className={this.props.checkClick ? `${css.item} ${css.itemGreen}` : css.item}
                 onClick={() => this.onClick(this.props.checkClick)}>
                <div className={photoShow}/>
            </div>
        )
    }
}

export default connect(null, {plusClickAction})(Circle);