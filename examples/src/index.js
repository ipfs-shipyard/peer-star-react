import React from 'react';
import { render} from 'react-dom';
import PeerStarApp from 'peer-star-app'
import { withCollaboration } from '../../src'
import Counter from './Counter'

import MyComponent from '../../src';
const App = class extends React.Component {
  constructor (props) {
    super(props)
    console.log('constructing app')
    const peerStarApp = PeerStarApp('my-example-app')
    peerStarApp.start()
    const collaboration = peerStarApp.collaborate('my-example-counter', 'gcounter')
    this.CollaborativeCounter = withCollaboration(collaboration)(Counter)
  }

  render () {
    console.log('rendering app')
    return (
      <this.CollaborativeCounter />
    )
  }
}

render(<App />, document.getElementById('root'));