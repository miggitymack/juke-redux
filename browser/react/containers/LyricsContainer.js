import React from 'react';
import Lyrics from '../components/Lyrics';
import store from '../store';
import { fetchLyrics } from '../action-creators/lyrics';

export default class LyricsContainer extends React.Component {
  constructor() {
    super();
    this.state = Object.assign({}, store.getState(), {
      artistQuery: '',
      songQuery: ''
    });

    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setArtist(artist) {
    this.setState({ artistQuery: artist });
  }

  setSong(song) {
    this.setState({ songQuery: song });
  }

  handleSubmit() {
    if (this.state.artistQuery && this.state.songQuery)
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery))
  }

  render() {
    return (
      <div>
        <Lyrics
          text={this.state.lyrics.text}
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
