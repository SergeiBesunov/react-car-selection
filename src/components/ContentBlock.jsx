import React from "react"
import PropTypes from "prop-types"

import { paginate } from "../utils/utils"
import { sortArray } from "../settings/sortOptions"

import Pagination from "./Pagination"
import NotFoundBlock from "./NotFoundBlock"
import Card from "./Card"



const сontentBlock = React.memo(
   function СontentBlock({ update, cars, currentSelectCars, sortParams }) {

      // ================ Pagination settings
      const totalCars = cars.length
      const displayedItems = 8
      const [selectedPage, setSelectedPage] = React.useState(1)
      const arrayCrop = paginate(sortArray(sortParams, cars), selectedPage, displayedItems)

      const handlePageChange = (pageIndex) => {
         setSelectedPage(pageIndex)
      }

      //Сбрысываем пагинацию на 1-ю страницу при ререндере компонента с новыми параметрами фильтрации
      React.useEffect(() => {
         setSelectedPage(1)
      }, [update])

      return (
         <>
            {totalCars > 0 ? (
               <div className="modellist">
                  <div className="modellist__title-wrapper">
                     <h2 className="modellist__title">{currentSelectCars}</h2>

                     <Pagination
                        totalItems={totalCars}
                        displayedItems={displayedItems}
                        currentPage={selectedPage}
                        onPageChange={handlePageChange}
                     />
                  </div>

                  <div className="modellist__cards">
                     {arrayCrop.map((obj, i) => (
                        <Card key={obj.unId} {...obj} />
                     ))}
                  </div>
               </div>
            ) : (
               <NotFoundBlock />
            )}
         </>
      )
      // Компонент делает ререндр только при клике на button "показать авто", или при изменении сортировки
   },
   (prevProps, nextProps) => {
      if (nextProps.update !== prevProps.update) {
         return false
      } else {
         return true
      }
   }
)


//--------------------------------------------------------------------------------------------------
сontentBlock.propTypes = {
   update: PropTypes.bool.isRequired,
   cars: PropTypes.arrayOf(PropTypes.object).isRequired,
   currentSelectCars:PropTypes.string.isRequired,
   sortParams: PropTypes.string.isRequired
}

export default сontentBlock
