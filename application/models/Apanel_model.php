<?php
class Apanel_model extends CI_Model{
   public function nav_links() {
      return array(
         array("name"=> "Home", "link"=> "apanel"),
         array("name"=> "Users", "link"=> "apanel/users"),
         array("name"=> "Files", "link"=> "apanel/files"),
         array("name"=> "Feedbacks", "link"=> "apanel/feedbacks"),
         );
   }
}
?>