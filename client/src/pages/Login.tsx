import React, { FormEvent, ChangeEvent, useState } from 'react'
import axios from 'axios'
import {Input, Button} from '../components'

interface LoginProps {
  setToken: (userToken: any) => void
}

const BASE_URL = process.env.REACT_BACKEND_URL


async function loginUser(credentials: string) {


  const result = await axios.post('http://localhost:5000', {'zipCode': credentials})
  return result
}


const Login = (props: LoginProps) => {
  const { setToken } = props
  const [zipCode, setZipCode] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await loginUser(zipCode);

      setToken(token)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setZipCode(e.target.value)
  }
  return (
    <div>
        <h1>Please Log In</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          
          <Input onChange={(e) => handleZipCode(e)} value={zipCode} name='zipCode' placeholder='Please login with zip code' type='text' text='Zip code' />
          <Button text='Log in' />
        </form>
    </div>
  )
}

export default Login