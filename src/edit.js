import { __ } from '@wordpress/i18n';

import { 
	useBlockProps, 
	AlignmentControl, 
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	RichText, 
	PlainText,
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	GradientPicker,
	RangeControl,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
	Button,
	IconButton,
} from '@wordpress/components';

import './editor.scss';

/**
 * The edit function 
 */
export default function Edit({attributes, setAttributes, className}) {

	const { contentAlign, numberOfColumns, wpgCarousel } = attributes;

	const onChangeContentAlign = ( newContentAlign ) => {
		setAttributes( { contentAlign: newContentAlign 	} )
	}
	const onChangenumberOfColumns = ( newnumberOfColumns ) => {
		setAttributes( { numberOfColumns : newnumberOfColumns } )
	}


	const onRemoveCarouselItem = () => {
		const newwpgCarousel = wpgCarousel.slice(0, wpgCarousel.length-1 );
		setAttributes( { wpgCarousel : newwpgCarousel } );
	}

	const onAddCarouselItem = () => {
		
		const trywpgCarousel = JSON.parse(JSON.stringify( wpgCarousel ));

		setAttributes({
			wpgCarousel: [
				...trywpgCarousel,
				{ itemTitle: "Title "+(wpgCarousel.length+1), itemDetails: "Description "+(wpgCarousel.length+1), itemIndex: wpgCarousel.length }
			]
		})	
	}	

	const onChangeItemContent = (itemContent, itemIndex, type) => {

		const newItemContent = wpgCarousel.map( obj =>
			obj.itemIndex === itemIndex ? { ...obj, [type]: itemContent } : obj
		);		
		setAttributes( { wpgCarousel : newItemContent } ); 
    };

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
				<PanelBody 
					title={ __("Carousel Items", "wp-gutenberg-carusel") }
					initialOpen= {true}
				>					
					
					{wpgCarousel.map((slide) => (
						<PanelRow>
						
							<TextControl
								label="Title"
								className={className}
								value={slide.itemTitle}
								onChange={(itemContent) =>
									onChangeItemContent(itemContent, slide.itemIndex, "itemTitle")
								}
							/>
							
							<TextControl
								label="Description"
								className={className}
								value={slide.itemDetails}
								onChange={(itemContent) =>
									onChangeItemContent(itemContent, slide.itemIndex, "itemDetails")
								}
							/>
							
						</PanelRow>
					))}
					
					<PanelRow>
						<input
							className="button button-secondary"
							type="button"
							value={__("Add Item", "wp-gutenberg-carusel")}
							onClick={ onAddCarouselItem }
						/>
						<input
							className="button button-secondary"
							type="button"
							value={__("Remove Item", "wp-gutenberg-carusel")}
							onClick={ onRemoveCarouselItem }
						/>												
					</PanelRow>

				</PanelBody>
			</InspectorControls>
			<div className='wpgc-blockwrap' { ...useBlockProps() }>
				{ __(
					'WP Gutenberg Carusel',
					'wp-gutenberg-carusel'
				) }
			</div>
		</>
	);
}
