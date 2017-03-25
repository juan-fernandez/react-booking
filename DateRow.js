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
     onDoubleClick,
     selected
   } = props;


   const listCells= [...Array(numDays)].map((element,index)=>{
      let selected_cell = selected.some((element)=>{
         return (element == `r${rowIndex}c${index}`)
      })
       let positioned_cell_style = {
           ...cellStyle,
           cursor:'pointer',
           backgroundColor: selected_cell ? '#9E9E9E':'white'
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
            onDoubleClick={onDoubleClick}
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
