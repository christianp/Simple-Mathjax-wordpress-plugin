import { 
  PlainText,
  __experimentalBlock as Block,
  RichText,
} from '@wordpress/block-editor';
import * as React from 'react';
import { stripDelimiters } from './util.js';

import {MathJaxNode} from './mathjaxnode.js';


export default function LaTeXEdit( {attributes, setAttributes, className, isSelected } ) {
  let preClass = 'edit-latex';
  if(isSelected) {
    preClass += ' show';
  }
  const codeRef = React.createRef();
  return (
    <div className={className}>
      <Block.pre className={preClass}>
        <PlainText 
          ref={codeRef}
          tagName="code"
          value={stripDelimiters(attributes.content)}
          onChange={ (content) => setAttributes( { content } ) }
          placeholder="Write math-mode LaTeX"
          aria-label="LaTeX math"
        />
      </Block.pre>
      <MathJaxNode expression={ stripDelimiters(attributes.content) } />
    </div>
  );
}
