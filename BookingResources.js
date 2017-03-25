import React from 'react'
import Paper from 'material-ui/Paper';

export default ({...props})=>{
    const {resources, itemStyle} = props;
    const paper_style={
        width: '100%',
        height: itemStyle.height,
        margin: itemStyle.margin
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
        <div>
            {listItems}
        </div>
    )
}
