import React from 'react'
import ReactDOM from "react-dom"
import Paper from 'material-ui/Paper'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const style = {
   height: 200,
   width: 200,
   margin: 10,
   textAlign: 'center',
   display: 'inline-block',
};

const Row = ({...props})=>{

   const {numCols, style, ...other} = props;



   const list= [...Array(numCols)].map((element,index)=>(
      <Paper
         {...other}
         key={index}
         style={style}
         onClick={(ev)=>{console.log(ev.target)}}
      />
   ))
   return (
      <div>
         {list}
      </div>
   )
}

const ReactBooking = ({...props})=>(
      <MuiThemeProvider>
         <Row {...props}/>
      </MuiThemeProvider>
   )

const app = document.getElementById('app')


ReactDOM.render(
   <ReactBooking
      style={style}
      numCols={4}
      zDepth={3}
   />,
app);
