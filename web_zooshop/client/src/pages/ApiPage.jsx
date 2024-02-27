import React, {Component} from 'react';
import axios from 'axios';
import '../styles/api.css';

class ApiPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jokesCount: 1,
      joke: null,
      dog: null,
    };
  }

  componentDidMount() {
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then((res) => this.setState({dog: res.data}));

    axios.get('https://icanhazdadjoke.com/', {headers: {Accept: 'text/plain'}})
      .then((res) => this.setState({joke: res.data}));
  }

  componentDidUpdate(prevProps, prevState) {
    const {jokesCount} = this.state;

    if (jokesCount !== prevState.jokesCount) {
      axios.get('https://icanhazdadjoke.com/', {headers: {Accept: 'text/plain'}})
        .then((res) => this.setState({joke: res.data}));
    }
  }

  render() {
    const {joke, dog, jokesCount} = this.state;

    return (
      joke && dog && (
        <div className="api">
          <p>Шутка дня: <span class="joke">{joke}</span></p>
          <p>Счетчик шуток: {jokesCount}</p>
          <button onClick={() => this.setState((prevState) => ({jokesCount: prevState.jokesCount + 1}))}>
            Новая шутка
          </button>
            <p class="dog-pic">Картинка дня:</p>
            <div class="img-div">
                <img src={dog.message} alt="dog"/>
            </div>
        </div>
      )
    );
  }
}

export default ApiPage;