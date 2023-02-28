import React from "react"
import PropTypes from "prop-types"



function Pagination({ totalItems, displayedItems, currentPage, onPageChange }) {
   const totalBullet = Math.ceil(totalItems / displayedItems)

   if (totalBullet === 1) {return null}

   let arrayBullet = []

   const createArrayBull = (totalBull, array) => {
      for (let i = 1; i <= totalBull; i++) {
         array.push(i)
      }
   }

   createArrayBull(totalBullet, arrayBullet)

   return (
      <nav className="pag">
         <ul className="pag__list">
            {arrayBullet.map((page) => (
               <li
                  className={`pag__list-item`}
                  key={page}
                  onClick={() => onPageChange(page)}
               >
                  <button
                     className={`pag__list-but ${
                        page === currentPage ? "pag-active" : ""
                     }`}
                  >
                     {page}
                  </button>
               </li>
            ))}
         </ul>
      </nav>
   )
}


//--------------------------------------------------------------------------------------------------
Pagination.propTypes = {
   totalItems: PropTypes.number.isRequired,
   displayedItems: PropTypes.number.isRequired,
   currentPage: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
}

export default Pagination
