// ====================== Получает объект всех брендов и возвращает массив всех машин
export function getAllCars(objDataCars) {
   //Развернули объект брендов в общий объект моделей
   const arrayValues = Object.values(objDataCars)
   let arrayModel = {}
   arrayValues.forEach((obj) => {
      arrayModel = { ...arrayModel, ...obj }
   })

   //Развернули объект моделей в общий массив всех машин
   const arrayKeys = Object.keys(arrayModel)
   let newArray = []
   arrayKeys.forEach((key) => {
      newArray = [...newArray, ...arrayModel[key]]
   })

   return newArray
}

// ====================== Получает объект определенного бренда и возвращает все машины этого бренда
export function getAllCarsByBrand(defaultData, brand) {
   let objectBrand = defaultData[brand]
   let arrayValues = Object.values(objectBrand)
   let newArray = []
   arrayValues.forEach((arr) => {
      newArray = [...newArray, ...arr]
   })

   return newArray
}

// ====================== возвращает весь модельный ряд определенного бренда
export function getAllCarsByBrandAndModel(defaultData, brand, model) {
   return defaultData[brand][model]
}

// ====================== Возвращает опциональный массив для select Model
export const createListSelectModels = (defaultData, brand) => {
   let optionsObj = { name: "Любая модель", value: "all" }

if(defaultData){
   let newArray = Object.keys(defaultData[brand])
   let modifiedArray = newArray.map((name) => ({ name: name, value: name }))
   modifiedArray = [optionsObj, ...modifiedArray]
   return modifiedArray
}else{
   return [optionsObj]
}
}

 // ====================== Возвращает опциональный массив для select Brand
 export const createListSelectBrands = (defaultdata) => {
   let optionsObj = {name: "Все марки", value: "all"}
   if(defaultdata){
      let arrayBrands = Object.keys(defaultdata)
      let newArray = arrayBrands.map((name)=>({name: name, value: name}))
      newArray = [optionsObj, ...newArray]
      return newArray
   }else{
      return [optionsObj]
   }
}

 // ====================== Получает массив и обрезает его, смотря на текущий буллет пагинации
 export const paginate = (array, page, displayedItems) => {
   const startIndex = (page-1)*displayedItems
   return [...array].splice(startIndex, displayedItems)
}
