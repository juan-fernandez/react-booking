import React from 'react'

export default ({...props})=>{

   const {
       buttonComponent,
       cellComponent,
       cellStyle,
       buttonStyle,
       rowIndex,
       rowPosition,
       numCols,
       onTouchDown,
       oldShift,
       shift,
       onMouseDown
   } = props;


   const list= [...Array(numCols)].map((element,index)=>{
       let positioned_cell_style = {
           ...cellStyle,
           left: oldShift + (cellStyle.width + cellStyle.margin)*(index) + shift,
           position: 'absolute',
           cursor:'pointer'
       }
       return(
              cellComponent({
                  id:`r${rowIndex}c${index}`,
                  key:index,
                  style:positioned_cell_style,
                  onMouseDown:onMouseDown,
                  onTouchStart:onTouchDown
              })
        )
    })
    const positioned_button_style={
        ...buttonStyle,
        top:(cellStyle.height-buttonStyle.width)/2,
    }
    return (
        <div
            style={
                {
                    display:'flex',
                    width:'100%',
                    ...rowPosition
                }
            }>
            {list}
        </div>
    )
}
