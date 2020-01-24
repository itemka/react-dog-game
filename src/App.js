import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {finish, levelDown, levelPlus, plusClickAction, randomShow} from "./components/Redux/ReducerGame";
import CircleContainer from "./components/Circle/Circle";
import css from "./components/Circle/Circle.module.css";

class App extends React.Component {
    getRandomImageIndex = () => {
        return Math.floor(Math.random() * 9);
    };

    state = {
        start: false,
        backCount: 3,
        finish: false,
        wait: 0,
    };

    gameStart = () => {
        this.setState({start: true, wait: 6});

        this.setTimeoutStart(1)
            .then(() => this.setTimeoutStart(1))
            .then(() => this.setTimeoutStart(1))
            .then(() => this.setTimeoutStart(1))
            .then(() => {
                this.mySetTimout(1.3, this.state.wait)
                    .then(() => this.mySetTimout(1.1, this.state.wait))
                    .then(() => this.mySetTimout(0.9, this.state.wait))
                    .then(() => {
                        this.gameEnd();
                    });
            });
    };

    gameEnd = () => {
        this.setState({backCount: 3, finish: true, wait: 0});
        this.props.finish();
        this.props.levelDown();
        setTimeout(() => {
            this.setState({finish: false});
            this.setState({start: false});
            console.log(`finish`);
        }, 1000);
    };
    gameStop = () => {
        this.setState({backCount: 3, finish: false, wait: 0});
        this.props.finish();
        this.props.levelDown();
    };

    setTimeoutStart = (secondsStart) => {
        return new Promise((resolve => {
                setTimeout(() => {
                    this.setState({backCount: this.state.backCount - 1});
                    resolve();
                }, secondsStart * 1000)
            })
        )
    };

    mySetTimout = (secondsOfIntervale, secondsOfWait) => {
        return new Promise((resolve) => {
            this.props.levelPlus();
            // this.setState({level: this.state.level + 1});
            let interval = setInterval(() => {
                this.props.randomShow(this.getRandomImageIndex());
            }, secondsOfIntervale * 1000);

            setTimeout(() => {
                clearInterval(interval);
                resolve();
            }, secondsOfWait * 1000)
        })
    };

    render = () => {
        let circles = this.props.dogArray.map(item => <CircleContainer key={item.id} id={item.id}
                                                                       checkClick={item.checkClick}/>);
        return (
            <div>

                {this.state.finish
                    ? <div className="App">Finish</div>
                    : !this.state.start
                        ? <div className="App">
                            <div>
                                The game has 3 levels of 6 seconds!
                            </div>
                            <div>
                                Hit the target:
                            </div>
                            <div>
                                + 1 point
                            </div>
                            <div className={`${css.itemApp} ${css.itemAppGreen}`}>
                                <div className={css.click}/>
                            </div>
                            <div>
                                Past:
                            </div>
                            <div className={`${css.itemApp}`}>
                                <div className={css.newDog}/>
                            </div>
                            <button className={"button"} onClick={this.gameStart}>Start</button>
                        </div>
                        : <div className="App">
                            <div className={"counter"}>
                                <div>{this.props.level !== 0 ? `Level: ${this.props.level}` : `Start: ${this.state.backCount}`}</div>
                                <div>{`Score: ${this.props.counterClick}`}</div>
                            </div>
                            <div>
                                {circles}
                            </div>
                            <button className={"button"} onClick={this.gameStop}>Stop</button>
                        </div>
                }
                {/*<audio src={dogAudio} controls={true}></audio>*/}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dogArray: state.ReducerGame.dogArray,
        counterClick: state.ReducerGame.counterClick,
        level: state.ReducerGame.level
    }
};
const ConnectedApp = connect(mapStateToProps, {plusClickAction, randomShow, finish, levelPlus, levelDown})(App);
export default ConnectedApp;
