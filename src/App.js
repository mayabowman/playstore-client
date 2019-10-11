import React from 'react'
import ShowApp from './showApp/ShowApp'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apps: [],
      sort: '',
      genres: '',
      error: null
    }
  }

  setGenres(genres) {
    this.setState({
      genres
    })
  }

  setSort(sort) {
    this.setState({
      sort
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const baseUrl = 'http://localhost:8000/apps'
    const params = []
    if(this.state.genres) {
      params.push(`genres=${this.state.genres}`)
    }
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    const query = params.join('&')
    const url = `${baseUrl}?${query}`

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: 'Sorry! Could not get apps at this time. Try again later!'
        })
      })
  }

  render() {
    const apps = this.state.apps.map((app, i) => {
      return <ShowApp {...app} key={i} />
    })
    return (
      <div className="App">
        <h1>Check out these apps!</h1>
        <div className='sort'>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor='search'>Search for a Genre: </label>
            <input
              type='text'
              id='search'
              name='search'
              value={this.state.genres}
              onChange={e => this.setGenres(e.target.value)}
            />

            <label htmlFor='sort'>Sort by rating or app: </label>
            <select id='sort' name='sort' onChange={e => this.setSort(e.target.value)}>
              <option value=''>None</option>
              <option value='rating'>Rating</option>
              <option value='app'>App</option>
            </select>
            <button type='submit'>Sort</button>
          </form>
        </div>
        {apps}
      </div>
    )
  }
}

export default App;
