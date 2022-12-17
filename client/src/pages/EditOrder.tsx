import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import { Input, Button } from "../components"

interface EditOrderProps {

}

// <td>{props?.item?.order_item_id}</td>
// <td>{props?.item?.order_products[0].product_category_name}</td>
// <td>{props?.item?.price}</td>
// <td>{props?.item?.shipping_limit_date}</td>



const EditOrder = (props: EditOrderProps) => {
  const [formData, setFormData] = useState({
    orderItemId: '',
    productCategoryName: '',
    price: '',
    shippingLimitDate: ''
  })
  const { id } = useParams()
  console.log(id)


  useEffect(() => {
    const getOrders = async () => {
      const result = await axios.get(`http://localhost:5000/order_items/${id}`)
      console.log(result)
      setFormData(() => ({
        orderItemId: result.data.data.order_item_id,
        productCategoryName: result.data.data.order_products[0].productCategoryName,
        price: result.data.data.price,
        shippingLimitDate: result.data.data.shippingLimitDate
      }))
    }
    getOrders()

  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault()
        const result = await axios.patch(`http://localhost:5000/order_items/${id}`, formData)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input value={formData.orderItemId} name="orderItemId" type="text" onChange={(e) => handleChange(e)} text="Order Item ID" />
        <Input value={formData.productCategoryName} name="productCategoryName" type="text" onChange={(e) => handleChange(e)} text="Product Category Name" />
        <Input value={formData.price} name="price" type="text" onChange={(e) => handleChange(e)} text="Price" />
        <Input value={formData.shippingLimitDate} name="shippingLimitDate" type="text" onChange={(e) => handleChange(e)} text="Shipping Limit Date" />
        <Button text='Submit' />
      </form>
    </div>
  )
}

export default EditOrder