export default function save( {attributes, className} ) {
  return (
    <p className={className}>\[{attributes.content}\]</p>
  );
}
