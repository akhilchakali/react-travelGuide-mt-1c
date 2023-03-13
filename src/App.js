import './App.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

// Replace your code here
class App extends Component {
  state = {isLoading: true, list: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    console.log(data.packages)

    const formatted = data.packages.map(each => ({
      description: each.description,
      id: each.id,
      imageUrl: each.image_url,
      name: each.name,
    }))

    this.setState({isLoading: false, list: formatted})
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  item = () => {
    const {list} = this.state
    return (
      <div>
        <ul>
          {list.map(each => (
            <li key={each.id}>
              <img src={each.imageUrl} alt={each.name} />
              <h1>{each.name}</h1>
              <p>{each.description}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <h1>Travel Guide</h1>
        <div>{isLoading ? this.loader() : this.item()}</div>
      </div>
    )
  }
}

export default App
