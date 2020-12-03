'use strict';
/**
 * This class creates everything for the weather component
 * @author Trevor McCubbin
 */
class Weather extends React.Component {
    /**
     * Construtor method that sets the initial state and adds the input props into the component constructor
     * @param {*} props the city you want to look up the weather for
     */
    constructor(props) {
        super(props);
        this.state = {
            temperature: null,
            description: null,
            icon: null
        };
    }

    /**
     * When the weather component is mounted inside the app class this method is called.
     * It fetches the weather for montreal and sends the responding json to the displayWeather method
     * @throws Error if the fetch request is bad
     */
    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.props.city + '&appid=95c301e15b985b3e0264565d254ccf49&units=metric')
        .then(response => {
            if (!response.ok) {
                throw new Error('Status code: ' + response.status)
            }
            return response.json();
        })
        .then(json => this.displayWeather(json).bind(this))
        .catch(error => console.error('There was a problem: '  + error));
    }

    /**
     * this method sets the state of our component to the current weather info
     * @param {*} json The information returned by the fetch request
     */
    displayWeather(json) {
        this.setState({
            temperature: json.main.temp,
            description: json.weather[0].description,
            icon: json.weather[0].icon
        });
    }
    /**
     * This render the weather component
     */
    render() {
        return (
            <section>
                <div>{this.state.temperature} &#8451; {this.state.description}</div>
                <img src={"http://openweathermap.org/img/wn/" + this.state.icon + "@2x.png"}/>
                <button type="button" onClick={() => this.componentDidMount()}>Refresh</button>
            </section> 
        );
    }
}

/**
 * This class is used to have a cleaner look at what is being rendered inside your webpage
 * @author Trevor McCubbin
 */
class App extends React.Component {
    /**
     * Renders the weather component with montreal as the city props
     */
    render() {
        return (
            <div>
                <Weather city="montreal"/>
            </div>
        );
    }
}

// render the app into the root div
ReactDOM.render(<App/>, document.querySelector('#root'));