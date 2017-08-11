import React from 'react'
import axios from 'axios'

class Books extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks(){
    console.log("Getting books..")
    axios({
      url: `http://localhost:3001/books`
    })
      .then((response) => {
        console.log(response)
        this.setState({
          books: response.data
        })
        console.log('books',this.state.books)
      })
  }


  render() {
    return (
      <div className='bookClub'>
        <h2>Books in the club:</h2>
        <ul>
          {this.state.books.map((book, index) => {
            return(
              <div className='bookWrap'>
                <img src={book.image} alt={book.title}/>
                <li key={index}>{book.title} by {book.author}</li><br />
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Books
