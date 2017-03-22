import React from 'react'
import ReactDOM from "react-dom"
import Paper from 'material-ui/Paper'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {throttle} from 'throttle-debounce'

injectTapEventPlugin();





const Row = ({...props})=>{

   const {styleRow, numCols, onTouchDown, oldShift, style, shift, slide,  onMouseDown} = props;


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
        top:75,
        left:10
    }
    return (
        <div
            style={
                {
                    display:'flex',
                    width:'100%',
                    ...styleRow
                }
            }>
            <RaisedButton
                onTouchTap={(ev)=>{slide(ev,-1)}}
                style={button_style}
                label='Left'
                primary={true}
            />
            {list}
            <RaisedButton
                onTouchTap={(ev)=>{slide(ev,1)}}
                style={{...button_style,left:-50+numCols*200}}
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
            oldShift: 0,
            grid: [...Array(props.numCols)].map((el,index)=>(
                index*(210)
            ))
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
        let min_ind = -1;
        let min = this.state.grid.reduce((acc,val,index,grid)=>{
            if(acc > Math.abs(val-(old+this.state.oldShift))){
                acc = Math.abs(val-(old+this.state.oldShift))
                min_ind = index;
            }
            return acc;
        },5000)



        this.setState(
            {
                sliding:false,
                clicked_x: null,
                oldShift: this.state.grid[min_ind],
                shift: 0
            }
        )
    }

    button_slide(ev,direction){
        ev.preventDefault();
        this.setState({
            oldShift: this.state.oldShift + direction*210
        })
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
        let min_ind = -1;
        let min = this.state.grid.reduce((acc,val,index,grid)=>{
            if(acc > Math.abs(val-(old+this.state.oldShift))){
                acc = Math.abs(val-(old+this.state.oldShift))
                min_ind = index;
            }
            return acc;
        },5000)



        this.setState(
            {
                sliding:false,
                clicked_x: null,
                oldShift: this.state.grid[min_ind],
                shift: 0
            }
        )
    }
    render(){
        const {style,shift,sliding} = this.state;
        const {numCols,zDepth,numRows} = this.props;
        const list = [...Array(numRows)].map((el,index)=>{
            const styleRow={
                position:'absolute',
                top: index*210
            }
                return(<Row
                    key={index}
                    styleRow={styleRow}
                    slide={this.button_slide.bind(this)}
                    style={this.state.style}
                    shift={shift}
                    numCols={numCols}
                    zDepth={zDepth}
                    onMouseDown = {this.mouseDown.bind(this)}
                    oldShift ={this.state.oldShift}
                    onTouchDown = {this.touchDown.bind(this)}
                />)
        })

        return(
            <MuiThemeProvider>
                <div style={{
                        position:'relative',
                        display:'flex',
                        height:'500px',
                        width:`${210*4+10}px`,
                        overflowX:'hidden',
                        overflowY:'scroll'
                    }}>
                    {list}
                </div>
            </MuiThemeProvider>
        )
    }


}



const app = document.getElementById('app')


ReactDOM.render(
   <ReactBooking
      numCols={4}
      numRows={5}
      zDepth={3}
   />,
app);
