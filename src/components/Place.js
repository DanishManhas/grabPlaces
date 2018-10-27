import React from 'react';

const smallImageUrl = 'http://d6ejh6ps4xec6.cloudfront.net/400X400/venue/';
const largeImageUrl = 'http://d6ejh6ps4xec6.cloudfront.net/780X780/venue/';



const Place = React.forwardRef((props, ref) => {
    let venue = JSON.parse(JSON.stringify(props.venue));
    let largeImage = '';

    const ImageClicked = (image) => {
        props.imageClicked(image, props.index);
    }

    const returnSmallImages = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == venue.venue_photo) {
                return arr.splice(i, 1);
            }
        }
    }

    const largeImageStyle = {
        height:'100%',
        width :'69%',
        margin : '0 0.5% 0 0.5%',
        borderRadius : '5%'

    }
    const smallImageStyle = {
        height: '49%',
        width : '29%',
        margin :'0 0.5% 0 0.5%',
        padding : '0',
        borderRadius : '5%'
    }
    let smallImages = venue.venue_photo_arr;

    let splicedImage = returnSmallImages(smallImages);
    if (splicedImage) {
        largeImage = venue.venue_photo

    }
    else {
        largeImage = smallImages[0];
        smallImages.splice(0, 1);
    }


    const grabbdState = ()=>{
        let grabbdState = venue.venue_friend_grabbd_state;
        if(grabbdState === 'Try'){
            return(
                <div>
                  <i className = 'material-icons md-yellow'> bookmark</i>  User wants to try this place
                    </div>
            )
        }
        else if(grabbdState === 'Hate'){
            return(
                <div>
                 <i className = 'material-icons md-red'> thumb_down_alt</i>    User dislikes this place
                    </div>
            )
            
        }
        else if(grabbdState === 'Like'){
            return(
                <div>
                  <i className = 'material-icons md-blue'> thumb_up_alt</i>   User likes this place
                    </div>
            )
        }
        else if(grabbdState === 'Love'){
            return(
                <div>
                   <i className = 'material-icons md-pink'> favorite</i>  User loves this place
                    </div>
            )
        }
    }


    return (
        <div className = 'place-item'>
            <div className='venueImages' ref={ref}>
                {smallImages.map((smallImage, idx) => (
                    
                        <img style={smallImageStyle} key={`${idx}-smallImage`} onClick={() => ImageClicked(smallImage)}
                            src={smallImageUrl + smallImage} />
                   

                ))}
               
                    <img style={largeImageStyle} onClick={() => ImageClicked(largeImage)} src={largeImageUrl + largeImage} />

                
            </div>
            <div className = 'restaurant-name'>
            <h1> {venue.venue_name}
            </h1>
             </div>
            <div className = 'restaurant-type'> {venue.venue_category}</div>
            <div>
                <p> {venue.venue_address}
                <br />
                {venue.venue_city}, {venue.venue_country}
                </p>
            </div>
            <div className = 'restaurant-tagline'>
            {grabbdState()}
            </div>
            {
                venue.venue_featured_comment?
                <div>
                <div> {venue.venue_featured_comment_user} said:</div>
                <div className = 'comment'>
                    <q>
                {venue.venue_featured_comment}
                </q> </div>
                </div>:''
            }
                
                    
        </div>
    )
})
export default Place;