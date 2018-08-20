import React from 'react'
import withCollaboration from './withCollaboration'

const defaultOptions = {
  waiting: React.createElement('p', null, 'Waiting for collaboration to start...')
}

export default (collaborationPromise, _options) => {
  return (WrappedComponent) => {
    let onChange
    let latestValue

    return withCollaboration(collaborationPromise, _options)(class extends React.Component {
      constructor (props) {
        super(props)
        const { collaboration } = this.props
        onChange = () => {
          latestValue = collaboration.shared.value()
          this.forceUpdate()
        }
        collaboration.on('state changed', onChange)
      }

      render () {
        return React.createElement(WrappedComponent, Object.assign({}, this.props, { value: latestValue }))
      }

      componentDidMount () {
        onChange()
      }

      componentWillUnmount () {
        const { collaboration } = this.props
        if (onChange && collaboration) {
          collaboration.removeListener('state changed', onChange)
          onChange = null
        }
      }
    })
  }
}