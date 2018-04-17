<?php
class Apanel extends CI_Controller{
   public function home(){
      if(!$this->session->userdata('logged_in')) {
         redirect('login');
      } else if(!($this->session->userdata('username') == "admin")) {
         show_error("You don't have access to this page", 403, "Forbidden");
         die();
      }
      $data['users_stats'] = $this->user_model->get_stats();
      $data['files_stats'] = $this->file_model->get_stats();
      $data['feedbacks_stats'] = $this->feedback_model->get_stats();

      $data['links'] = $this->apanel_model->nav_links();
      $data['title'] = 'Admin Panel';
      
      $this->load->view('templates/apanel_header', $data);
      $this->load->view('apanel/home', $data);
      $this->load->view('templates/apanel_footer');
   }
   
   public function users(){
      if(!$this->session->userdata('logged_in')) {
         redirect('login');
      } else if(!($this->session->userdata('username') == "admin")) {
         show_error("You don't have access to this page", 403, "Forbidden");
         die();
      }
      $data['users'] = $this->user_model->get();

      $data['links'] = $this->apanel_model->nav_links();
      $data['title'] = 'Users';
      
      $this->load->view('templates/apanel_header', $data);
      $this->load->view('apanel/users', $data);
      $this->load->view('templates/apanel_footer');
   }

   public function files(){
      if(!$this->session->userdata('logged_in')) {
         redirect('login');
      } else if(!($this->session->userdata('username') == "admin")) {
         show_error("You don't have access to this page", 403, "Forbidden");
         die();
      }
      $data['files'] = $this->file_model->get();

      $data['links'] = $this->apanel_model->nav_links();
      $data['title'] = 'Files';
      
      $this->load->view('templates/apanel_header', $data);
      $this->load->view('apanel/files', $data);
      $this->load->view('templates/apanel_footer');
   }

   public function feedbacks(){
      if(!$this->session->userdata('logged_in')) {
         redirect('login');
      } else if(!($this->session->userdata('username') == "admin")) {
         show_error("You don't have access to this page", 403, "Forbidden");
         die();
      }
      $data['feedbacks'] = $this->feedback_model->get();

      $data['links'] = $this->apanel_model->nav_links();
      $data['title'] = 'Feedbacks';
      
      $this->load->view('templates/apanel_header', $data);
      $this->load->view('apanel/feedbacks', $data);
      $this->load->view('templates/apanel_footer');
   }
}
?>