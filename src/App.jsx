import React , { Component} from 'react';
import './App.css';
import { FormGroup, FormControl , InputGroup , Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
            
        }
    }
    search(){
    console.log('this.state' , this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    const tokenType = "Bearer "
      
    const accessToken = 'BQA-qMohGo0Kd7UgNS1Vcx9TXXzFMu9V_3mXdN2sKPVS4V9kVVmXNVAHtNWgEK2RqID8IrwPKV3x56cLBe_MnMHxSaYEZe9ahM90yCMB90XS8Zfux6GnO442R5zuBemJA8f0jNDdmFwsMLgrG4m06bkkYza1PcU1rpk0-5yXW94AZ6_DnQ'
 
   //fetching artist's data
    
   axios.get(FETCH_URL ,{
        headers: {
        Authorization: tokenType+accessToken
    }   
    })
        
        
        .then(response => response.data)
        .then(response => {
            const artist = response.artists.items[0];
            console.log('artist' , artist);
            this.setState({artist});
       
       FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
       
       //fetching artist's top tracks
       axios.get(FETCH_URL, {
           headers: {
               Authorization: tokenType+accessToken
               
           }
       })
       .then(response => response.data)
       .then(response => {
           const { tracks }  = response;
           this.setState({tracks});
       })
            
            
            
        });
    }
    
    render() {
        return(
            <div className = "App">
               <div className="App-title">Sociopath Designs</div>
                <FormGroup>
                    <InputGroup>
                    <FormControl
                        type = "text"
                        placeholder = "search for an artist"
                        value = {this.state.query}
                        onChange={event => {this.setState({query: event.target.value})}}
                        onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }
                        }
                        
                        />
                        <InputGroup.Addon>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                        </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?
                  <div>
               <Profile 
                   artist = {this.state.artist}
                   
                   />
                <Gallery
                    tracks = {this.state.tracks}
                    />
                </div>
                        : <div></div>
                }
            </div>
        )
    }
}
export default App;