import React from 'react';
import Place from './Place';

const PlaceList = React.forwardRef((props, ref)=>{
    console.log("THe props are", props);
    return(
        <div>
            {props.list.map((place, index)=>{
                return(
                    (index === props.RightSideImageIndex)?
                    <div className = 'list-container' key = {`place ${index}`}>
                         <Place  ref = {ref} index = {index} venue = {place} imageClicked = {props.imageClicked}/>

                    </div>
                        :    
                        <div className = 'list-container' key = {`place ${index}`} >
                                                         <Place index = {index} venue = {place} imageClicked = {props.imageClicked}/>

                            </div>           
                     )
            })}
            </div>
    )
})

export default PlaceList;