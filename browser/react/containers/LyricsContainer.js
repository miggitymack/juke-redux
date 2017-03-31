import React from 'react';
import Lyrics from '../components/Lyrics';
import store from '../store';
import {setLyrics} from '../action-creators/lyrics';
import axios from 'axios';

export default class LyricsContainer extends React.Component {
  constructor(){
    super();
    this.state = Object.assign({}, store.getState(),
    { artistQuery: '',
      songQuery: ''
    });

    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() =>
    { this.setState(store.getState())
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  setArtist (artist) {
    this.setState({artistQuery: artist});
  }

  setSong (song) {
    this.setState({songQuery: song});
  }

  handleSubmit () {
    axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
      .then((result) => {
        store.dispatch(setLyrics(result.data.lyric))
      });
  }

  render(){
    return (
      <div>
        <Lyrics text={this.state.text}
                setArtist={this.setArtist}
                setSong={this.setSong}
                handleSubmit={this.handleSubmit}
                artistQuery={this.state.artistQuery}
                songQuery={this.state.songQuery}
        />
      </div>
    );
  }
}
