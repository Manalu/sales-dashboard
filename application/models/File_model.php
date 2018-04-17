<?php
class File_model extends CI_Model{
    public function upload_file($newname, $ext) {
        $data = array(
            'name' => $newname,
            'filetype' => 'salesFile',
            'fileformat' => $ext,
            'lid' => $this->session->userdata('user_id'),
            'default_flag' => 1
        );
        $this->db->insert('files', $data);
        $insert_id = $this->db->insert_id();

        $sales_heads = array_merge(
            json_decode($this->input->post('salesheads'), true),
            array("file_id" => $insert_id)
        );
        $this->db->insert('salesheads', $sales_heads);
        $product_heads = array_merge(
            json_decode($this->input->post('productheads'), true),
            array("file_id" => $insert_id)
        );
        $this->db->insert('productheads', $product_heads);

    }
    public function reset_defaults() {
        $this->db->set('default_flag', 0 , FALSE);
        $this->db->where('lid', $this->session->userdata('user_id'));
        $this->db->update('files');
    }

    public function set_default($id = null, $lid = null) {
        if($id) {
            $this->db->where('lid', $lid);
            $this->db->update('files', array('default_flag' => 0));
            $where_conditions = array(
                'lid' => $lid,
                'id' => $id
            );
        } else {
            $this->db->select_max('id');
            $max_id = $query = $this->db->get('files')->row()->id;
            $where_conditions = array(
                'lid' => $this->session->userdata('user_id'),
                'id' => $max_id
            );
        }
        $this->db->where($where_conditions);
        $this->db->update('files', array('default_flag' => 1));
    }

    public function get_default_file($lid) {
        $where_conditions = array(
            'lid' => $lid,
            'default_flag' => 1
        );
        $this->db->select('id, name');
        $query = $this->db->get_where('files', $where_conditions);
        if($query->num_rows()>0) {
            $id = $query->row()->id;
            $name = $query->row()->name;
            $this->db->reset_query();
            $salesheads = $this->db->get_where('salesheads', array('file_id' => $id))->row();
            $productheads = $this->db->get_where('productheads', array('file_id' => $id))->row();
            return array(
                "heads" => array(
                    "pdHeads" => $productheads,
                    "sHeads" =>$salesheads
                ),
                "fileName"=>$name,
            );
        } else {
            die(http_response_code(204));
        }
        
    }

    public function get($lid = null) {
        if($lid) {
            $this->db->select('upload_time, fileformat, id, filetype')->order_by('upload_time', 'desc');
            $query = $this->db->get_where('files', array('lid' => $lid));
            return $query->result_array();
        } else {
            $this->db->select('*')->order_by('upload_time', 'desc');
            $this->db->from('files');
            $this->db->join('login', "login.lid = files.lid");
            $result_array = $this->db->get()->result_array();
            for($index = 0; $index<sizeof($result_array); $index++) {
                $file = $result_array[$index];
                $file['file_size'] = human_filesize(filesize('./user_files/sheets/'.$file['name']));
                $result_array[$index] = $file;
            }
            return $result_array;
        }
    }

    public function delete_file($id) {

        $query = $this->db->get_where('files', array('id' => $id));
        $lid = $this->session->userdata('user_id');
        if($query->num_rows() > 0) {
            $file_name = $query->row()->name;
            $default_flag = $query->row()->default_flag;

            $this->db->delete('productheads', array('file_id' => $id));
            $this->db->delete('salesheads', array('file_id' => $id));

            $this->db->delete('files', array('id' => $id, 'lid' => $lid));

            if($default_flag == 1) {
                $this->set_default();
            }
            return $file_name;
        } else {
            return false;
        }
        
    }

    public function write_json_file($json_data, $file_name) {
        $path = './user_files/sheets/';
        if(write_file($path.$file_name, $json_data) ) {
            echo "Write complete";
        } else {
            echo "Write failed";
        }
    }

    public function get_stats() {
        $data['total'] = $this->db->count_all_results('files');

        $today_start = date('Y-m-d 00:00:00');
        $today_now = date('Y-m-d H:i:s');
        $start_of_month = date('Y-m-01 00:00:00');
        $days = (strtotime($today_now) - strtotime($start_of_month))/(60*60*24);

        $data['total_size'] = human_filesize(folder_size('./user_files/sheets'));

        $this->db->where('upload_time >=', $today_start);
        $data['uploaded_today'] = $this->db->count_all_results('files');

        $this->db->where(array("upload_time >=" => $start_of_month, "upload_time <=" => $today_now));
        $data['uploaded_this_month'] = $this->db->count_all_results('files');

        return $data;
       }

}
?>