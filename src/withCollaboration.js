import { isCollaboration } from 'peer-star-app'
import React from 'react'

const defaultOptions = {
  waiting: React.createElement('p', null, 'Waiting for collaboration to start...')
}

export default (_collaboration, _options) => {
  const options = Object.assign({}, defaultOptions, _options)
  let collaboration
  const collaborationPromise = Promise.resolve(_collaboration)
  collaborationPromise.then((_collaboration) => {
    collaboration = _collaboration
  })

  return (WrappedComponent) => {
    let needsUpdate = true
    return class extends React.Component {
      render () {
        if (!collaboration) {
          collaborationPromise.then(() => {
            needsUpdate = true
            this.forceUpdate()
          })
          return options.waiting
        } else {
          needsUpdate = false
          console.log('collaboration:', collaboration)
          return React.createElement(WrappedComponent, Object.assign({
            collaboration,
            shared: collaboration.shared}, this.props))
        }
      }

      shouldComponentUpdate () {
        console.log('shouldComponentUpdate', needsUpdate)
        return needsUpdate
      }
    }
  }
}
