<?php global $stylesheet_dir;?>
<div id="footer" style="min-height:250px;">
                <?php wp_footer(); ?>
				<!-- <div class="flex-container"> -->
				<div class="flex-item" style="margin-right: 1.25rem;">
					<strong>ADDRESS</strong>
					<br>
					<br>
					New Chrichton Cottage
					<br>
					Arradoul, Buckie
					<br>
					AB43 5AP
					<br>
					Scotland UK
					<br>
					<br>
					+44 (0) 1234 567891
					<br>
					<br>
					<img width="35%" src="<?php echoPicture($stylesheet_dir,'images/qcode.png');?> " align="left">
				</div>
				<div class="flex-item" style="margin-right: 1.25rem;">
					<strong>About Me</strong>
					<br>
					<br>
					<?php
					$args = array(
						'post_type' => 'page',
						'page_id' => 2
					);
					$q = new WP_Query($args);
				
					$q->the_post();	
					echo substr(get_the_excerpt(), 0,140) .'...';
					?>
					<a class="more-link" href="<?php the_permalink(); ?>">More</a>
					<?php wp_reset_postdata(); ?>
					<br>
					<br>
					<strong>Follow me:</strong>
					<br>
					<br>
					<img src="<?php echoPicture($stylesheet_dir,'images/twitter.png');?>" width="15%">
					<img src="<?php echoPicture($stylesheet_dir,'images/linkedin.png');?>" width="15%">
					<img src="<?php echoPicture($stylesheet_dir,'images/pinterest.png');?>" width="15%">
					<img src="<?php echoPicture($stylesheet_dir,'images/facebook.png');?>" width="15%">
					<img src="<?php echoPicture($stylesheet_dir,'images/google_plus.png');?>" width="15%">
				</div>
				<div class="flex-item" style="margin-right: 1.25rem;">
					<strong>My last post</strong>
					<br>
					<br>
					<?php
					$args = array('post_type' => 'post');
					$myposts = new WP_Query($args);
					if ($myposts->have_posts()) : $myposts->the_post();
					?>
					<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					<?php the_content('moar', false); ?>
					<?php else: ?>
						<p><?php _e('No posts were found. Sorry bro!'); ?></p>
					<?php
					endif;
					wp_reset_postdata();
					?>
				</div>
				<div class="flex-item">
					<strong>Last Project</strong>
					<br>
					</br>
					Freelance WebSite
					<br>
					<br>
					<img width="80%" src="<?php echoPicture($stylesheet_dir,'images/portfolio/p1.jpg');?>" >
				</div>

				<!-- </div> -->
			</div>
		</div>

	</body>
</html>
