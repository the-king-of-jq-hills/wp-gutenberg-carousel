<?php
/**
 * Plugin Name:       WP Gutenberg Carousel
 * Description:       A gutenberg carousel block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            marsian
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-gutenberg-carusel
 *
 * @package           create-block
 */

// Disable direct file access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} 


define( 'WPG_CAROUSEL_DIR', plugin_dir_path( __FILE__ ) );
define( 'WPG_SHOTS_CAROUSEL_URL', plugins_url( '/', __FILE__ ) );
define( 'WPG_CAROUSEL_VERSION', '1.0.2' );
define( 'WPG_CAROUSEL_FILE', __FILE__ );

/**
 * Registers the block using the metadata loaded from the `block.json` 
 */
function create_block_wp_gutenberg_carusel_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_wp_gutenberg_carusel_block_init' );
