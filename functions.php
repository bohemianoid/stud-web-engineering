<?php

    add_theme_support('post-thumbnails');

 $stylesheet_url = get_bloginfo('stylesheet_url');
 $stylesheet_dir = get_bloginfo('stylesheet_directory');
 $images_url = get_bloginfo('stylesheet_url').'/images/';

 function echoPicture($ssurl, $locurl) {
     echo $ssurl.'/'.$locurl;
 }

function pagination($num_pages = '')
{
     $showitems = ($range * 2)+1;

     global $paged;

     echo '<div class="pagination"><span>Page '.$paged.' of '.$num_pages.'</span>';

     for ($i=1; $i <= $num_pages; $i++)
     {
         echo ($paged == $i)? '<span class="current">'.$i.'</span>':'<a href="'.get_pagenum_link($i).'" class="inactive">'.$i.'</a>';
     }

     echo '</div>';
}

// Register Portfolio Post Type
function portfolio_post_type() {

	$labels = array(
		'name'                => 'Entries',
		'singular_name'       => 'Entrie',
		'menu_name'           => 'Portfolio',
		'name_admin_bar'      => 'Portfolio Management',
		'parent_item_colon'   => 'Parent Item:',
		'all_items'           => 'All Items',
		'add_new_item'        => 'Add New Item',
		'add_new'             => 'Add New',
		'new_item'            => 'New Item',
		'edit_item'           => 'Edit Item',
		'update_item'         => 'Update Item',
		'view_item'           => 'View Item',
		'search_items'        => 'Search Item',
		'not_found'           => 'Not found',
		'not_found_in_trash'  => 'Not found in Trash',
	);
	$args = array(
		'label'               => 'portfolio',
		'description'         => 'Portfolio Management',
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'thumbnail', 'custom-fields', ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-images-alt',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
	);
	register_post_type( 'portfolio', $args );

}

// Hook into the 'init' action
add_action( 'init', 'portfolio_post_type', 0 );

// Posts to posts
function my_connection_types() {
    p2p_register_connection_type( array(
        'name' => 'posts_to_portfolio',
        'from' => 'post',
        'to' => 'portfolio'
    ) );
}
add_action( 'p2p_init', 'my_connection_types' );

// Register Theme Features
function custom_theme_features()  {

	// Add theme support for Custom Header
	$header_args = array(
		'default-image'          => '',
		'width'                  => 0,
		'height'                 => 0,
		'flex-width'             => false,
		'flex-height'            => false,
		'uploads'                => true,
		'random-default'         => false,
		'header-text'            => false,
		'default-text-color'     => '',
		'wp-head-callback'       => '',
		'admin-head-callback'    => '',
		'admin-preview-callback' => '',
	);
	add_theme_support( 'custom-header', $header_args );
}

// Hook into the 'after_setup_theme' action
add_action( 'after_setup_theme', 'custom_theme_features' );

?>
