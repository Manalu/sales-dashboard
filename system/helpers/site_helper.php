<?php
if (!function_exists('folder_size'))
{
	function folder_size($dir) {
      $size = 0;
      foreach (glob(rtrim($dir, '/').'/*', GLOB_NOSORT) as $each) {
         $size += is_file($each) ? filesize($each) : folder_size($each);
      }
      return $size;
   }
}
if (!function_exists('human_filesize')) {
	function human_filesize($bytes, $decimals = 2) {
            $size = array(' B',' kB',' MB',' GB',' TB',' PB',' EB',' ZB',' YB');
            $factor = floor((strlen($bytes) - 1) / 3);
            return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$size[$factor];
      }
}

if (!function_exists('time_elapsed_string')) {
      function time_elapsed_string($datetime, $full = false) {
            $now = new DateTime;
            $ago = new DateTime($datetime);
            $diff = $now->diff($ago);
        
            $diff->w = floor($diff->d / 7);
            $diff->d -= $diff->w * 7;
        
            $string = array(
                'y' => 'year',
                'm' => 'month',
                'w' => 'week',
                'd' => 'day',
                'h' => 'hour',
                'i' => 'minute',
                's' => 'second',
            );
            foreach ($string as $k => &$v) {
                if ($diff->$k) {
                    $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
                } else {
                    unset($string[$k]);
                }
            }
        
            if (!$full) $string = array_slice($string, 0, 1);
            return $string ? implode(', ', $string) . ' ago' : 'just now';
        }
}

?>