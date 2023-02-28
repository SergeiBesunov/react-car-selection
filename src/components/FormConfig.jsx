import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { getCars } from "../redux/actions/cars"
import { filterCar } from "../redux/actions/cars"

import { createListSelectModels, createListSelectBrands } from "../utils/utils"
import { radioOptions } from "../settings/radioOptions"

import RangeSlider from "./formElements/RangeSlider"
import SelectField from "./formElements/SelectField"
import RadioField from "./formElements/RadioField"
import Loader from "./formElements/Loader"



const formConfig = React.memo(
   function FormConfig({ rerenderContentBlock, isVisiability }) {
      const dispatch = useDispatch()

      // При первом рендере получаем и закидываем в redux все машины, это тестовый метод, по идее действие будет асинхронное в redux action
      React.useEffect(() => {
         dispatch(getCars)
      }, [])

      const { cars } = useSelector(({ cars }) => cars)
      const totalСarsFound = useSelector(({ cars }) => cars.totalFilterCars)

      // Управление параметрами формы
      const [loader, setLoader] = React.useState(false)
      const [filterOptions, setFilterOptions] = React.useState({
         brand: "all",
         model: "all",
         transmission: null,
         engine: null,
         drive: null,
         body: null,
         minPrice: 0,
         maxPrice: 13000000,
      })

      const handleChange = ({ target }, name) => {
         const key = target.name ? target.name : name
         const newValue = target.value ? target.value : target.dataset.value

         setFilterOptions((prev) => ({
            ...prev,
            [key]: newValue,
            model: checkModel(prev),
         }))
         let checkModel = (prevObj) => {
            if (key === "model") {
               return newValue
            } else if (key === "brand") {
               return "all"
            } else {
               return prevObj.model
            }
         }
      }

      const resetParameters = () => {
         let keysParams = Object.keys(radioOptions)
         let copyStateOptions = { ...filterOptions }
         keysParams.forEach((key) => {
            copyStateOptions[key] = null
         })
         setFilterOptions((prev) => copyStateOptions)
      }

      // Управление скрыть/показать секцию формы с radio-inputs
      const [openSection2, setOpenSection2] = React.useState(true)
      const toggleSection2 = () => {
         setOpenSection2((prev) => !prev)
         resetParameters()
      }

      // Закидываем параметры фильтрации и цены в redux (имитация задержки)
      React.useEffect(() => {
         setLoader(true)
         window.setTimeout(() => {
            dispatch(filterCar(filterOptions))
            setLoader(false)
         }, 700)
      }, [filterOptions])

      // Вытаскиваем модельный ряд актуального бренда
      const defineListSelectModels = (carsAll, brand) =>
         brand !== "all"
            ? createListSelectModels(carsAll, brand)
            : [{ name: "Все модели", value: "all" }]

      // Обработка нажатия кнопки показать авто
      const onButton = (e) => {
         e.preventDefault()
         dispatch(filterCar(filterOptions))
         rerenderContentBlock((prev) => !prev)
      }

      return (
         <div className={`form-wrapper ${!isVisiability ? `hidden` : ``}`}>
            <h1 className="block__title">Подбор автомобилей по параметрам</h1>
            <form className="form">
               <div className="form__block form__block-options1">
                  <div className="form__selected">
                     <div className="form__selected-wrap">
                        <SelectField
                           state={filterOptions.brand}
                           options={createListSelectBrands(cars)}
                           name={"brand"}
                           onChange={handleChange}
                        />
                     </div>
                     <div className="form__selected-wrap">
                        <SelectField
                           state={filterOptions.model}
                           options={defineListSelectModels( cars, filterOptions.brand )}
                           name={"model"}
                           onChange={handleChange}
                        />
                     </div>
                  </div>
                  <div className="form__slider">
                     <div className="form__slider-wrap">
                        <RangeSlider
                           onChange={handleChange}
                           step={50000}
                           priceGap={50000}
                           min={0}
                           max={11350000}
                           initialMin={0}
                           initialMax={11350000}
                        />
                     </div>
                  </div>
               </div>

               {openSection2 && (
                  <div className="form__block form__block-options2">
                     <div className="form__options2-col">
                        <div className="form__options2-col-title">Коробка</div>
                        <RadioField
                           onChange={handleChange}
                           options={radioOptions.transmission}
                           name={"transmission"}
                        />
                     </div>

                     <div className="form__options2-col">
                        <div className="form__options2-col-title">
                           Двигатель
                        </div>
                        <RadioField
                           onChange={handleChange}
                           options={radioOptions.engine}
                           name={"engine"}
                        />
                     </div>

                     <div className="form__options2-col">
                        <div className="form__options2-col-title">Привод</div>
                        <RadioField
                           onChange={handleChange}
                           options={radioOptions.drive}
                           name={"drive"}
                        />
                     </div>

                     <div className="form__options2-col">
                        <div className="form__options2-col-title">Кузов</div>
                        <RadioField
                           onChange={handleChange}
                           options={radioOptions.body}
                           name={"body"}
                        />
                     </div>
                  </div>
               )}

               <div className="form__block form__block-buttons">
                  <div className="form__block-buttons-col">
                     <span
                        className="form__button-options"
                        onClick={toggleSection2}
                     >
                        {openSection2
                           ? "Скрыть дополнительные параметры"
                           : "Дополнительные параметры"}
                     </span>
                  </div>
                  <div className="form__block-buttons-col">
                     <button className="form__button-show" onClick={onButton}>
                        Показать {totalСarsFound} автомобиля
                     </button>
                  </div>
               </div>
            </form>
            {loader && (
               <div className="loader-container">
                  <Loader />
               </div>
            )}
         </div>
      )
      // Компонент не будет делать rerender при каждом ререндере родительского компонента, а только в случае клика на "скрыть/показать фильтр"
   },
   (prevProps, nextProps) => {
      if (nextProps.isVisiability !== prevProps.isVisiability) {
         return false
      } else {
         return true
      }
   }
)

//--------------------------------------------------------------------------------------------------
formConfig.propTypes = {
   isVisiability: PropTypes.bool.isRequired,
   rerenderContentBlock: PropTypes.func.isRequired,
}

export default formConfig
