import React from 'react'
import withCollaboration from './withCollaboration'

const defaultOptions = {
  waiting: React.createElement('p', null, 'Waiting for collaboration to start...')
}

export default (collaborationPromise, _options) => {
  return (WrappedComponent) => {
    let onChange
    let latestMembers = new Set()

    return withCollaboration(collaborationPromise, _options)(class extends React.Component {
      constructor (props) {
        super(props)
        const { collaboration } = this.props
        onChange = (peers) => {
          console.log('onChange', peers)
          latestMembers = collaboration.peers()
          this.forceUpdate()
        }
        collaboration.on('membership changed', onChange)
      }

      render () {
        return React.createElement(WrappedComponent, Object.assign({}, this.props, { peers: latestMembers }))
      }

      componentDidMount () {
        onChange()
      }

      componentWillUnmount () {
        const { collaboration } = this.props
        if (onChange && collaboration) {
          collaboration.removeListener('membership changed', onChange)
          onChange = null
        }
      }
    })
  }
}