import { stripDelimiters } from './util.js';
export default function save( {attributes, className} ) {
  return (
    <p className={className}>\[{stripDelimiters(attributes.content)}\]</p>
  );
}
