import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 */
export default function save( { attributes } ) {

	const { contentAlign, numberOfColumns, wpgCarousel, blockAlign } = attributes;

	const slides = wpgCarousel.map((slide, index) => {

		return (
			<div className='swiper-slide'>	
				<div className="wpg-content-wrap" style={{textAlign: contentAlign }}>
					<div className='wpg-imgbox' style={ { backgroundImage: "url("+slide.imageURL+")" } } ></div>
					<h2 className='wpg-slide-title'>{ slide.itemTitle }</h2>
					<div className='wpg-slide-desc'>{ slide.itemDetails }</div>			
				</div>
			</div>	
		);
	})	

	if (wpgCarousel.length > 0) {
		return (
			<div className='wpgc-blockwrap' { ...useBlockProps.save() }>
				<div className='swiper wpgswiper' data-columns={numberOfColumns} id='wpgswiper'>
      				<div className='swiper-wrapper'>
						{slides}
					</div>
					<div class="swiper-button-next"></div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-pagination"></div>
				</div>		
			</div>
		);
	} else
	{
		return (
			<div className='wpgc-blockwrap' { ...useBlockProps.save() }>
				{ __( "No Slide In Carousel", "wp-gutenberg-carusel" ) }
			</div>
		);	
	}	
}
