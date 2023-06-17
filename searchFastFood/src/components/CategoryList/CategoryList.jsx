import React, { useEffect, useState } from 'react'

import Loading from '../../Loading/Loading'

import { Row,Col } from 'react-bootstrap';
import useAxios from '../../useAxios';
// https://react-mini-projects-api.classbon.com/swagger/index.html

const CategoryList = ({ filterItems, children }) => {

  const [categories, ,loading] = useAxios({
    url:'/FoodCategory/categories'
  })

  // const[loading,setLoading]=useState(true)
  // const [categries, setCategories] = useState([])

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const response = await axios.get('/FoodCategory/categories');
  //     setCategories(response.data);
  //     setLoading(false)
  //   }
  //   fetchCategories()
  // }, [])

  const renderContent = () => {
    if (loading) {
    return <Loading theme='danger'/>
    }
    return (
      <Row className='ps-3 w-100 d-flex align-items-center justify-content-between'>
        <Col  xs={8} md={8} lg={8}>
        <ul className='nav'>
          <li className='nav-item' onClick={()=>filterItems()}>
            <a className='nav-link' href='#'>همه فست فود ها</a>
          </li>
          {categories.map(category => (
            <li className='nav-item' key={category.id} onClick={()=>filterItems(category.id)}>
              <a className='nav-link text-black' href='#'>
                {category.name}
              </a>
            </li>
          ))}

          </ul>
        </Col>
        <Col  xs={4} md={4} lg={4}>
          {/* <SearchBar /> */}
          {children}
        </Col>
      </Row>

    )

}


  return (
    <Row>
      <Col xs={1} md={2} lg={2}></Col>
      <Col xs={10} md={8} lg={8}>
       <nav className='container'>
      <div className='d-flex align-items-center bg-white rounded-3 shadow-lg py-2'>

        {renderContent()}
      </div>
        </nav>
      </Col>
      <Col xs={1} md={2} lg={2}></Col>
   </Row>
  )
}

export default CategoryList
