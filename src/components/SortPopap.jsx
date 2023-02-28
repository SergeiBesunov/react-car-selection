import React from "react"
import PropTypes from "prop-types"

import { sortOptions } from "../settings/sortOptions"



function SortPopap({ activeSort, changeSort }) {
   const sortRef = React.useRef(null)
   const [popapOpen, setPopapOpen] = React.useState(false)

   const nameSort = sortOptions.find((item) => item.type === activeSort).name

   const togglePopap = () => {
      setPopapOpen((prev) => !prev)
   }

   const onItemSort = (value) => {
      changeSort(value)
      setPopapOpen(false)
   }

   // При первом рендере вешает событие отлавливания клика ( для закрытия popap )
   const handleOutsideClick = (e) => {
      e.target.closest(`.sort__popup`) !== sortRef.current &&
         setPopapOpen(false)
   }
   React.useEffect(() => {
      document.body.addEventListener("click", handleOutsideClick)
   }, [])

   return (
      <div className="sort">
         <b>Сортировать по:</b>
         <div className="sort__popup" ref={sortRef}>
            <div className="sort__label" onClick={togglePopap}>
               <p>{nameSort}</p>

               <svg
                  style={popapOpen ? { transform: "rotate(180deg)" } : null}
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M13 1.51284L11.4833 -0.000671453L6.5 4.9723L1.51667 -0.000671889L-6.61578e-08 1.51284L6.5 7.99933L13 1.51284Z"
                     fill="#2A7D9E"
                  />
               </svg>
            </div>

            {popapOpen && (
               <ul className="sort__list">
                  {sortOptions.map((obj) => (
                     <li key={obj.name} onClick={() => onItemSort(obj.type)}>
                        {obj.name}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   )
}


//--------------------------------------------------------------------------------------------------
SortPopap.propTypes = {
   activeSort: PropTypes.string.isRequired,
   changeSort: PropTypes.func.isRequired
}

export default SortPopap
