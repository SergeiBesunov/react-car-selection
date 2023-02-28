import dataCars from '../../API/cars'

// имитация получения данных, тестовый вариант, по идее будет асинхронная логика
export const getCars = (dispatch) => {
    dispatch(setCars(dataCars))
}

export const setCars = (cars) => ({
    type: 'SET_CARS',
    payload: cars
})

// закидывает параметры фильтра и reduser начинает по ним фильтрацию машин
export const filterCar = (filtOption) => ({
    type: 'FILTER_CARS',
    payload: filtOption
})







