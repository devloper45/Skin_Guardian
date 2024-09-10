import redux,{ connect } from 'react-redux'
import {createStore } from 'redux'

const reducerfunction =()=> {
    return 
}

const store =redux.createStore(reducerfunction)

const subscribFunction=()=>{
    const latestState = store.getState()


}

store.subscribe(subscribFunction)

