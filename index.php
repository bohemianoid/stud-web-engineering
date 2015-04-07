<?php get_header(); 
global $stylesheet_dir;
?>
			<div class="container" style="background-image: url('<?php echoPicture($stylesheet_dir,'images/bg1.png');?>');background-size: 100%;background-repeat: no-repeat;background-color: #7C7052; " role="main">

				<?php
				if ($page_id == 2) { // display about me
					$args = array(
						'post_type' => 'page',
						'page_id' => $page_id
					);
					$q = new WP_Query($args);
					$q->the_post();
					
					echo '<div class="transbox">';
					the_content();
				} else { // display blog entry
					echo '<div class="transbox-big">';
					$le_post = get_post($post->ID);
					echo '<h1>'. $le_post->post_title . '<span class="author"> (by '. $le_post->post_author .')</span></h1>';
					echo $le_post->post_content;
				}
				echo '</div>';
				
				wp_reset_postdata();
				?>
			</div>

<?php get_footer(); ?>
