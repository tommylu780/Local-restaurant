import React from 'react'
import TypeMenu from '../components/TypeMenu'
import Cart from '../components/Cart'
import DishList from '../components/Dish/DishList'

const Shop = () => {
    return (
        <div>
            <TypeMenu />
            <DishList />
            <Cart />
        </div>
    )
}

export default Shop
