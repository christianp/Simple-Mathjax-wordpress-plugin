( function( blocks, element, editor ) {
    var el = element.createElement;
    var RichText = editor.RichText;
    var Block = editor.__experimentalBlock;

    class MathJaxNode extends React.Component {
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
            var el = React.createElement;

            return el(
                'div',
                {
                    ref: this.container,
                    className: 'mathjax-preview'
                },
                ''
            );
        }
    }

    function stripDelimiters(str) {
        if(str===undefined) {
            str = '';
        }
        return str.replace(/^\\\[(.*)\\\]$/,'$1');
    }
 
    blocks.registerBlockType( 'simple-mathjax/display-math', {
        title: 'LaTeX Math',
        icon: 'editor-customchar',
        category: 'common',
        example: {},
        attributes: {
            content: {
                type: 'string',
                source: 'text',
                selector: 'p'
            }
        },
        example: {
            attributes: {
                content: 'x^2 + \\sin(\\pi)',
            },
        },
        edit: function( props ) {
            function onChangeContent( newContent ) {
                props.setAttributes( { content: newContent } );
            }

            const codeRef = React.createRef();
            var code = el(
                Block.pre,
                {
                    className: 'edit-latex '+(props.isSelected ? 'show' : '')
                },
                [
                    el(
                        editor.PlainText,
                        {
                            ref: codeRef,
                            tagName: 'code',
                            value: stripDelimiters(props.attributes.content),
                            onChange: onChangeContent,
                            'aria-label': 'LaTeX math'
                        }
                    )
                ]
            );
            var preview = el(
                MathJaxNode,
                {expression: stripDelimiters(props.attributes.content)}
            )

            return el(
                'div',
                {
                    className: props.className
                },
                [code,preview]
            );
        },
 
        save: function( props ) {
            return el( RichText.Content, {
                tagName: 'p', 
                className: props.className,
                value: props.attributes.content,
            } );
        },
    } );
}(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
) );
