import { combineReducers } from 'redux' // для объединения reducers

import carsRedusers from './cars'

const rootReducer = combineReducers({
    cars: carsRedusers,
})

export default rootReducer