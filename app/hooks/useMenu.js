import { useSelector } from "react-redux"
import { translationSelector } from "app/reducers"
// Data
import dishes from 'data/menu/dishes';
import categories, { categoriesWithDishes } from 'data/menu/categories';
import allergens from 'data/menu/allergens.js';


/**
 * useMenu
 * @returns {Object}
 */
export default function useMenu() {
    const { currentLanguage } = useSelector(translationSelector)
    return {
        getCategories: () => categories.map(category => ({
            ...category, 
            ...category[currentLanguage]
        })),
        getCategoriesWithDishes: () => categoriesWithDishes.map(category => ({
            ...category, 
            ...category[currentLanguage],
            dishes: category.dishes.map(dish => ({
                ...dish, 
                ...dish[currentLanguage]}
            ))
        })),
        getCategoriesById: () => {
            const categoriesById = {}
            categories.forEach(category => categoriesById[category.id] = {
                ...category,
                ...category[currentLanguage]
            })
            return categoriesById
        },
        getDishes: () => dishes.map(dish => ({
            ...dish, 
            ...dish[currentLanguage]
        })),
        getDishesById: () => {
            const dishesById = {}
            dishes.forEach(dish => dishesById[dish.id] = {
                ...dish, 
                ...dish[currentLanguage]
            })
            return dishesById
        },
        getAllergens: () => allergens.map(allergen => ({
            ...allergen, 
            ...allergen[currentLanguage]
        })),
        getAllergensById: () => {
            const allergensById = {}
            allergens.forEach(allergen => allergensById[allergen.id] = {
                ...allergen, 
                ...allergen[currentLanguage]}
            )
            return allergensById
        },
    }
}


/**
 * useCategories
 * @returns {Array}
 */
export function useCategories() {
    const { currentLanguage } = useSelector(translationSelector)
    return categories.map(category => ({
        ...category, 
        ...category[currentLanguage]
    }))
}

/**
 * useCategoriesWithDishes
 * @returns {Array}
 */
export function useCategoriesWithDishes() {
    const { currentLanguage } = useSelector(translationSelector)
    return categoriesWithDishes.map(category => ({
        ...category, 
        ...category[currentLanguage],
        dishes: category.dishes.map(dish => ({
            ...dish, 
            ...dish[currentLanguage]}
        ))
    }))
}

/**
 * useCategoriesById
 * @returns {Object}
 */
export function useCategoriesById() {
    const { currentLanguage } = useSelector(translationSelector)
    const categoriesById = {}
    categories.forEach(category => categoriesById[category.id] = {
        ...category,
        ...category[currentLanguage]
    })
    return categoriesById
}

/**
 * useDishesById
 * @returns {Object}
 */
export function useDishesById() {
    const { currentLanguage } = useSelector(translationSelector)
    const dishesById = {}
    dishes.forEach(dish => dishesById[dish.id] = {
        ...dish, 
        ...dish[currentLanguage]
    })
    return dishesById
}

/**
 * useAllergensById
 * @returns {Object}
 */
export function useAllergensById() {
    const { currentLanguage } = useSelector(translationSelector)
    const allergensById = {}
    allergens.forEach(allergen => allergensById[allergen.id] = {
        ...allergen, 
        ...allergen[currentLanguage]}
    )
    return allergensById
}




