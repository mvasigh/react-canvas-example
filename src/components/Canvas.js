import React, { Component } from 'react';
import panzoom from 'pan-zoom';

class PureCanvas extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <canvas
                width="600"
                height="600"
                style={{ border: '1px solid black' }}
                ref={node =>
                    node ? this.props.contextRef(node.getContext('2d')) : null
                }
            />
        );
    }
}

class Canvas extends Component {
    state = {
        transform: []
    };

    componentDidMount() {
        this.draw();
        this.destroy = panzoom(this.ctx.canvas, this.handlePanZoom);
    }

    saveContext = ctx => {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
    };

    handlePanZoom = e => {
        const { dx, dy, dz } = e;
        const transform = [1 + dz / 40, 0, 0, 1 + dz / 40, dx, dy];
        this.setState({
            transform
        });
        this.ctx.transform(...transform);
    };

    drawRects = rects => {
        rects.forEach(rect => {
            const { x, y, width, height } = rect;
            this.ctx.setLineDash([5, 10]);
            this.ctx.strokeRect(x, y, width, height);
        });
    };

    draw = () => {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.restore();
        this.drawRects(this.props.rectangles);
        requestAnimationFrame(this.draw);
    };

    render() {
        return <PureCanvas contextRef={this.saveContext} />;
    }
}

export default Canvas;
