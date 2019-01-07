import React, {Component} from 'react';
import "./gameBoard.css";
import laFugaDiTzel from "../../images/laFugaDiTzel.png";

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = { dragOffsetX: 0, dragOffsetY: 0, marginTop: -300, marginLeft: -400 };
  }

  componentDidMount () {
    this.setState({marginTop: -300, marginLeft: -400})
  }

  handleTouchStart(e) {
    const x = e.nativeEvent.touches ? e.nativeEvent.touches[0].clientX : e.clientX;
    const y = e.nativeEvent.touches ? e.nativeEvent.touches[0].clientY : e.clientY;
    this.setState({dragOffsetX: x, dragOffsetY: y});
  }

  handleTouchMove(e) {
    const x = e.nativeEvent.touches ? e.nativeEvent.touches[0].clientX : e.clientX;
    const y = e.nativeEvent.touches ? e.nativeEvent.touches[0].clientY : e.clientY;
    const moveX = x - this.state.dragOffsetX;
    const moveY = y - this.state.dragOffsetY;
   
    if(x > 0 || y > 0) { // this is to avoid problems appenling with mouse up still triggering onDrag
      this.setState({marginLeft: Math.round(this.state.marginLeft + moveX), 
        marginTop: Math.round(this.state.marginTop + moveY),
        dragOffsetX: x, 
        dragOffsetY: y});
    }
  }

  render() {
    return(
      <div className="mapContainer">
        <div className="ontop">    margin:   {this.state.calculatedMargins}</div>

        <div onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)}
             onDragStart={this.handleTouchStart.bind(this)} onDrag={this.handleTouchMove.bind(this)}>
        <img  className="map" style={{marginLeft: this.state.marginLeft + "px", 
                marginTop: this.state.marginTop + "px"}} src={laFugaDiTzel}></img>
        </div>
      </div>
    )
  }
}

export default GameBoard