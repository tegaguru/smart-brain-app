import React from 'react';
import Navigation from './components/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js'; 
import Logo from './components/logo';
import FaceRecognition from './components/FaceRecognition'
import SignIn from './components/SignIn'
import Register from './components/Register'
import './App.css';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
    apiKey: '890d054489d343c08b2fb94148183f96'
});

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density:{
        enable: true,
        value_area:80
      }
    }
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name, 
      email: data.email, 
      entries: data.entries,
      joined: data.joined
    }})
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.output[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.rightCol * width) 
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }
  onInputChange = (event) => {
      this.setState({input: event.target.value})
  }
  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response =>{ 
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    .catch(err => console.log(err))
    });
  }
  onRouteChange = (home) => {
    this.setState(Object.assign(this.state, {route: home,
    imageUrl:''}))
  }
  render(){
    const {route, imageUrl, box, user} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation route= {route} onRouteChange = {this.onRouteChange}/>
        { this.state.route === 'home' ? 
        <div> 
          <Logo/>
          <Rank name={this.state.user.name} entries={user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onSubmit = {this.onSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        :
        (
          this.state.route !== 'register' ? 
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
        }  
      </div>
    );
  }
  
}

export default App;
