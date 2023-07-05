import React from 'react'

const Card = (props) => {
  return (
    <div className='my-card py-3'>{props.children}</div>
  )
}

export default Card
