'use strict';
/*
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
        this.tick.bind(this),
        1000
        );
    }

    tick() {
        this.setState({date: new Date()})
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
      }

    render() {
        return (
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        );
    }
}
*/
class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {weather: null};
    }
    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.props.city + '&appid=95c301e15b985b3e0264565d254ccf49')
        .then(response => {
            if (!response.ok) {
                throw new Error('Status code: ' + response.status)
            }
            return response.json();
        })
        .then(json => this.displayWeather(json).bind(this))
        .catch( error => console.error('There was a problem: '  + error) );
    }

    displayWeather(json) {
        this.setState({weather: json.weather[0].description});
        console.log(json.weather[0]);
    }

    render() {
        return (
            <div>{this.state.weather}</div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Weather city="montreal"/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));

