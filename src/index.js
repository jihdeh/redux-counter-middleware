import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

const customMiddleWare = store => next => action => {
  console.log("Middleware Triggered:", action);
  next(action);
}

const incrementMiddleware = store => next => action => {
  if(action.type === 'INCREMENT') {
    alert(`Increment button was clicked, current state is ${store.getState()} \nI will now add to it`);
  }
  next(action);
}

const store = createStore(counter, applyMiddleware(customMiddleWare, incrementMiddleware));
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

render()
store.subscribe(render)
