import React from 'react'
import ReactDOM from "react-dom"
import Paper from 'material-ui/Paper'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash'

injectTapEventPlugin();





const Row = ({...props})=>{

   const {numCols, style, shift, slide, mouseSlide} = props;


   const list= [...Array(numCols)].map((element,index)=>{
       let my_style = {
           ...style,
           left: (style.width + style.margin)*(index) + shift,
           position: 'absolute'
       }

       return(
              <Paper
                 key={index}
                 style={my_style}
                 onMouseDown={mouseSlide}
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
        <div style={{position:'relative'}}>
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
    constructor(){
        super()

        this.state={
            style:{
                height: 200,
                width: 200,
                margin: 10,
                textAlign: 'center',
                display: 'inline-block',
            },
            shift:0,
            last_x: 0,
            sliding: false,
            mousemove: null
        }

    }

    componentWillMount(){
        console.log("hi")
    }
    componentWillReceiveProps(){
        console.log("props")
    }
    update_style(direction){
        this.setState({
            shift: this.state.shift+direction*(this.state.style.width+this.state.style.margin)
        })
    }
    mousemove = (ev) => {
        let mouse_shift = ev.clientX - this.state.last_x;
        console.log("mousemove")
        this.setState({
            last_x: this.state.last_x+mouse_shift,
            shift: this.state.shift+mouse_shift
        })
    }
    mouseup = (ev)=>{
        console.log('mouseup')
        window.removeEventListener('mousemove',this.state.mousemove)
        window.removeEventListener('mouseup',this.mouseup)
    }

    mouseSlide = (ev)=>{
        console.log("mouseSlide")
        this.setState({last_x:ev.clientX})
        let func = _.throttle(this.mousemove,100)
        this.setState({mousemove: func})
        window.addEventListener('mousemove',func)
        window.addEventListener('mouseup',this.mouseup)
    }

    render(){
        const {style,shift} = this.state;
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
