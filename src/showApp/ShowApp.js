import React from 'react'

function ShowApp(props) {
  return (
    <div className='showApps'>
      <h1>{ props.App }</h1>
      <div className='app_genre'>Genre: {props.Genres}</div>
      <div className='app_price'>${props.Price}</div>
    </div>
  )
}

export default ShowApp