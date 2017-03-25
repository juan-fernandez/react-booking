import React from 'react'
import Paper from 'material-ui/Paper'

import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';


const Date = ({...props})=>{
    const {height,width,left,date} = props;
    const date_style={
        display:'inline-block',
        position: 'absolute',
        top:15,
        height,
        width,
        left
    }
    return(
        <Paper
            style={date_style}
            >
            {date.format('ddd')}
            {date.format('DD')}
        </Paper>
    )
}

export default ({...props})=>{
    const {headerStyle,
        buttonComponent,
        buttonStyle,
        slide,
        dateRange,
        shift,
        lifeShift,
        cellStyle
        } = props;

    let iterate = dateRange.iterateInner('days')
    let numDays = dateRange.count('days')

    const dateList = [...Array(numDays-1)].map((element,index)=>{
        return(
            <Date
                key={index}
                height={buttonStyle.height}
                width={cellStyle.width}
                left={cellStyle.margin+(cellStyle.width+cellStyle.margin)*index+shift+lifeShift}
                date={iterate.next()}
            />
        )
    })



    return(
        <Paper
            style={headerStyle}
        >
            {buttonComponent(
            {
                onTouchTap:(ev)=> slide(ev,1),
                buttonStyle:{...buttonStyle, left:0},
                icon:<Left/>,
                primary:true
            })}
            {dateList}
            {buttonComponent(
            {
                onTouchTap:(ev)=> slide(ev,-1),
                buttonStyle:{...buttonStyle, left:`${headerStyle.width-1.5*buttonStyle.width}px`},
                icon:<Right/>,
                primary:true
            })}
        </Paper>
    )

}
