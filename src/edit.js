import { __ } from '@wordpress/i18n';

import { 
	useBlockProps, 
	AlignmentControl, 
	BlockControls,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	GradientPicker,
	RangeControl,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
} from '@wordpress/components';

import './editor.scss';

/**
 * The edit function 
 */
export default function Edit({attributes, setAttributes}) {

	const { contentAlign, numberOfColumns } = attributes;

	const onChangeContentAlign = ( newContentAlign ) => {
		setAttributes( { contentAlign: newContentAlign 	} )
	}
	const onChangenumberOfColumns = ( newnumberOfColumns ) => {
		setAttributes( { numberOfColumns : newnumberOfColumns } )
	}	

	return (
		<>
			<InspectorControls>
				<PanelBody 
					title={ __("Carousel Settings", "wp-gutenberg-carusel") }
					initialOpen= {true}
				>
					<PanelRow>
						<div className='qpgc-custom-control-label'>{ __("Align Content", "wp-gutenberg-carusel") }</div>						
						<RadioGroup label="Text Align" onChange={ onChangeContentAlign } checked={ contentAlign }>
							<Radio value="left">{ __("Left", "wp-gutenberg-carusel") }</Radio>
							<Radio value="center">{ __("Center", "wp-gutenberg-carusel") }</Radio>
							<Radio value="right">{ __("Right", "wp-gutenberg-carusel") }</Radio>
						</RadioGroup>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={ __("Number of Columns", "wp-gutenberg-carusel") }
							value={ numberOfColumns }
							onChange={ onChangenumberOfColumns } 								
							min={ 1 }
							max={ 4 }
						/>
					</PanelRow>

				</PanelBody>	
			</InspectorControls>
			<div className='wpgc-blockwrap' { ...useBlockProps() }>
				{ __(
					'Wp Gutenberg Carusel – hello from the editor!',
					'wp-gutenberg-carusel'
				) }
			</div>
		</>
	);
}
