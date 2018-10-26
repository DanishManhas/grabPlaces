import React from 'react';
const largeImageUrl = 'http://d6ejh6ps4xec6.cloudfront.net/780X780/venue/';

const RightSideImage = (props)=>{
    console.log("RightSideImage rendered");
    const imgStyle = {
        height : '100%',
        width: '100%'
    }
   return( 
    <img style = {imgStyle} onClick = {props.clicked} src = {largeImageUrl + props.image}/>
 )
}
export default RightSideImage;