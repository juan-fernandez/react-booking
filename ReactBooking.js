import React from 'react'
import ReactDOM from "react-dom"


// internal components
import DateRow from "./DateRow"
import BookingHeader from "./BookingHeader"
import BookingResources from "./BookingResources"

// Date management
import moment from 'moment'
import twix from 'twix'

// Not to overload
import {throttle} from 'throttle-debounce'

// material ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

// bootstrap grid
import {Grid, Row, Col} from 'react-bootstrap'


injectTapEventPlugin();


class ReactBooking extends React.Component {
    constructor(props){
        super(props)

        const {dateRange,cellStyle,} = props
        let numCols = dateRange.count('days');
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
        console.log("slide",direction)
        this.setState({
            oldShift: this.state.oldShift + direction*(this.props.cellStyle.width+2*this.props.cellStyle.margin)
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
            cellStyle,
            buttonStyle,
            zDepth,
            cellComponent,
            buttonComponent,
            dateRange,
            resources
        } = this.props;

        const rowList = [...Array(dateRange.length)].map((el,rowIndex)=>{
            const rowPosition={
                position:'absolute',
                height:cellStyle.height+cellStyle.margin,
                //top: headerStyle.height+ rowIndex*(cellStyle.height+cellStyle.margin),
            }
            return(
               null
                /*<DateRow
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
                />*/
            )
        })

        return(
            <MuiThemeProvider>

                  <Row style={{whiteSpace:'nowrap'}}>
                     <Col style={{overflowX:'hidden',height:buttonStyle.height,padding:'0px'}} xs={10} sm={10} md={10} lg={10} xsOffset={2} smOffset={2} mdOffset={2} lgOffset={2}>
                        <BookingHeader
                            buttonComponent={buttonComponent}
                            buttonStyle={buttonStyle}
                            slide={this.button_slide.bind(this)}
                            dateRange={dateRange}
                            shift={this.state.oldShift}
                            lifeShift={this.state.shift}
                            cellStyle={cellStyle}
                        />
                     </Col>
                  </Row>
                  {/*<Row>


                     <Col xs={2} sm={2} md={2} lg={2}>
                        <BookingResources
                           resources={resources}
                           style={menuStyle}
                           height={cellStyle.height}
                           margin={cellStyle.margin}
                           />
                     </Col>
                     <Col xs={10} sm={10} md={10} lg={10}>
                        {rowList}
                     </Col>

                  </Row>*/}

            </MuiThemeProvider>
        )
    }


}


const cell_style={
    height: 80,
    width: 80,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
}
const button_style={
    width:50,
    height:50,
    display: 'inline-block',
}


const resources = [
    'Sala Norte',
    "Palacio de Congresos",
    "Teatro"
]

const container_style = {
   width: '80%',
   height: '600px',
   overflowX: 'hidden'
}

const app = document.getElementById('app')

let start_range = moment('01-01-2017',"DD-MM-YYYY",'es');
let end_range = moment('30-01-2017',"DD-MM-YYYY",'es');

ReactDOM.render(
   <Grid style={container_style}>
       <ReactBooking
           cellComponent={({...props})=><Paper {...props}/>}
           buttonComponent={({...props})=><RaisedButton {...props}/>}
           cellStyle={cell_style}
           buttonStyle={button_style}
           zDepth={3}
           dateRange={start_range.twix(end_range)}
           resources={resources}
       />
    </Grid>,
app);
