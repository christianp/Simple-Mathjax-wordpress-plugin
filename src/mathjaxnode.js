import * as React from 'react';

export class MathJaxNode extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }

    componentDidMount() {
        this.typeset();
    }

    componentDidUpdate(prevProps) {
        this.typeset();
    }

    typeset() {
        this.container.current.textContent = `\\[${this.props.expression}\\]`;
        MathJax.typeset([this.container.current]);
    }

    render() {
      return <div ref={this.container} className="mathjax-preview"/>;
    }
}
