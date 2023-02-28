import React from 'react'
import PropTypes from "prop-types"



function RadioField({ options, name, onChange }) {

   return (
      <div className="radio-block">
         {options.map((obj) => (
            <label className="radio-wraper" key={obj.type}>
               <input
                  className="real-radio"
                  name={name}
                  type="radio"
                  onChange={onChange}
                  value={obj.type}
               />
               <span className="custom-radio"></span>
               {obj.name}
            </label>
         ))}
      </div>
   )
}


//--------------------------------------------------------------------------------------------------
RadioField.propTypes = {
   options: PropTypes.arrayOf(PropTypes.object).isRequired,
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired
}

export default RadioField
