# peer-star-react

React components for [Peer-* apps](https://github.com/ipfs-shipyard/peer-star-app).

[![made by Protocol Labs](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)

## Install

```bash
$ npm install peer-star-react
```

## API

### `withCollaboration(collaboration)`

Higher-order component for creating components that are bound to a specific collaboration.

Example:

```js
import PeerStarApp from 'peer-star-app'
import { withCollaboration } from 'peer-star-react'

function MyComponent ({ collaboration, shared }) {
  // gets collaboration and collaboration.shared as arguments
}

const app = PeerStarApp('my app name')

const collaboration = app.collaborate('collaboration name', 'collaboration type', options)

const MyCollaborativeComponent = withCollaboration(collaboration)(MyComponent)
```


### `withCollaborationFromApp(app, name, type, options)`

Higher-order component for creating components that are bound to a specific collaboration that will be created from the app.

If `options.keys` is a string, the keys will be parsed and passed into the collaboration.

Example:

```js
import PeerStarApp from 'peer-star-app'
import { withCollaborationFromApp } from 'peer-star-react'

function MyComponent ({ collaboration, shared }) {
  // gets collaboration and collaboration.shared as arguments
}

const app = PeerStarApp('my app name')

const keys = // some string

const options = { keys }
const MyCollaborativeComponent = withCollaborationFromApp(app, 'collab name', 'collab type', options)(MyComponent)
```


### `withCollaborationLiveValue(collaboration)`

Higher-order component for creating components that will receive the current collaboration shared value as a property every time it changes.


Example:

```js
import PeerStarApp from 'peer-star-app'
import { withCollaborationLiveValue } from 'peer-star-react'

function MyComponent ({ collaboration, shared, value }) {
  console.log('current value is', value)
  // gets collaboration, collaboration.shared and collaboration.shared.value() as arguments
}

const app = PeerStarApp('my app name')

const collaboration = app.collaborate('collaboration name', 'collaboration type', options)

const MyCollaborativeComponent = withCollaborationLiveValue(collaboration)(MyComponent)
```


### `withCollaborationMembership(collaboration)`

Higher-order component for creating components that will receive the current collaboration membership as a property every time it changes.


Example:

```js
import PeerStarApp from 'peer-star-app'
import { withCollaborationMembership } from 'peer-star-react'

function MyComponent ({ peers }) {
  // peers is a set

  console.log('current peers are', Array.from(peers))
}

const app = PeerStarApp('my app name')
const collaboration = app.collaborate('collaboration name', 'collaboration type', options)

const MyCollaborativeComponent = withCollaborationLiveValue(collaboration)(MyComponent)
```

## Examples

* [examples dir](examples/src)
* [peer-star-app example app](https://github.com/ipfs-shipyard/peer-star-app/tree/master/examples/react-app)

## Start example

```bash
$ git clone <this repo>
$ cd peer-star-react
$ npm install
$ npm start
```

## License

MIT