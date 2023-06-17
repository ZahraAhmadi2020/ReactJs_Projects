
import { Fragment, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import CategoryList from './components/CategoryList/CategoryList';
import axios from 'axios';
import Loading from './Loading/Loading';
import FastFoodList from './components/FastFoodList/FastFoodList';
import { Row,Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar/SearchBar';
import NotFound from './assets/notFound.png'
import useAxios from './useAxios';

function App() {
  const [url, setUrl] = useState('/FastFood/list')
  const [fastFoodItems, , loading] = useAxios({
    url
  })
//   const [loading, setLoading] = useState(false)
//  const[fastFoodItems,setFastFoodItems]=useState([])

  // const fetchData = async(categoryId = null) => {
  //   setLoading(true)
  //   const response = await axios.get(
  //     `FastFood/list/${categoryId ? '?categoryId=' + categoryId : ''}`

  //   )
  //   setLoading(false)
  //   setFastFoodItems(response.data);
  // }
  // useEffect(() => {
  //   fetchData()
  // }, [])

  const searchItem = async (term) => {
    // setLoading(true)
    // const response = await axios.get(
    //   `/FastFood/search/${term ? '?term=' +term : ''}`

    // )
    // setLoading(false)
    // setFastFoodItems(response.data)

    setUrl( `/FastFood/search/${term ? '?term=' +term : ''}`)
  }

  const filterItems = (categoryId) => {
    // fetchData(categoryId)
    setUrl( `FastFood/list/${categoryId ? '?categoryId=' + categoryId : ''}`)
  }
  const renderContent = () => {
    if (loading) {
      return <Loading theme='dark'/>
    }
    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className='alert alert-warning text-center'>
            Not Found

          </div>
          <img className='w-100 fade-in-horiz' src={NotFound} alt='notfound'/>
        </>
      )
    }
    return (
      <Row>
        <Col xs={1} md={1} lg={1}></Col>
        <Col xs={10} md={10} lg={10}><FastFoodList fastFoodItems={fastFoodItems} /></Col>
        <Col  xs={1} md={1} lg={1}></Col>
      </Row>
    )
  }
  return (
    <Fragment className="App">
      <Header/>
      <CategoryList filterItems={filterItems}>
        <SearchBar searchItem={searchItem} />
      </CategoryList>
      <div className='container mt-4'>
        {renderContent()}

      </div>

    </Fragment>
  );
}

export default App;
