import {register, login, getMyKids} from '../api'
import React, {Fragment, useEffect, useState} from "react";
import {Map, Marker, Overlay, OverlayProps} from "pigeon-maps";
import {stamenToner} from 'pigeon-maps/providers'

const appStyle = {
    height: '250px',
    display: 'flex'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const overlayStyle = {
    overflow: 'visible'
};

const Field = React.forwardRef(({label, type, inputPlace}, ref) => {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <input ref={ref} type={type} style={inputStyle} placeholder={inputPlace}/>
        </div>
    );
});

const LoginForm = ({onSubmit}) => {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <Field ref={emailRef} inputPlace="robimeyo@gmail.com" label="Email:" type="email"/>
            <Field ref={passwordRef} label="Password:" type="password"/>
            <div>
                <button style={submitStyle} type="submit">Submit</button>
            </div>
        </form>
    );
};

const RegisterForm = ({onSubmit}) => {
    const nameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <Field ref={nameRef} label="Name:" type="text"/>
            <Field ref={emailRef} label="Email:" type="email"/>
            <Field ref={passwordRef} label="Password:" type="password"/>
            <div>
                <button style={submitStyle} type="submit">Submit</button>
            </div>
        </form>
    );
};

const HasJwt = () => {

    return (
        <div>
            <h1>Welcome to {"c"} !</h1>
            <h2>{new Date().getTime()}</h2>
        </div>
    );
    //{jwt && <div> Ha jwt </div>}
}

function toArray(pos) {
    return [
        Number.parseFloat(pos.lat),
        Number.parseFloat(pos.long)
    ];
}

const Line = ({
                  mapState: {width, height},
                  latLngToPixel,
                  coordsArray,
                  style = {strokeWidth: 5}
              }) => {
    if (coordsArray.length < 2) {
        return null;
    }

    let lines = []
    let pixel = latLngToPixel(toArray(coordsArray[0]))

    lines.push(<circle cx={pixel[0]} cy={pixel[1]}
                       r={style.strokeWidth}
                       fill={coordsArray[0].color}/>)

    for (let i=1;i<coordsArray.length;i++) {
        let pixel2 = latLngToPixel(toArray(coordsArray[i]))
        lines.push(<line
            key={i}
            x1={pixel[0]}
            y1={pixel[1]}
            x2={pixel2[0]}
            y2={pixel2[1]}
            style={
                {
                    stroke:coordsArray[i].color,
                    strokeWidth:5
                }
            }
        />)
        lines.push(<circle cx={pixel2[0]} cy={pixel2[1]}
                           r={style.strokeWidth}
                           fill={coordsArray[i].color}/>)
        pixel = pixel2
    }

    return (
        <svg width={width} height={height}
             style={{top: 0, left: 0}}
        >
            {lines}
        </svg>

    )
}

const IntervalExample = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {seconds} seconds have elapsed since mounting.
            </header>
        </div>
    );
};


class App extends React.Component {

    state = {
        jwt: null,
        map: null
    }

    constructor(props) {
        super(props)
        this.updateState = this.updateState.bind(this)
        this.listenToMovements = this.listenToMovements.bind(this)
    }

    updateState(jwt) {
        const INITIAL_POSITION = [
            {lat : 45.500557,long:12.260485,color:"#000"},
            {lat : 45.500517,long:12.260115,color:"#000"}
        ];
        this.setState({
            jwt: jwt,
            map: this.getMapByMarkers(
                [INITIAL_POSITION]
            )
        })
        this.listenToMovements();
    }

    listenToMovements() {
        const interval = setInterval(() => {
            this.addNewPosToCurrentMarkers()
                .then(kids_locations => {
                    if (kids_locations.length <= 0) return;
                    this.setState({
                        jwt: this.state.jwt,
                        map: this.getMapByMarkers(
                            kids_locations
                        )
                    })
                })
        }, 1000);
    }

    addNewPosToCurrentMarkers() {
        return getMyKids().then(kids => {
            if (kids.data.length <= 0) return kids.data;
            return kids.data.map(kid =>
                kid.positions.map(pos => {
                        return {
                            lat : pos.coords.lat,
                            long: pos.coords.long,
                            color: kid.color
                        }
                    }
                )
            )
        });
    }

    getMapByMarkers(markers_array) {

        let markers = markers_array[0];

        console.log(JSON.stringify(markers_array))

        return <Map
            provider={stamenToner}
            defaultCenter={toArray(markers[0])}
            defaultZoom={18}
            width={1000}
            height={1000}
        >
            {
                markers_array.map(markers =>
                    <Line coordsArray={markers}/>
                )
            }
        </Map>;
    }

    handleLogin = data => {
        login(data.email, data.password).then(jwt => {
            if (jwt) {
                //alert(JSON.stringify(jwt));
                this.updateState(jwt);
            }
        });
    };

    handleRegister = data => {
        register(data.name, data.email, data.password).then(jwt => {
            if (jwt) {
                this.updateState(jwt);
            }
        });
    };

    render() {
        return (
            <div style={appStyle}>
                {
                    this.state.jwt == null &&
                    <div>
                        <RegisterForm onSubmit={this.handleRegister}/>
                        <LoginForm onSubmit={this.handleLogin}/>
                    </div>
                }
                {
                    this.state.jwt &&
                    <div>
                        <HasJwt/>
                        <Fragment>{this.state.map}</Fragment>
                        <div>
                            <IntervalExample></IntervalExample>
                            {/*           <button onClick={this.simulateMove}>
                                Start Listening
                            </button>*/}
                        </div>
                    </div>
                }
            </div>
        );
    }

}


export default App;
