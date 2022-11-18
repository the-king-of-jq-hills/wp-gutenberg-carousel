import { __ } from '@wordpress/i18n';

import { 
	useBlockProps, 
	AlignmentControl, 
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
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
	Dashicon,
} from '@wordpress/components';

import './editor.scss';
import noImage from './missing.webp';


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
				{ 	
					itemTitle: "Title "+(wpgCarousel.length+1), 
					itemDetails: "Description "+(wpgCarousel.length+1), 
					itemIndex: wpgCarousel.length,
					imageURL: noImage
				}
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
						<div className='wpg-repeater-group'>
						<PanelRow>						
							<TextControl
								label={__("Title", "wp-gutenberg-carusel")}
								className={className}
								value={slide.itemTitle}
								onChange={(itemContent) =>
									onChangeItemContent(itemContent, slide.itemIndex, "itemTitle")
								}
							/>
						</PanelRow>	
						<PanelRow>	
							<TextControl
								label={__("Description", "wp-gutenberg-carusel")}
								className={className}
								value={slide.itemDetails}
								onChange={(itemContent) =>
									onChangeItemContent(itemContent, slide.itemIndex, "itemDetails")
								}
							/>
							
						</PanelRow>
						<PanelRow>
							<MediaPlaceholder
								onSelect = {( el ) => {
										onChangeItemContent(el.url, slide.itemIndex, "imageURL")
										//setAttributes( { theImage: el.url } );
									}
								}
								allowedTypes = { [ 'image' ] }
								multiple = { false }
								labels = { { title: 'The Image' } }
							>
								"extra content"
							</MediaPlaceholder>					
						</PanelRow>
						</div>
					))}
					
					<PanelRow className='wpg-buttons'>
						<Button
                            className={ "button button-large" }
                            onClick={ onAddCarouselItem }
                        >
                            {__("Add Item", "wp-gutenberg-carusel")}
                        </Button>						
						<Button
                            className={ "button button-large" }
                            onClick={ onRemoveCarouselItem }
                        >
                            {__("Remove Item", "wp-gutenberg-carusel")}
                        </Button>										
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
