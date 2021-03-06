import React from 'react'
import Add from 'material-ui/svg-icons/content/add';

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
           backgroundColor: selected_cell ? '#3F51B5':(index%2 ? '#C5CAE9':'#E8EAF6'),
           paddingTop:`${cellStyle.height/3}px`
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
                    top: `${rowIndex*(cellStyle.height+2*cellStyle.margin)}px`
                }
            }>
            {listCells}
        </div>
    )
}
