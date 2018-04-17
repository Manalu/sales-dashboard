<?php
    class Users extends CI_Controller {

        public function login() {

            if($this->session->userdata('logged_in')) {
                redirect('dashboard');
            }

            $data['title'] = 'Login';

            $this->form_validation->set_rules('username','Username','required');
            $this->form_validation->set_rules('password','Password','required');

            if($this->form_validation->run() === false) {

                $this->load->view('templates/loginheader',$data);
                $this->load->view('users/login',$data);
                $this->load->view('templates/loginfooter');

            } else {

                $username = $this->input->post("username");
                $password = md5($this->input->post("password"));
                $user_id = $this->user_model->login($username, $password);

                if($user_id) {
                    $this->set_userdata($user_id,$username);
                    //redirect to admin panel if username==admin
                    if($username === "admin") {
                        redirect("apanel");
                    } else {
                        $settings =  $this->dashboard_model->get_settings();
                        redirect($settings['startpage']);
                    }
                } else {
                    $this->session->set_flashdata('login_failed','Username or Password is Incorrect!');
                    redirect('login');
                }
            }
        }
        public function register() {

            if($this->session->userdata('logged_in')) {
                redirect('dashboard');
            }

            $data['title'] = 'Register';

            $this->form_validation->set_rules('fname', 'First Name', 'required');
            $this->form_validation->set_rules('lname','Last Name', 'required|max_length[8]');
            $this->form_validation->set_rules('email','Email Address', 'required|callback_email_exists');
            $this->form_validation->set_rules('username', 'Username', 'required|callback_username_exists');
            $this->form_validation->set_rules('password','Password', 'required');
            $this->form_validation->set_rules('re-password','Retyped Password', 'required|callback_matches_password');

            if($this->form_validation->run() === false) {

                $this->load->view('templates/loginheader',$data);
                $this->load->view('users/register',$data);
                $this->load->view('templates/loginfooter');

            } else {

                $username = $this->input->post('username');
                $user_id = $this->user_model->add_user();
                $this->user_model->add_user_details($user_id);

                $this->set_userdata($user_id,$username);
                $this->dashboard_model->init_settings($user_id);
                redirect('dashboard/upload');
            }
        }

        public function logout() {
            $this->session->sess_destroy();
            redirect('login');
        }

        public function update_details() {
            $this->form_validation->set_rules('email','Email Address', 'required|callback_new_email_exists');

            if($this->form_validation->run()) {
                $success = $this->user_model->add_user_details($this->session->userdata('user_id'));
            }

            if(isset($success) && $success) {
                $this->session->set_flashdata('update_success', 'Changes Saved Succefully!');
            } else {
                $this->session->set_flashdata('update_failed', 'Save Failed!');
            }

            redirect('dashboard/account');
        }

        public function change_user_image() {

            if(isset($_FILES['userfile'])) {

                $ext = explode(".", $_FILES['userfile']['name']);
                $ext = $ext[count($ext)-1];
                $newname = $this->session->userdata('user_id');

                $config['upload_path'] = './user_files/profile_pic';
                $config['allowed_types'] = 'jpg|jpeg|png|gif|ico';
                $config['max_size'] = '50000';
                $config['file_name'] = $newname;
                $this->load->library('upload', $config);

                if($this->upload->do_upload()) {
                    $data = array('upload_data' => $this->upload->data());
                } else {
                    $errors = array('error'=> $this->upload->data());
                }
                $success = $this->user_model->change_user_image($newname.".".$ext);
            } else {
                show_error("You don't have access to this page", 403, "Forbidden");
                die();
            }

            if(isset($success) && $success) {
                $this->session->set_flashdata('update_success', 'Image Changed Succefully!');
            } else {
                $this->session->set_flashdata('update_failed', 'Image Change Failed!');
            }

            redirect('dashboard/account');
        }

        public function set_userdata($user_id, $username) {
            $user_data = array(
                'user_id' => $user_id,
                'username' => $username,
                'logged_in' => true
            );
            $this->session->set_userdata($user_data);
        }

        public function change_password() {
            $this->form_validation->set_rules('current-password','Current Password', 'required|callback_match_existing_password');
            if($this->form_validation->run()) {
                $lid = $this->session->userdata('user_id');
                $new_password = md5($this->input->post('new-password'));
                $success = $this->user_model->change_password($lid, $new_password);
                if($success) {
                    $this->session->set_flashdata('update_success', 'Password Changed Succefully!');
                } else {
                    $this->session->set_flashdata('update_failed', 'Password Change Failed!');
                }
            }  else {
                $this->session->set_flashdata('update_failed', 'Incorrect Password!');
            }


            redirect('dashboard/account');
        }

        public function username_exists($username) {
            return $this->user_model->username_exists($username);
        }

        public function email_exists($email) {
            return $this->user_model->email_exists($email);
        }

        public function new_email_exists($email) {
            return $this->user_model->new_email_exists($email);
        }

        public function update_image() {
            $this->db->replace('user_details',array('user_image' => $lid ));
        }

        public function matches_password($re_password) {
            $password = $this->input->post('password');
            return $password == $re_password;
        }

        public function match_existing_password($password) {
            $lid = $this->session->userdata('user_id');
            $res = strcmp(md5($password), $this->user_model->get_password($lid));
            return $res==0? true: false;
        }
    }

?>
