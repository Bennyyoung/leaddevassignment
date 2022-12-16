import React, { useEffect, useState } from 'react'
import { Table } from "../components"
import axios from "axios"
import ReactPaginate from 'react-paginate'

interface HomeProps {
  token: any
}

const Home = (props: HomeProps) => {
  const [offset, setOffset] = useState(1)
  const [total, setTotal] = useState(0)
  const [result, setResult] = useState<any[]>([])
  const limit = 20

  useEffect(() => {
    async function getOrders() {
      const result = await axios.get(`http://localhost:5000/order_items?limit=${limit}&offset=${offset}`)
      console.log('res 1',result)
      setResult(result.data.data)
      const data = result.data.total
      // console.log('data:',data)
      setTotal(data)
      // return result
    }
    getOrders()
  }, [offset])

  // console.log('total', total)

  let range = Array.from({ length: 5632 }, (_, index) => ++index)
  // console.log('range',range)


  // const handleOffset = (index: any, el: any) => {
  //   setOffset(offset + el)
  // }
  console.log('offset', offset)

  const { token } = props
  console.log(token.seller_id)

  const handlePageChange = (e: any) => {
    console.log(e)
    setOffset(e.selected)

  }

  console.log("result", result)

  return (
    <>
      <div>
        <Table result={result} />

        <div>
          {/* <span>Showing {offset} to {limit} of {Math.round(total / limit)} Entries</span> */}
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            pageCount={Math.ceil(total / limit)}
            marginPagesDisplayed={3}
            pageRangeDisplayed={5}
            onPageChange={(e) => handlePageChange(e)}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </>
  )
}

export default Home