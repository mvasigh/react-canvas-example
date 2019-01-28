import React, { Component } from 'react';
import Canvas from './components/Canvas';

class App extends Component {
    state = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rectangles: [
            {
                x: 10,
                y: 20,
                width: 300,
                height: 165
            }
        ]
    };

    handleAddRect = e => {
        e.preventDefault();
        const { x, y, width, height, rectangles } = this.state;
        this.setState({
            rectangles: [...rectangles, { x, y, width, height }]
        });
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        const { x, y, width, height, rectangles } = this.state;
        return (
            <div
                className="App"
                style={{
                    display: 'flex'
                }}
            >
                <Canvas rectangles={rectangles} />
                <form
                    onSubmit={this.handleAddRect}
                    style={{
                        padding: '1.2rem'
                    }}
                >
                    <label htmlFor="x">X Coord</label>
                    <input
                        type="number"
                        onChange={this.handleInputChange}
                        name="x"
                        value={x}
                    />

                    <label htmlFor="y">Y Coord</label>
                    <input
                        type="number"
                        onChange={this.handleInputChange}
                        name="y"
                        value={y}
                    />

                    <label htmlFor="width">Width</label>
                    <input
                        type="number"
                        onChange={this.handleInputChange}
                        name="width"
                        value={width}
                    />

                    <label htmlFor="height">Height</label>
                    <input
                        type="number"
                        onChange={this.handleInputChange}
                        name="height"
                        value={height}
                    />
                    <button type="submit">Add Rect</button>

                    <ul>
                        {rectangles.map((rect, i) => (
                            <li key={i}>{JSON.stringify(rect)}</li>
                        ))}
                    </ul>
                </form>
            </div>
        );
    }
}

export default App;
