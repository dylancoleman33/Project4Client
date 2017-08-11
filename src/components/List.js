import React from 'react'
import { NavLink } from 'react-router-dom'

const List = (props) => {
  return (
    <ol>
      {props.items.map((item, index) => {
        return (
          <div key={index}>
            <div className='wineList'>

                <div className='bookPic'>
                  <img src={item.volumeInfo.imageLinks.smallThumbnail} alt=''/>
                </div>

                <div className='bookInfo'>
                  <h4>{item.volumeInfo.title}</h4>
                  <p>by {item.volumeInfo.authors}</p>
                </div>

            </div>
            <button type='submit'>add</button>
            <br />
            <hr />

          </div>
        )
      })}
    </ol>
  )
}

export default List
