<?php
class Feedback extends CI_Controller{
   public function create() {
     $this->form_validation->set_rules('subject', 'Subject', 'required');
     $this->form_validation->set_rules('message','Message', 'required');
     if($this->form_validation->run()) {
       $success = $this->feedback_model->add();
       //checking if insert was successful
       if($success) {
          $this->session->set_flashdata('submit_success','Feedback Submitted Successfully!');
          redirect('dashboard/feedback');
       }
     }
     $this->session->set_flashdata('submit_failed','Feedback Submission Failed. Try Again!');
     redirect('dashboard/feedback');
   }

   public function delete($id = null) {
      if($id) {
         $success = $this->feedback_model->delete($id);
         if($success) {
            $data['data'] = "success";
            $this->load->view('templates/echoresponse', $data);
         }
      }
   }
   public function get($id = null) {
      if($id) {
         $data['data'] = $this->feedback_model->get($id);
         $this->load->view('templates/echojson', $data);
      }
   }
}
?>
