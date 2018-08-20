import React from 'react'
import { withCollaborationLiveValue } from '../../src'

function CounterValue ({value}) {
  return (<p>{value}</p>)
}

export default class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.LiveCounterValue = withCollaborationLiveValue(props.collaboration)(CounterValue)
  }

  render () {
    const { shared: counter } = this.props
    return (
      <div>
        <h1>Counter</h1>
        <this.LiveCounterValue />
        <button onClick={counter.inc}>+</button>
      </div>
    )
  }
}