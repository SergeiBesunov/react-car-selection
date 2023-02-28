import React from "react"
import notFoundImg from "../assets/notfound.png"



function NotFoundBlock() {
   return (
    <div className="modellist">
    <div className="modellist__title-wrapper">
       <div className="modellist__img">
          <img src={notFoundImg} alt="Not Found Cars"/>
       </div>
       <div className="modellist__description">
             <h2 className="modellist__title">Не удалось подобрать автомобили с заданными параметрами</h2>
             <p className="modellist__text">Измените параметры конфигурации и попробуйте снова</p>
       </div>
    </div>
    </div>

   )
}


export default NotFoundBlock