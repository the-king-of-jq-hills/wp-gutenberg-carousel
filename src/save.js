import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 */
export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ 'Wp Gutenberg Carusel – hello from the saved content!' }
		</p>
	);
}
