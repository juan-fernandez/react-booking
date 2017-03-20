import React from 'react'
import ReactDOM from "react-dom"
import Paper from 'material-ui/Paper'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const ReactBooking = ()=>(
      <MuiThemeProvider>
         <Paper>
            Probando
         </Paper>
      </MuiThemeProvider>   
   )

const app = document.getElementById('app')


ReactDOM.render(
   <ReactBooking/>,
app);
