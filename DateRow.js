import React from 'react'

export default ({...props})=>{
   const {
     cellComponent,
     cellStyle,
     rowIndex,
     key,
     shift,
     numDays,
     zDepth,
     onMouseDown,
     oldShift,
     onTouchDown,

   } = props;


   const listCells= [...Array(numDays)].map((element,index)=>{
       let positioned_cell_style = {
           ...cellStyle,
           cursor:'pointer'
       }
       return(
              cellComponent({
                  id:`r${rowIndex}c${index}`,
                  key:index,
                  style:positioned_cell_style,
              })
        )
    })

    return (
        <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchDown}
            style={
                {
                    display:'inline-block',
                    position: 'absolute',
                    left:shift+oldShift,
                    top: `${rowIndex*(cellStyle.height+cellStyle.margin)}px`
                }
            }>
            {listCells}
        </div>
    )
}
