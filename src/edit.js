import { __ } from '@wordpress/i18n';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { 
	useBlockProps, 
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	PlainText,
	BlockAlignmentToolbar
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

	const { contentAlign, numberOfColumns, wpgCarousel, blockAlign } = attributes;

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
					itemTitle: "Slide Title", 
					itemDetails: "Slide Description... ", 
					itemIndex: wpgCarousel.length,
					imageURL: noImage,
					linkURL: "http://www.example.com",
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

	const slides = wpgCarousel.map((slide, index) => {

		if ( slide.imageURL == "" ) {
			slide.imageURL = noImage;
		}

		return (
			<SwiperSlide key={ `slide-${index}` }>
				
				<div className="wpg-content-wrap" style={{textAlign: contentAlign }}>
					<div className='wpg-imgbox' style={ { backgroundImage: "url("+slide.imageURL+")" } } ></div>
					<h2 className='wpg-slide-title'>{ slide.itemTitle }</h2>
					<div className='wpg-slide-desc'>{ slide.itemDetails }</div>			
				</div>
				
			</SwiperSlide>
		);
	})
	

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
							max={ 5 }
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
									value={slide.itemTitle}
									onChange={(itemContent) =>
										onChangeItemContent(itemContent, slide.itemIndex, "itemTitle")
									}
								/>
							</PanelRow>	
							<PanelRow>
								<PlainText
									label={__("Description...", "wp-gutenberg-carusel")}
									value={slide.itemDetails}
									onChange={(itemContent) =>
										onChangeItemContent(itemContent, slide.itemIndex, "itemDetails")
									}
								/>
								
							</PanelRow>
							<PanelRow>
								<MediaPlaceholder
									style={{  backgroundImage: `url(${slide.imageURL})` }}
									onSelect = {( el ) => {
											onChangeItemContent(el.url, slide.itemIndex, "imageURL")
											//setAttributes( { theImage: el.url } );
										}
									}
									allowedTypes = { [ 'image' ] }
									multiple = { false }
									labels = { { title: 'Slide Image' } }
									className='wpg-imgholder'
								>
								</MediaPlaceholder>					
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__("Slide Link", "wp-gutenberg-carusel")}
									value={slide.linkURL}
									onChange={(itemContent) =>
										onChangeItemContent(itemContent, slide.itemIndex, "linkURL")
									}
								/>							
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
			
			{/* Block Controls */}
			<BlockControls group="block">
				<BlockAlignmentToolbar
					value={ blockAlign }
					onChange={ ( newblockAlign ) => {
						setAttributes( { blockAlign: newblockAlign } );
					} }
				/>
			</BlockControls>
			
			{/* Editor View */}
			<div className='wpgc-blockwrap' { ...useBlockProps() }>
				<Swiper 
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					navigation
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}
					slidesPerView={numberOfColumns} 
					spaceBetween= {32}
				>
					{slides}
				</Swiper>
			</div>
		</>
	);
}
