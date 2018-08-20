import React from 'react'
import peerStar from 'peer-star-app'
import withCollaboration from './withCollaboration'

const defaultOptions = {
  waitingForKeys: React.createElement('p', null, 'Waiting for keys to be parsed...')
}

export default (app, name, type, _options) => {
  const options = Object.assign({}, defaultOptions, _options)
  let keys = options.keys
  let waitingForKeys = false
  let collaboration
  if (keys && (typeof keys === 'string')) {
    waitingForKeys = peerStar.keys.uriDecode(keys).then((keys) => {
      waitingForKeys = false
      options.keys = keys
      collaboration = app.collaborate(name, type, options)
    })
  }
  if (!keys) {
    console.warn('No keys in options')
  }

  if (!waitingForKeys) {
    collaboration = app.collaborate(name, type, options)
    return withCollaboration(collaboration)
  }

  return (WrappedComponent) => {
    let needsUpdate = true

    return class extends React.Component {
      render () {
        if (waitingForKeys) {
          needsUpdate = false
          waitingForKeys.then((keys) => {
            needsUpdate = true
            this.forceUpdate()
          })
          return options.waitingForKeys
        } else {
          needsUpdate = false
          return React.createElement(withCollaboration(collaboration)(WrappedComponent), this.props)
        }
      }

      shouldComponentUpdate () {
        return needsUpdate
      }
    }
  }
  return withCollaboration(app.collaborate(name, type, options), options)
}
