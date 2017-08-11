import React from 'react'
import axios from 'axios'
import auth from '../auth.js'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      shouldRedirect: false
    }
  }

  handleBookSearch(evt) {
    evt.preventDefault()
    const formData = {
      title: this.refs.title.value,
      author: this.refs.author.value
    }
    console.log(formData)
    this.searchBook(formData)
  }

  searchBook(searchInfo) {
    console.log(`searching...`)
    const apiUrl=`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchInfo.title}+inauthor:${searchInfo.author}&key=AIzaSyCqY_vhHob7F2eRSI8R7aFHhcoM4QHhPWQ`
    axios({
      method: "GET",
      url: apiUrl
    })
      .then((response) => {
        console.log(response)
        this.setState({
          books: response.data.items
        })
        console.log(this.state.books)
      })
    console.log(this.state.books)
  }

  addBook(evt) {
    evt.preventDefault()
    const bookData = {
      title: this.refs.title.value,
      author: this.refs.author.value,
      image: this.refs.cover.value
    }
    auth.addBook(bookData).then(success => {
      if (success) {
        this.setState({shouldRedirect: true})
      }
      console.log(success)
    })
  }

  render() {
    return(
      <div>
        <div className='searchPage'>
          <div className='bookSearch'>
            <h2>search for a book!</h2>
            <form onSubmit={this.handleBookSearch.bind(this)}>
              <div>
                <input ref='title' type='text' placeholder='title' defaultValue= ''/>
              </div>
              <div>
                <input ref='author' type='text' placeholder='author' defaultValue=''/>
              </div>
              <button type='submit'>search</button>
            </form>
          </div>
          <div className="resultsList">
            <h2>results:</h2>
            {this.state.books.length > 1
              ? (
                  <ol>
                    {this.state.books.map((book, index) => {
                      return (
                        <div key={index}>
                            <div className='bookPic'>
                              <img ref='book' src={book.volumeInfo.imageLinks.smallThumbnail} alt=''/>
                            </div>
                          <form>
                            <div>
                              <input ref='title' type='text' key={index} defaultValue={book.volumeInfo.title} />
                            </div>
                            <div>
                              <input ref='author' type='text' key={index} defaultValue={book.volumeInfo.authors} />
                            </div>
                            <div>
                              <input ref='cover' type='text' key={index} defaultValue={book.volumeInfo.imageLinks.smallThumbnail} />
                            </div>
                          <button type='submit' onClick={this.addBook.bind(this)}>add</button>
                          </form>
                          <br />
                          <hr />

                        </div>
                      )
                    })}
                  </ol>
                )
              :
                null
            }
          </div>
        </div>
      </div>
    )
  }

}

export default Home
