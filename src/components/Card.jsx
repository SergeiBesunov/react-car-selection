import React from "react"
import PropTypes from "prop-types"

import emptyImg from "../assets/emptyimg.jpg"



function Card({ imgPath, brand, model, yearofIssue, transmission, engine, color, inStock, price }) {

   const engineOnTheKirrilitsa = (value) => {
      if (value === "petrol") {
         return "Бензиновый"
      } else if (value === "diesel") {
         return "Дизель"
      } else if (value === "electro") {
         return "Электрический"
      }
   }

   return (
      <div className="card-wrapper">
         <div className="card">
            <a href="#">
               <img
                  className="card__img"
                  src={imgPath ? imgPath : emptyImg}
                  alt="img"
               />
            </a>
            <a className="card__title" href="#">
               {`${brand} ${model}`}
            </a>

            <div className="card__info">
               <div className="card__date">Год выпуска: {yearofIssue}</div>
               <div className="card__description">
                  {`${transmission.function}, ${engine.volume} л, ${
                     engine.power
                  } л.с., ${engineOnTheKirrilitsa(engine.type)}, ${color}`}
               </div>
               <div className="card__availabil">
                  <span className="card__availabil-text">В наличии:</span>
                  <span className="card__availabil-total"> {inStock} авто</span>
               </div>
            </div>
            <div className="card__price">
               <span className="card__price-text">от</span>
               <span className="card__price-num">
                  {Number(price).toLocaleString()}
               </span>
               <span className="card__price-text">р.</span>
            </div>
            <a href="#" className="card__but">
               Подробнее
            </a>
         </div>
      </div>
   )
}

//--------------------------------------------------------------------------------------------------
Card.propTypes = {
   imgPath: PropTypes.string.isRequired,
   brand: PropTypes.string.isRequired,
   model: PropTypes.string.isRequired,
   transmission: PropTypes.object.isRequired,
   engine: PropTypes.object.isRequired,
   color: PropTypes.string.isRequired,

   inStock: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
   price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    yearofIssue:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
}

export default Card
