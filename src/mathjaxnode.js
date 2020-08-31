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
        if(!MathJax) {
            return;
        }
        this.container.current.textContent = `\\[${this.props.expression}\\]`;
        if(MathJax.version.match(/^3\./)) {
            MathJax.typeset([this.container.current]);
        } else if(MathJax.version.match(/^2\./)) {
            MathJax.Hub.Typeset([this.container.current]);
        } else {
            return;
        }
    }

    render() {
      return <div ref={this.container} className="mathjax-preview"/>;
    }
}
