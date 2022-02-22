import category0 from "./0"
import category1 from "./1"
import category2 from "./2"
import category3 from "./3"
import category4 from "./4"
import category5 from "./5"
import category6 from "./6"
import category7 from "./7"
import dishes from "../dishes"


const categories = [
    ...category0, 
    ...category1, 
    ...category2, 
    ...category3, 
    ...category4, 
    ...category5, 
    ...category6, 
    ...category7, 
]
export default categories

const categoriesWithDishes = categories.map((category) => {
    return {...category, dishes: dishes.filter(dish => dish.category === category.id) }
})
export { categoriesWithDishes }



