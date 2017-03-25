import React from 'react'
import Paper from 'material-ui/Paper';

export default ({...props})=>{
    const {resources, style, height ,margin} = props;
    const paper_style={
        display: 'inline-block',
        width: style.width,
        height,
        marginBottom: margin,
        textAlign:'center',
    }

    const listItems = resources.map((element,index)=>(
        <Paper
            style={paper_style}
            key={index}
        >
            {element}
        </Paper>
    ))
    return(
        <div style={style}>
            {listItems}
        </div>
    )
}
