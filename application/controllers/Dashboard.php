<?php
    class Dashboard extends CI_Controller {

        var $es5_flag = false;

        public function view($page = "home") {
            if(!file_exists(APPPATH.'views/dashboard/'.$page.'php')) {
                show_404();
            }
        }
        public function home() {

            $es5_flag = true;
            if(!$this->session->userdata('logged_in')) {
                redirect('login');
            }

            $libraries = $this->dashboard_model->get_libraries();
            $modules = $this->dashboard_model->get_modules();

            $data['title'] = "Business Dashboard";
            $data['links'] = $this->dashboard_model->nav_links();
            $user_id = $this->session->userdata('user_id');
            $data['fullname'] = $this->user_model->get_fullname($user_id);;
            $data['user_image'] = $this->user_model->get_user_image($user_id);
            $data['es5_flag'] = $this->es5_flag;

            $data['libraries'] = elements(array('dataTableJQ','dataTableBS4', 'ChartJS', 'dateFormat', 'xlsx'), $libraries);
            $data['modules'] = elements(array('analyzer', 'ui', 'excel', 'dashboard'), $modules);

            $settings =  $this->dashboard_model->get_settings();
            $data['currency'] = $this->dashboard_model->get_currencies($settings['currency']);

            $this->load->view('templates/dashboard_header', $data);
            $this->load->view('dashboard/home', $data);
            $this->load->view('templates/dashboard_footer');

        }

        public function upload() {

            $data['es5_flag'] = $this->es5_flag;

            if(!$this->session->userdata('logged_in')) {
                redirect('login');
            }

            $libraries = $this->dashboard_model->get_libraries();
            $modules = $this->dashboard_model->get_modules();

            $data['title'] = "Upload Files";
            $data['links'] = $this->dashboard_model->nav_links();
            $user_id = $this->session->userdata('user_id');
            $data['fullname'] = $this->user_model->get_fullname($user_id);;
            $data['user_image'] = $this->user_model->get_user_image($user_id);

            $data['libraries'] = elements(array('xlsx'), $libraries);
            $data['modules'] = elements(array('analyzer', 'ui', 'excel', 'upload'), $modules);

            $this->load->view('templates/dashboard_header', $data);
            $this->load->view('dashboard/upload', $data);
            $this->load->view('templates/dashboard_footer');
        }

        public function manage() {

            $data['es5_flag'] = $this->es5_flag;

            if(!$this->session->userdata('logged_in')) {
                redirect('login');
            }

            $libraries = $this->dashboard_model->get_libraries();
            $modules = $this->dashboard_model->get_modules();

            $data['title'] = "Manage Files";
            $data['links'] = $this->dashboard_model->nav_links();
            $user_id = $this->session->userdata('user_id');
            $data['fullname'] = $this->user_model->get_fullname($user_id);;
            $data['user_image'] = $this->user_model->get_user_image($user_id);

            $data['libraries'] = elements(array('dataTableJQ','dataTableBS4'), $libraries);
            $data['modules'] = elements(array('ui', 'manage'), $modules);

            $data['file_list'] = $this->file_model->get($user_id);

            $this->load->view('templates/dashboard_header', $data);
            $this->load->view('dashboard/manage', $data);
            $this->load->view('templates/dashboard_footer');
        }

        public function feedback() {

            $data['es5_flag'] = $this->es5_flag;

            if(!$this->session->userdata('logged_in')) {
                redirect('login');
            }

            $data['title'] = "Send Feedback";
            $data['links'] = $this->dashboard_model->nav_links();
            $user_id = $this->session->userdata('user_id');
            $data['fullname'] = $this->user_model->get_fullname($user_id);;
            $data['user_image'] = $this->user_model->get_user_image($user_id);

            $this->load->view('templates/dashboard_header', $data);
            $this->load->view('dashboard/feedback', $data);
            $this->load->view('templates/dashboard_footer');
        }

        public function settings() {

            $data['es5_flag'] = $this->es5_flag;

            if(!$this->session->userdata('logged_in')) {
                redirect('login');
            }

            $this->form_validation->set_rules('currency', 'Currency', 'required');
            $this->form_validation->set_rules('startpage','Start Page', 'required');

            if($this->form_validation->run()) {
                $success = $this->dashboard_model->set_settings();
                if($success) {
                    $this->session->set_flashdata('settings_success', "Settings Saved!");
                } else {
                    $this->session->set_flashdata('settings_failed', "Failed to Save Settings!");
                }
            }
            $data['title'] = "Dashboard Settings";
            $data['links'] = $this->dashboard_model->nav_links();
            $user_id = $this->session->userdata('user_id');
            $data['fullname'] = $this->user_model->get_fullname($user_id);;
            $data['user_image'] = $this->user_model->get_user_image($user_id);
            $data['currencies'] = $this->dashboard_model->get_currencies();
            $data['links'] = $this->dashboard_model->nav_links();
            $data['settings'] =  $this->dashboard_model->get_settings();

            $this->load->view('templates/dashboard_header', $data);
            $this->load->view('dashboard/settings', $data);
            $this->load->view('templates/dashboard_footer');
        }

        public function account() {

            $data['es5_flag'] = $this->es5_flag;

            if(!$this->session->userdata('logged_in')) {
                redirect('login');
            }
            $modules = $this->dashboard_model->get_modules();
            $data['modules'] = elements(array('account'), $modules);

            $data['title'] = "Account Settings";
            $data['links'] = $this->dashboard_model->nav_links();
            $user_id = $this->session->userdata('user_id');
            $data['fullname'] = $this->user_model->get_fullname($user_id);;
            $data['user_image'] = $this->user_model->get_user_image($user_id);
            $data['user_details'] = $this->user_model->get($user_id);

            $this->load->view('templates/dashboard_header', $data);
            $this->load->view('dashboard/account', $data);
            $this->load->view('templates/dashboard_footer');
        }
    }

?>
