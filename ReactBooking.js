import React from 'react'
import ReactDOM from "react-dom"
import Paper from 'material-ui/Paper'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {throttle} from 'throttle-debounce'
import Row from "./Row"
import Header from "./Header"
import moment from 'moment'
import twix from 'twix'

injectTapEventPlugin();


class ReactBooking extends React.Component {
    constructor(props){
        super(props)
        const {numCols,cellStyle} = props
        this.state={
            shift:0,
            clicked_x: null,
            sliding: false,
            oldShift: 0,
            grid: [...Array(2*numCols-1)].map((el,index)=>(
                (index-(numCols-1))*(cellStyle.width+cellStyle.margin)
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
        this.setState(
            {
                sliding:true,
                clicked_x: ev.clientX
            }
        )
    }
    mouseUp(ev){
        ev.preventDefault();

        let old = this.state.shift;
        let min_ind = -1;
        let min = this.state.grid.reduce((acc,val,index,grid)=>{
            if(acc > Math.abs(val-(old+this.state.oldShift))){
                acc = Math.abs(val-(old+this.state.oldShift))
                min_ind = index;
            }
            return acc;
        },Infinity)

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
            oldShift: this.state.oldShift + direction*(this.props.cellStyle.width)
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

    touchMove(ev){
        if(this.state.sliding){
            let shift = ev.changedTouches[0].clientX-this.state.clicked_x;
            this.setState({
                shift
            })
        }
    }
    touchDown(ev){
        this.setState(
            {
                sliding:true,
                clicked_x: ev.changedTouches[0].clientX
            }
        )
    }
    touchEnd(ev){
        ev.preventDefault();
        let old = this.state.shift;
        let min_ind = -1;
        let min = this.state.grid.reduce((acc,val,index,grid)=>{
            if(acc > Math.abs(val-(old+this.state.oldShift))){
                acc = Math.abs(val-(old+this.state.oldShift))
                min_ind = index;
            }
            return acc;
        },Infinity)
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
        const {
            bookingStyle,
            cellStyle,
            buttonStyle,
            headerStyle,
            numCols,
            numRows,
            zDepth,
            cellComponent,
            buttonComponent,
            dateRange
        } = this.props;

        const rowList = [...Array(numRows)].map((el,rowIndex)=>{
            const rowPosition={
                position:'absolute',
                height:cellStyle.height+cellStyle.margin,
                top: headerStyle.height+ rowIndex*(cellStyle.height+cellStyle.margin)
            }
            return(
                <Row
                    buttonComponent={buttonComponent}
                    cellComponent={cellComponent}
                    cellStyle={cellStyle}
                    buttonStyle={buttonStyle}
                    rowIndex={rowIndex}
                    rowPosition={rowPosition}
                    key={rowIndex}

                    shift={shift}
                    numCols={numCols}
                    zDepth={zDepth}
                    onMouseDown = {this.mouseDown.bind(this)}
                    oldShift ={this.state.oldShift}
                    onTouchDown = {this.touchDown.bind(this)}
                />
            )
        })

        return(
            <MuiThemeProvider>
                <div style={bookingStyle}>
                    <Header
                        headerStyle={headerStyle}
                        buttonComponent={buttonComponent}
                        buttonStyle={buttonStyle}
                        slide={this.button_slide.bind(this)}
                        dateRange={dateRange}
                        shift={this.state.oldShift}
                        lifeShift={this.state.shift}
                        cellStyle={cellStyle}
                    />
                    {rowList}
                </div>
            </MuiThemeProvider>
        )
    }


}
const BOOKING_WIDTH=1000;
const BOOKING_HEIGHT=500;

const booking_style={
    position:'relative',
    display:'flex',
    height:BOOKING_HEIGHT,
    width:BOOKING_WIDTH,
    overflowX:'hidden',
    overflowY:'scroll'
}
const cell_style={
    height: 80,
    width: 80,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
}
const button_style={
    position: 'absolute',
    width:50,
    height:50
}
const header_style={
    width:BOOKING_WIDTH,
    height: 100,
}

const date_range={

}

const app = document.getElementById('app')

let start_range = moment('01-01-2017',"DD-MM-YYYY",'es');
let end_range = moment('30-01-2017',"DD-MM-YYYY",'es');

ReactDOM.render(
    <ReactBooking
        bookingStyle={booking_style}
        cellComponent={({...props})=><Paper {...props}/>}
        buttonComponent={({...props})=><RaisedButton {...props}/>}
        cellStyle={cell_style}
        buttonStyle={button_style}
        headerStyle={header_style}
        numCols={15}
        numRows={5}
        zDepth={3}
        dateRange={start_range.twix(end_range)}

    />,
app);
