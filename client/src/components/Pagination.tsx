import React from 'react'

interface PaginationProps {}

const Pagination = (props: PaginationProps) => {
  return (
    <div>
        <table>
            <tr>
                <th>Product Category Name</th>
                <th>Product Name Length</th>
                <th>Product Description Length</th>
                <th>Product Photos Quantity</th>
                <th>Product Weight (G)</th>
                <th>Product Length (CM)</th>
                <th>Product Height (CM)</th>
                <th>Product Width (CM)</th>
            </tr>
        </table>
    </div>
  )
}

export default Pagination