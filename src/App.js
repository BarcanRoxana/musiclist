import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, Card, CardContent } from '@material-ui/core';
import axios from 'axios';

const API_URL = 'http://ws.audioscrobbler.com/2.0/?Limit=5&format=json&method=artist.search&api_key=' + process.env.REACT_APP_LASTFM_APPKEY;

const isEmpty = (str) => str.length === 0;

//&artist=plaiesii
//!!! ToDo: Tema: modificare aspect aplicatie 
// afisare useri

class App extends Component {
  state = {
    searchTerm: '',
    artists: [],
    users: [],
    savedArtists: []
  }

  componentDidMount() {
    const existing = localStorage.getItem('savedArtists')
    if(existing) {
      this.setState({ savedArtists: JSON.parse(existing) })
    }
  } 

  onTextChange = (event) => {
    const value = event.target.value;

    this.setState({ searchTerm: value });
  }

  search = (terms) => {
    const request = API_URL + '&artist=' + terms;

    console.log(request);

    axios.get(request).then((response) => {
      const results = response.data.results;
      const artists = results.artistmatches.artist.map((artist) => {
        const avatarImage = artist.image.find(image => image.size === 'medium');
        const imageUrl = avatarImage['#text'];
        return { ...artist, avatar: imageUrl }
      });

      this.setState({ artists });
    })

  }

  onSearchClick = () => {
    this.search(this.state.searchTerm);

  }

  clearSearch = () => {
    this.setState({
      searchTerm: '',
      artists: []
    })
  }

  onResultClick = (artist) => {
    this.clearSearch();
    const savedArtists = this.state.savedArtists;
    savedArtists.push(artist)
    this.setState({ savedArtists: savedArtists })
    localStorage.setItem('savedArtists', JSON.stringify(savedArtists) );

  }

  render() {
    return (
      <div className="App">
        <header className="App-header"> 
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Photos
              </Typography>
              <TextField className="search-input"
                placeholder="Search on Spotify"
                onChange={this.onTextChange}
                value={this.state.searchTerm}
              />
              <Button
                onClick={this.onSearchClick}
                variant="contained"
                color="secondary"
                disabled={isEmpty(this.state.searchTerm)}
              >
                Search
             </Button>
              {!isEmpty(this.state.searchTerm) && (
                <Button
                  onClick={this.clearSearch}
                  variant="contained"
                >
                  Clear search
              </Button>)
              }
            </Toolbar>
          </AppBar>
        </header>
        <List>
          {
            this.state.artists.map((artist) => {
              return (
                <ListItem 
                    button 
                    key={artist.name}
                    className="result"
                    onClick={() => this.onResultClick(artist)}
                   >
                  <ListItemAvatar>
                    <Avatar src={artist.avatar} alt={artist.name} />
                  </ListItemAvatar>
                  <ListItemText primary={artist.name} />
                  <Button variant="outlined" color="secondary" size="small" className="add-button">Add to favorites</Button>
                </ListItem>
              )
            })
          }
        </List>
        <div className="artist-container">
          {
            this.state.savedArtists.map((artist) => {
              return(
                <Card className = "artist-card">
                  <CardContent>
                    {artist.name}
                  </CardContent>
                </Card>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
