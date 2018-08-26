import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Number from './Number'

class NumberList extends Component{
    render(){
        return this.props.value.map((number,index, array) => <Number select={this.props.select} key={index} selected={this.props.listnumber === 1 ? this.props.selected.includes(index):this.props.selected.includes(index + array.length)} index={this.props.listnumber ===1 ? index : index + array.length} number={number}></Number>)
    }
}

export default NumberList;
