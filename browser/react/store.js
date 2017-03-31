import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const logger = createLogger()
const thunk = thunkMiddleware
const middleware = applyMiddleware(logger, thunk)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
})

const store = createStore(reducer, composeEnhancers(middleware));

export default store
