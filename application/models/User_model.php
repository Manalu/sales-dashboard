<?php
class User_model extends CI_Model{
    public function login($username, $password) {
        $this->db->where('username', $username);
        $this->db->where('password', $password);

        $result = $this->db->get("login");

        if($result->num_rows() == 1) {
            return $result->row(0)->lid;
        } else {
            return false;
        }
    }
    public function get($lid = null) {
        $this->db->select('*');
        $this->db->from('login');
        $this->db->join('user_details', "login.lid = user_details.lid");
        if($lid) {
            $this->db->where('login.lid', $lid);
            return $this->db->get()->row_array();
        } else {
            $this->db->where_not_in('login.lid', 1);
            $this->db->order_by('login.joined_time', 'desc');
            $result_array = $this->db->get()->result_array();
            for($index = 0; $index<sizeof($result_array); $index++) {
                $user = $result_array[$index];
                $user['files_count'] = sizeof($this->file_model->get($user['lid']));
                $result_array[$index] = $user;
            }
            return $result_array;
        }

    }
    public function add_user() {
        $data = array(
            'username' => $this->input->post('username'),
            "password" => md5($this->input->post('password')),
        );
        $this->db->insert("login", $data);

        return $this->db->insert_id();
    }

    public function add_user_details($lid) {
        $data = array(
            "fname" => $this->input->post('fname'),
            "lname" => $this->input->post('lname'),
            "email" => $this->input->post('email'),
            "lid" => $lid,
            "contact_no" => $this->input->post('contact_no')
        );
        $this->db->replace("user_details", $data);
        return ($this->db->affected_rows() >= 1) ? true : false;
    }
    public function username_exists($username) {
        $this->db->where('username', $username);
        $result = $this->db->get('login');
        if($result->num_rows() == 0) {
            return true;
        } else {
            return false;
        }
    }
    public function email_exists($email) {
        $this->db->where('email', $email);
        $this->db->from('user_details');
        if($this->db->count_all_results() == 0) {
            return true;
        } else {
            return false;
        }
    }
    public function new_email_exists($email) {
        $this->db->where('email', $email);
        $this->db->where_not_in('lid', $this->session->userdata('user_id'));
        $this->db->from('user_details');
        if($this->db->count_all_results() == 0) {
            return true;
        } else {
            return false;
        }
    }

    public function get_password($lid) {
        $this->db->select('password');
        $query = $this->db->get_where('login', array('lid' => $lid));
        return $query->row_array()['password'];
    }

    public function change_password($lid, $new_password) {
        $this->db->set('password', $new_password)->where('lid', $lid);
        $this->db->update('login');
        return ($this->db->affected_rows() >= 1) ? true : false;
    }

    public function get_fullname($lid) {
        $this->db->select('fname, lname');
        $this->db->where('lid', $lid);
        $query = $this->db->get('user_details');
        return join(" ", $query->row_array());

    }

    public function get_user_image($lid) {
        $this->db->select('user_image');
        $this->db->where('lid', $lid);
        $result = $this->db->get('user_details');
        return $result->row()->user_image;
    }

    public function get_stats() {
        $data['total'] = $this->db->count_all_results('login')-1;

        $today_start = date('Y-m-d 00:00:00');
        $today_now = date('Y-m-d H:i:s');
        $start_of_month = date('Y-m-01 00:00:00');
        $days = (strtotime($today_now) - strtotime($start_of_month))/(60*60*24);

        $this->db->where(array('joined_time >='=> $today_start, 'username <>' => 'admin'));
        $data['joined_today'] = $this->db->count_all_results('login');

        $this->db->reset_query();
        $this->db->where(array('joined_time >=' => $start_of_month, 'username <>' => 'admin'));
        $data['joined_this_month'] = $this->db->count_all_results('login');

        $data['avg_day'] = number_format($data['joined_this_month']/$days, 2);

        return $data;
    }
    public function change_user_image($file_name) {
        $this->db->set('user_image', $file_name);
        $this->db->where('lid', $this->session->userdata('user_id'));
        $this->db->update('user_details');
        return ($this->db->affected_rows() >= 1) ? true : false;
    }
}
?>
