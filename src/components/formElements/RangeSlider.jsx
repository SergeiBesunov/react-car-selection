import React, { useEffect } from "react"
import PropTypes from "prop-types"



function RangeSlider({initialMin, initialMax, min, max, step, priceGap, onChange}) {
   const progressLine = React.useRef(null)

   const [minValue, setMinValue] = React.useState(initialMin)
   const [maxValue, setMaxValue] = React.useState(initialMax)

   const handleMin = (e) => {
      if (maxValue - minValue >= priceGap + step && maxValue <= max) {
         if (parseInt(e.target.value) > parseInt(maxValue)) {
         } else {
            setMinValue(parseInt(e.target.value))
         }
      } else {
         if (parseInt(e.target.value) < minValue) {
            setMinValue(parseInt(e.target.value))
         }
      }
   }

   const handleMax = (e) => {
      if (maxValue - minValue >= priceGap + step && maxValue <= max) {
         if (parseInt(e.target.value) < parseInt(minValue)) {
         } else {
            setMaxValue(parseInt(e.target.value))
         }
      } else {
         if (parseInt(e.target.value) > maxValue) {
            setMaxValue(parseInt(e.target.value))
         }
      }
   }

   const formatNumber = (num) => {
      return num.toLocaleString()
   }

   useEffect(() => {
      progressLine.current.style.left = (minValue / max) * 100 + "%"
      progressLine.current.style.right = 100 - (maxValue / max) * 100 + "%"
   }, [minValue, maxValue])

   return (
      <div className="slider-pr">
         <div className="slider-pr__values">
            <p className="slider-pr__value">
               <span>от</span> {formatNumber(minValue)} р.
            </p>
            <p className="slider-pr__value">
               <span>до</span> {formatNumber(maxValue)} р.
            </p>
         </div>
         <div className="slider-pr__range">
            <div className="slider-pr__progress" ref={progressLine}></div>
         </div>
         <div className="slider-pr__inputs" onMouseUp={onChange}>
            <input
               type="range"
               name="minPrice"
               className="slider-pr__input"
               min={min}
               max={max}
               step={step}
               value={minValue}
               onChange={handleMin}
            />
            <input
               type="range"
               name="maxPrice"
               className="slider-pr__input"
               min={min}
               max={max}
               step={step}
               value={maxValue}
               onChange={handleMax}
            />
         </div>
         <div className="slider-pr__default-values">
            <p>{formatNumber(min)} p.</p>
            <p>{formatNumber(max)} p.</p>
         </div>
      </div>
   )
}

//--------------------------------------------------------------------------------------------------
RangeSlider.propTypes = {
   initialMin: PropTypes.number,
   initialMax: PropTypes.number,
   min: PropTypes.number,
   max: PropTypes.number,
   step: PropTypes.number,
   priceGap: PropTypes.number,
}

RangeSlider.defaultProps = {
   initialMin: 0,
   initialMax: 13000000,
   min: 0,
   max: 100000,
   step: 100,
   priceGap: 1000,
}

export default RangeSlider
