import React from 'react'
import { useRouteError } from 'react-router-dom'


const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div>
      <h1>Oops somethig went wrong...</h1>
      <img src='./Images/NotFound.png' alt=''/>
      <p>{error.error?.message}</p>
    </div>
  )
}

export default ErrorPage