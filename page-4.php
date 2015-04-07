<?php 
    global $stylesheet_dir, $stylesheet_url;
    get_header();
?>
				<div class="container" style="background-image: url('<?php echoPicture($stylesheet_dir,'./images/bg2.png');?> ');background-size: 100%;background-repeat: no-repeat;background-color: #040205; " role="main">
					<ul class="list">
					<?php
					global $paged;
					
					if(empty($paged)) $paged = 1;
					
					$posts_per_page = get_option('posts_per_page');
					$args = array(
						'post_type' => 'post',
						'posts_per_page' => $posts_per_page,
						'offset' => ($paged-1) * $posts_per_page
					);
					$myposts = new WP_Query($args);
					$total_posts = $myposts->found_posts;
					if ($myposts->have_posts()) : while ($myposts->have_posts()) : $myposts->the_post();
					?>

                       <li class="blog_list__item">
							<figure class="blog_list__item__inner">
								<figcaption>
									<img src="<?php echoPicture($stylesheet_dir,'./images/blog/b1.jpg');?>" alt="">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
									<?php the_content('moar', false); ?>
								</figcaption>
							</figure>
						</li>
					<?php endwhile; else: ?>
						<p><?php _e('No posts were found. Sorry bro!'); ?></p>
					<?php endif; ?>
					</ul>
                    <?php
                    pagination(ceil($total_posts / $posts_per_page));
                    wp_reset_postdata();
                    ?>

				</div>
<?php 
    get_footer();
?>
