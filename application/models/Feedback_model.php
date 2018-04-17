<?php
    class Feedback_model extends CI_Model{
       public function add() {
         $data = array(
             "subject" => $this->input->post("subject"),
             "message" => $this->input->post("message"),
             "type" => $this->input->post("type"),
             "lid" => $this->session->userdata('user_id')
          );
          $this->db->insert("feedbacks", $data);
          return ($this->db->affected_rows() >= 1) ? true : false;
       }

       public function delete($id = null) {
         $this->db->where("id", $id)->delete('feedbacks');
         return ($this->db->affected_rows() >= 1) ? true : false;
      }

       public function view($id = null) {
           if($id) {
               return $this->db->get_where("feedbacks", $lid);
           } else {
               return $this->db->get('feedbacks');;
           }
       }

       public function get($id = null) {
           if($id) {
               $this->db->set('read_flag', 1)->where('id', $id);
               $this->db->update('feedbacks');
               $this->db->join('user_details', "feedbacks.lid = user_details.lid");
               $query = $this->db->get_where('feedbacks', array("id" => $id));
               return $query->row_array();
           } else {
               $this->db->select('*')->from('feedbacks');
               $this->db->order_by('feedbacks.submit_time', 'desc');
               $this->db->join('login', "login.lid = feedbacks.lid");
               $this->db->join('user_details', "feedbacks.lid = user_details.lid");
               return $this->db->get()->result_array();
           }
       }

       public function get_stats() {
        $data['total'] = $this->db->count_all_results('feedbacks');

        $today_start = date('Y-m-d 00:00:00');
        $today_now = date('Y-m-d H:i:s');
        $today_end = date('Y-m-d 23:59:59');
        $start_of_month = date('Y-m-01 00:00:00');
        $days = (strtotime($today_now) - strtotime($start_of_month))/(60*60*24);

        $this->db->where('submit_time >=', $today_start);
        $data['submitted_today'] = $this->db->count_all_results('feedbacks');

        $this->db->where("submit_time>=", $start_of_month);
        $data['submitted_this_month'] = $this->db->count_all_results('feedbacks');

        $data['avg_day'] = number_format($data['submitted_this_month']/$days, 2);

        return $data;
       }
    }
?>
