import {getAllCars, getAllCarsByBrand, getAllCarsByBrandAndModel} from '../../utils/utils'

const initialState = {
    cars: {},
    filterCars: [],
    totalFilterCars: 0,
    currentSelectCars: `Все автомобили`
}

const cars = (state = initialState, action) => {
    if(action.type === "SET_CARS"){
        return {
            ...state,
            cars: action.payload ? action.payload : {},
        }
    }

    // фильтрует данные по заданным параметров в зависимости от выбранного бренда/модельного ряда
    if(action.type === "FILTER_CARS"){

        let newArray = []
        let currentSelection = ``

        const filters = action.payload
        if(filters.brand === "all"){
            newArray = getAllCars(state.cars)
            currentSelection = `Все автомобили`
        }else if(filters.brand !== "all" && filters.model === "all"){
            newArray = getAllCarsByBrand(state.cars, filters.brand)
            currentSelection = `Модельный ряд ${filters.brand}`
        }else if(filters.brand !== "all" && filters.model !== "all"){
            newArray = getAllCarsByBrandAndModel(state.cars, filters.brand, filters.model)
            currentSelection = `${filters.brand} ${filters.model}`
        }
        newArray = newArray.filter((obj)=> (obj.price > parseInt(filters.minPrice) && obj.price < parseInt(filters.maxPrice)))

        if(newArray.length > 0 ){
            if(filters.transmission){
                newArray = newArray.filter((obj)=> obj.transmission.type === filters.transmission)
            }
            if(filters.engine){
                newArray = newArray.filter((obj)=> obj.engine.type === filters.engine)
            }
            if(filters.drive){
                newArray = newArray.filter((obj)=> obj.drive === filters.drive)
            }
            if(filters.body){
                newArray = newArray.filter((obj)=> obj.body === filters.body)
            }
        }

        return {
            ...state,
            filterCars: newArray,
            totalFilterCars: newArray.length,
            currentSelectCars: currentSelection
        }
    }
    
    return state
}


export default cars