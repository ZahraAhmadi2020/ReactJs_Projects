import React from 'react'
import{HiShoppingCart} from 'react-icons/hi'

const FastFoodItem = ({name,price,ingredients,imageUrl,delay}) => {
  return (
    <div className='card bg-light product-card h-100 border-0 shadow-sm pb-1 mb-1 fade-in-horiz'
    style={{animationDelay:delay + ''}}>
      <span className='price badge  w-50 badge-end badge-shadow bg-success fs-md fw-medium'>
      قیمت: {price.toString()} تومان
      </span>
      <div className='card--placeholder'>
        <img className='card-img-top' src={imageUrl} alt='fastfood'/>
      </div>

      <div className='card-body text-center pt-3 pb-4 d-flex flex-column'>
        <h5 mb-2>{name}</h5>
        <div className='fs-ms text-muted mb-3'>{ingredients}</div>
        <button className='btn btn-outline-success btn-sm w-100 mt-auto fw-bold'>
          <HiShoppingCart className='fs-5 ms-3'/>
          افزودن به سبد خرید
        </button>
      </div>

    </div>
  )
}

export default FastFoodItem
