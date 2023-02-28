import React from "react"
import PropTypes from "prop-types"



function SelectField({name, onChange, options, state}) {
   const selectRef = React.useRef()
   const [selectOpen, setSelectOpen] = React.useState(false)

   const nameBrand = options.find((obj) => obj.value === state).name
  
   const toggleSelect = () => {
      setSelectOpen((prev) => !prev)
   }

   const onSelect = (event) => {
      setSelectOpen(false)
      onChange(event, name)
   }

// При первом рендере вешает событие отлавливания клика ( для закрытия popap )
const handleOutsideClick = (e) => {
   e.target.closest(`.select`) !== selectRef.current && setSelectOpen(false)
}
   React.useEffect(()=>{
      document.body.addEventListener("click", handleOutsideClick)
   },[])
// -------------------------------------

   return (
      <div className="select" ref={selectRef}>
         <div
            className={`select__text ${!selectOpen && `select--closed`}`}
            onClick={toggleSelect}
         >
            <p>{nameBrand}</p>
            <div className="select__svg-wrap">
               <svg
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={selectOpen ? { transform: "rotate(180deg)" } : null}
               >
                  <path
                     d="M13 1.51284L11.4833 -0.000671453L6.5 4.9723L1.51667 -0.000671889L-6.61578e-08 1.51284L6.5 7.99933L13 1.51284Z"
                     fill="#2A7D9E"
                  />
               </svg>
            </div>
         </div>
         {selectOpen && (
            <ul className="select__list">
               {options.map((obj) => (
                  <li
                     key={obj.value}
                     className="select__list-item"
                     data-value={obj.value}
                     onClick={onSelect}
                  >
                     {obj.name}
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}


//--------------------------------------------------------------------------------------------------
SelectField.propTypes = {
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   options: PropTypes.arrayOf(PropTypes.object).isRequired,
   state: PropTypes.string.isRequired,
}

export default SelectField
