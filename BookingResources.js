import React from 'react'
import Paper from 'material-ui/Paper';

export default ({...props})=>{
    const {resources, itemStyle} = props;
    const paper_style={
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: itemStyle.height,
        marginBottom: 2*itemStyle.margin,
        marginLeft: itemStyle.margin,
        marginTop: itemStyle.margin,
        backgroundColor: '#1A237E',
        color: '#E8EAF6',
        fontSize: '1.1em'
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
