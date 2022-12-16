import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

interface TableProps {
    result?: string[]
}

interface DisplayTableProps {
    key?: any
    item?: any
    id?: any
    deleteOrder?: any
}

const DisplayTable = (props: DisplayTableProps) => {
    // {console.log(props?.key)}
    return (
    <tr>
        
        <td>{}</td>
        <td>{props?.item?.order_item_id}</td>
        <td>{props?.item?.order_products[0].product_category_name}</td>
        {/* <td>{props?.item?.order_items}</td> */}
        <td>{props?.item?.price}</td>
        <td>{props?.item?.shipping_limit_date}</td>
        <td>
            <Link to="#" onClick={() => props.deleteOrder(props?.item?._id)}>
                <button>Delete</button>
            </Link>
        </td>
    </tr>

    )
}

const deleteOrder = async(id: any) => {
    const res = await axios.delete(`http://localhost:5000/order_items/${id}`)
    console.log(res);
    console.log('Order sucessfully deleted');
}

//   id: order_item_id,
//   product_id: product_id,
//   product_category: products.product_category_name
//   price: price,
//   date: shipping_limit_date

// order_item_id: "1"
// order_products: [{…}]
// price: "199.00"
// product_id: "c777355d18b72b67abbeef9df44fd0fd"
// shipping_limit_date: "2018-01-18 14:48:30"
// _id: "6398cc3e3a624c005eb20872"

const Table = (props: TableProps) => {
    const { result } = props
 
    const holdResult = (result: any) => {
        return (
            result.map((el: any, index: any) => {
                console.log("index: ",index)
                return <DisplayTable item={el} deleteOrder={deleteOrder} key={index} id={index} />
            })
        )
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Order Item ID</th>
                        <th scope="col">Product Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                {holdResult(result)}
                </tbody>
            </table>
        </>
    )
}

export default Table