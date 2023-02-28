import React from "react"
import { useSelector } from "react-redux"

import FormConfig from "../components/FormConfig"
import ContentBlock from "../components/ContentBlock"
import SortPopap from "../components/SortPopap"

function Home() {
   const { filterCars, currentSelectCars } = useSelector(({ cars }) => cars)

   // ререндр contentBlock произойдет только при изменении состояния
   const [contentBlock, setContentBlock] = React.useState(false)

   // Состояние отвечает за скрытие(показ) формы фильтрации
   const [visibilityForm, setVisibilityForm] = React.useState(true)

   const [sort, setSort] = React.useState(`popular`)

   React.useEffect(() => {
      setContentBlock((prev) => !prev)
   }, [sort])

   return (
      <div className="container">
         <div className="section-sort">
            <SortPopap activeSort={sort} changeSort={setSort} />
            <button
               className="but-hidden-form"
               onClick={() => {
                  setVisibilityForm((prev) => !prev)
               }}
            >
               {visibilityForm ? `Скрыть фильтр` : `Показать фильтр`}
            </button>
         </div>

         <FormConfig
            rerenderContentBlock={setContentBlock}
            isVisiability={visibilityForm}
         />

         <ContentBlock
            update={contentBlock}
            cars={filterCars}
            currentSelectCars={currentSelectCars}
            sortParams={sort}
         />
      </div>
   )
}

export default Home
