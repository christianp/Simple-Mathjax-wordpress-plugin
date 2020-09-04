import edit from './edit';
import save from './save';
import metadata from './block.json';

const {name, attributes} = metadata;

export {metadata, name};

const {registerBlockType} = wp.blocks;

export default registerBlockType(name, {
  title: 'LaTeX Math',
  description: 'A block of LaTeX mathematics.',
  example: {
    attributes: {
      content: 'x^2 + \\sin(\\pi)',
    },
  },
  attributes,
  edit,
  save,
});
