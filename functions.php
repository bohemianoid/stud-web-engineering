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

?>
