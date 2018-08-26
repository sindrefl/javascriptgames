import React, {Component} from 'react';

import NumberList from './NumberList'
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array : this.generateRandom(),
            selected : [],
            correct: this.generateStart(),
        }
        this.selectNumber = this.selectNumber.bind(this);
    }

    generateRandom() {
        return [1,1,1,1,1,1].map(number => number * Math.ceil(Math.random() * Math.floor(20)));
    }

    generateStart() {
        return this.shuffle([0,1,2,3,4,5]).filter((number,index) => index < 3);
    }

    selectNumber(number){
        let index = number.props.index;
        //removes from index:
        if(this.state.selected.includes(index)){
            var arraycopy = [...this.state.selected];
            let i = arraycopy.indexOf(index);
            arraycopy.splice(i,1);
            this.setState({
                selected: arraycopy,
            }, function () {            
                console.log("if run")
                console.log(this.state.selected);
            });
            
        }else if(this.state.selected.length === 3){
            console.log("length 3");
            console.log(this.state.selected)
            return;
        }else{
            this.setState(this.setState(prevState => ({
                selected: [...prevState.selected, index]
            })), function () {            
                console.log("else run")
                console.log(this.state.selected);
            });
        }
    }

    shuffle(array) {
        var j, x, i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    }

    render() {
        let sumSelected = this.state.array.filter((val, index) => this.state.selected.includes(index)).reduce((n1,n2) => n1+n2, 0);
        let totalSum = this.state.array.filter((val, index) => this.state.correct.includes(index)).reduce((n1,n2) => n1 + n2,0);
            
        return (<div className="game">
                {sumSelected === totalSum ? <div className="win">Correct</div> : ""}
                <div className="target">{sumSelected}/{totalSum}</div>
                <div className="list-container">
                    <div className="challenge-numbers">
                        <NumberList listnumber={1} selected={this.state.selected} select={this.selectNumber} value={this.state.array.slice(0,3)}/>
                    </div>


                    <div className="challenge-numbers">
                        <NumberList listnumber={2} selected={this.state.selected} select={this.selectNumber} value={this.state.array.slice(3,6)}/>
                    </div>
                </div>
                <div className="footer">
                    <div className="timer-value">10</div>
                    <button>Start</button>
                </div>
            </div>
        );
    }
}

export default App;
