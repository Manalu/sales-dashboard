<?php
class Dashboard_model extends CI_Model{
    public function nav_links() {
        return array(
            "Sales Analysis" => "dashboard",
            "Data Upload" => "dashboard/upload",
            "Manage Data" => "dashboard/manage",
            "Account Settings" => "dashboard/account",
            "Dashboard Settings" => "dashboard/settings",
            "Send Feedback" => "dashboard/feedback",
            );
    }
    public function get_currencies($currency = null) {
        $currencies = array(
            "Rupee" => "₹",
            "Dollar" => "$",
            "Euro" => "€",
            "Pound" => "£",
            "Japanese yen" => "¥",
            "Renminbi" => "元",
            "Australian dollar" => "A$",
            "Singapore dollar" => "S$",
            );
        return $currency? $currencies[$currency]: $currencies;
    }
    public function get_libraries() {
        return array(
            "dataTableJQ" => "libs/jquery.dataTables.min.js",
            "dataTableBS4" => "libs/dataTables.bootstrap4.min.js",
            "ChartJS" => "libs/Chart.js",
            "xlsx" => "libs/xlsx.full.min.js",
            "dateFormat" => "libs/date.format.js"
        );
    }

    public function get_modules() {
        return array(
            "analyzer" => "analyzer.js",
            "ui" => "ui.js",
            "excel" => "excel.js",
            "dashboard" => "dashboard.js",
            "upload" => "upload.js",
            "manage" => "manage.js",
            "account" => "account.js"
        );
    }
    public function init_settings($lid) {
        $this->db->insert('settings', array('lid' => $lid ));
    }
    public function set_settings() {
        $data = array(
            'lid' => $this->session->userdata('user_id'),
            'currency' => $this->input->post('currency'),
            'startpage' => $this->input->post('startpage')
        );
        $this->db->replace("settings", $data);
        return ($this->db->affected_rows() >= 1) ? true : false;
    }
    public function get_settings() {
        $lid = $this->session->userdata('user_id');
        $settings = array('startpage' => 'dashboard', 'currency' => 'Rupee');
        $query = $this->db->get_where('settings', array('lid' => $lid ));
        if($query->num_rows()) $settings = $query->row_array();
        return $settings;
    }
}
?>
