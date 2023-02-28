const sortOptions = [
    { name: "По цене (дешевле-дороже)", type: "price-incr" },
    { name: "По цене (дороже-дешевле)", type: "price-desc" },
    { name: "По популярности", type: "popular" },
 ]

 const sortArray = (options, array) => {
    let sortArray = [...array]
 if(options === "price-incr"){
    sortArray.sort(((a, b)=> Number(a.price) > Number(b.price) ? 1 : -1))
 }
 else if(options === "price-desc"){
    sortArray.sort(((a, b)=> Number(a.price) < Number(b.price) ? 1 : -1))
 }
 else if(options === "popular"){
    sortArray.sort(((a, b)=> a.rating < b.rating ? 1 : -1))
 }
 return sortArray
 
 }

 export {sortOptions, sortArray}