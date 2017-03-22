import React from 'react'
import ReactDOM from "react-dom"
import Paper from 'material-ui/Paper'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {throttle} from 'throttle-debounce'

injectTapEventPlugin();





const Row = ({...props})=>{

   const {numCols, oldShift, style, shift, slide, mouseSlide, onMouseDown} = props;


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
        window.addEventListener('mouseup',this.mouseUp.bind(this))
        window.addEventListener('mousemove',this.mouseMove.bind(this))
    }
    mouseDown(ev){
        ev.persist();
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
        if(this.state.sliding){
            let shift = ev.clientX-this.state.clicked_x;
            this.setState({
                shift
            })
        }
    }
    manager(ev){
        ev.persist();
        this.mouseMove(ev);
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
