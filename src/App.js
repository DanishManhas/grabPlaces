import React, { Component } from 'react';
import './App.css';
import PlaceList from './components/PlaceList';
import RightSideImage from './components/RightSideImage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GrabbdList: [],
      RenderedList: [],
      RightSideImage: 'XL7LYKU264PGIIH9JNXDMOG8Y02REJ5Y5FKXN37C04NPU8XIXW5ZZGTZR2YX6SBVOCQTRUX5A4EGOH27VZ3XOQWGQQD5SI0FA05F54O7TMBGYJLE7UI7TZQHT2AFQKC5.jpg',
      loaded : false      
    }
    this.rightSideRef = React.createRef();
    this.imageClicked = this.imageClicked.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    this.fetchList();
  }

  handleOnScroll = ()=>{
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.loadMoreItems();
    }
  }

  imageClicked(imageString, index){
    this.setState({
      RightSideImage : imageString,
      RightSideImageIndex : index
    })
  }

  loadMoreItems = ()=>{
    let GrabbdList = [...this.state.GrabbdList];
    let loadedArray = [...this.state.RenderedList];
    this.setState({
     RenderedList : GrabbdList.slice(0,loadedArray.length+10)
    })
  }

  fetchList = () => {
    fetch("http://api.grabbd.com/api/v1/customlist", {
      headers: {
        "Cache-Control": "no-cache",
        "Postman-Token": "grabbd-react-dev"
      }
    }).then(res=>res.json())
      .then(response =>{
        console.log("The api data is =====", response.DATA);
        let fetchedList = response.DATA;
        let renderedList = fetchedList.slice(0,10);
        this.setState({
          GrabbdList : fetchedList,
          RenderedList: renderedList,
          loaded :true
        })
      })
  }

  RightSideImageClicked = ()=>{
    if(this.rightSideRef.current)
    this.rightSideRef.current.scrollIntoView({behaviour : "smooth"});
  }
  

  render() {
    let renderedList = this.state.RenderedList;
    return (
      <div className = "everything">
      <div className = 'top-nav'>
      <div className = 'logo'>
        <h1> Some Icon </h1>
        </div>
      <div className = 'menu-buttons'>
        <button className = 'button-create'>Create your Own List </button>
        <button className = 'button-share'> Share </button>
        </div>
      </div>
      {
      this.state.loaded?
      <div className = 'container'>
       
       
       <div className = 'venueList'>
         <PlaceList 
        ref = {this.rightSideRef}
         RightSideImageIndex = {this.state.RightSideImageIndex} list = {renderedList} imageClicked = {this.imageClicked}/> </div> 
       

        <div className = 'rightImage' >
       <RightSideImage  image = {this.state.RightSideImage} clicked = {this.RightSideImageClicked}/>
         </div> 
      </div>:null
      }
      </div>
    )
  }
}

export default App;
