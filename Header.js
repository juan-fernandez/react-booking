import React from 'react'
import Paper from 'material-ui/Paper'

import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

export default ({...props})=>{
    const {headerStyle, buttonComponent, buttonStyle, slide} = props;


    return(
        <Paper
            style={headerStyle}
        >
        {buttonComponent(
        {
            onTouchTap:(ev)=> slide(ev,-1),
            buttonStyle:{...buttonStyle, left:0},
            icon:<Left/>,
            primary:true
        })}
        {buttonComponent(
        {
            onTouchTap:(ev)=> slide(ev,1),
            buttonStyle:{...buttonStyle, left:`${headerStyle.width-1.5*buttonStyle.width}px`},
            icon:<Right/>,
            primary:true
        })}
        </Paper>
    )

}
