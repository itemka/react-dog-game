import React from 'react';
import './App.css';
import Circle from "./components/Circle/Circle";
import {connect} from "react-redux";
import {plusClickAction, randomShow} from "./components/Redux/ReducerGame";
// import dogAudio from './components/Files/dog.mp3';

class App extends React.Component {
    componentDidMount() {
        setInterval(() => {
            this.props.randomShow(this.getRandomImageIndex())
        }, 1000);
        // this.props.randomShow(this.getRandomImageIndex());

        // Добавить страт после 3 секунд
        // Добавить при попадании на картинку показывать другую картинку
        // соличество считать и если меньше чем заданное оличество - проиграл
        // звук промазал
        // и тд
    }

    componentDidUpdate() {
        // setTimeout(() => {
        //     this.props.randomShow(this.getRandomImageIndex())
        // }, 2000);
        // console.log(this.getRandomImageIndex());
    }

    getRandomImageIndex = () => {
        return Math.floor(Math.random() * 9);
    };

    render = () => {
        let circles = this.props.dogArray.map(item => <Circle key={item.id} id={item.id}
                                                              checkClick={item.checkClick}/>);
        return (
            <div className="App">
                <div>
                    {this.props.counterClick}
                </div>
                {/*<audio src={dogAudio} controls={true}></audio>*/}
                {circles}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dogArray: state.ReducerGame.dogArray,
        counterClick: state.ReducerGame.counterClick
    }
};
const ConnectedApp = connect(mapStateToProps, {plusClickAction, randomShow})(App);
export default ConnectedApp;
