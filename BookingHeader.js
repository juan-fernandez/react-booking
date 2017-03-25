import React from 'react'
import Paper from 'material-ui/Paper'

import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';


const Date = ({...props})=>{
    const {height,width,date} = props;
    const date_style={
        display:'inline-block',
        height,
        width,
        lineHeight:`${height}px`,
        float:'none !important'
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

    const {
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
                date={iterate.next()}
            />
        )
    })

   const header_style={

   }
   const my_button ={
      float:'right'
   }
    return(
        <div
            style={header_style}
        >
            {buttonComponent(
            {
                onTouchTap:(ev)=> slide(ev,1),
                style:{...buttonStyle},
                icon:<Left/>,
                primary:true
            })}
            <div style={{display:'inline-block',position:'absolute',left:shift}}>
               {dateList}
            </div>

            {buttonComponent(
            {
                onTouchTap:(ev)=> slide(ev,-1),
                style:{...buttonStyle,...my_button},
                icon:<Right/>,
                primary:true
            })}
        </div>
    )

}
