import React from 'react'
import ReactDOM from "react-dom"
import Paper from 'material-ui/Paper'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {throttle} from 'throttle-debounce'

injectTapEventPlugin();





const Row = ({...props})=>{

   const {numCols, onTouchDown, oldShift, style, shift, slide, mouseSlide, onMouseDown} = props;


   const list= [...Array(numCols)].map((element,index)=>{
       let my_style = {
           ...style,
           left: oldShift + (style.width + style.margin)*(index) + shift,
           position: 'absolute'
       }
       return(
              <Paper
                 key={index}
                 style={my_style}
                 onMouseDown={onMouseDown}
                 onTouchStart={onTouchDown}
              />
        )
    })
    const button_style={
        width:50,
        height:50,
        position: 'absolute',
        top:75

    }
    return (
        <div

            style={{position:'relative'}}>
            <RaisedButton
                onTouchTap={()=>{slide(-1)}}
                style={button_style}
                label='Left'
                primary={true}
            />
            {list}
            <RaisedButton
                onTouchTap={()=>{slide(1)}}
                style={{...button_style,left:numCols*200}}
                label='Right'
                primary={true}
            />
        </div>
    )
}

class ReactBooking extends React.Component {
    constructor(props){
        super(props)

        this.state={
            style:{
                height: 200,
                width: 200,
                margin: 10,
                textAlign: 'center',
                display: 'inline-block',
            },
            shift:0,
            clicked_x: null,
            sliding: false,
            oldShift: 0
        }
        this.mouseMove = throttle(100,this.mouseMove)
        this.touchMove = throttle(100,this.touchMove)
        window.addEventListener('mouseup',this.mouseUp.bind(this))
        window.addEventListener('mousemove',this.mouseMove.bind(this))
        window.addEventListener('touchmove',this.touchMove.bind(this))
        window.addEventListener('touchend',this.touchEnd.bind(this))
    }
    mouseDown(ev){
        ev.persist();
        ev.preventDefault();
        console.log('mousedown')
        this.setState(
            {
                sliding:true,
                clicked_x: ev.clientX
            }
        )
    }
    mouseUp(ev){
        console.log('mouseup')
        ev.preventDefault();
        let old = this.state.shift;
        this.setState(
            {
                sliding:false,
                clicked_x: null,
                oldShift: this.state.oldShift + old,
                shift: 0
            }
        )
    }
    update_style(){

    }
    mouseSlide(){

    }
    mouseMove(ev){
        ev.preventDefault();
        if(this.state.sliding){
            let shift = ev.clientX-this.state.clicked_x;
            this.setState({
                shift
            })
        }
    }
    manager(ev){
        ev.persist();
        ev.preventDefault();
        this.mouseMove(ev);
    }
    touchMove(ev){
        console.log('touchmove',ev.changedTouches[0].clientX)
        if(this.state.sliding){
            let shift = ev.changedTouches[0].clientX-this.state.clicked_x;
            this.setState({
                shift
            })
        }
    }
    touchDown(ev){
        console.log('touchdown',ev.changedTouches[0].clientX)
        this.setState(
            {
                sliding:true,
                clicked_x: ev.changedTouches[0].clientX
            }
        )
    }
    touchEnd(ev){
        console.log('mouseup')
        ev.preventDefault();
        let old = this.state.shift;
        this.setState(
            {
                sliding:false,
                clicked_x: null,
                oldShift: this.state.oldShift + old,
                shift: 0
            }
        )
    }
    render(){
        const {style,shift,sliding} = this.state;
        const {numCols,zDepth} = this.props;

        return(
            <MuiThemeProvider>
                <div>
                    <Row
                        slide={this.update_style.bind(this)}
                        style={this.state.style}
                        shift={shift}
                        numCols={numCols}
                        zDepth={zDepth}
                        mouseSlide = {this.mouseSlide.bind(this)}
                        onMouseDown = {this.mouseDown.bind(this)}
                        oldShift ={this.state.oldShift}
                        onTouchDown = {this.touchDown.bind(this)}
                    />
                </div>
            </MuiThemeProvider>
        )
    }


}



const app = document.getElementById('app')


ReactDOM.render(
   <ReactBooking
      numCols={4}
      zDepth={3}
   />,
app);
