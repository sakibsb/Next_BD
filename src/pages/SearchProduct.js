import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalProductCart from '../components/VerticalProductCart'

const SearchProduct = () => {
  const query = useLocation()
  const [ data , setData] = useState([])
  const [loading, setLoading] = useState(false)

  console.log("query", query.search)

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.searchProduct.url + query.search)
    const dataResponse = await response.json()
    setLoading(false)
    setData(dataResponse.data)
  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  return (
    <div className='container mx-auto p-6 '>
      {
        loading && (
          <p className='text-lg text-center'>
            loading...
          </p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Products :{data.length}</p>
      {
        data.length === 0 && !loading &&(
          <p className='text-lg text-center p-4 bg-white'>No Product Found .....</p>
        )
      }
      {
        data.length !== 0 && !loading && (
          <VerticalProductCart loading={loading} data={data} />
        )
      }
    </div>
  )
}

export default SearchProduct