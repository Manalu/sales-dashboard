<?php
    class Files extends CI_Controller {
        public function upload() {

            if(isset($_FILES['userfile'])) {

                $ext = explode(".", $_FILES['userfile']['name']);
                $ext = $ext[count($ext)-1];
                $newname = time();

                $config['upload_path'] = './user_files/sheets';
                $config['allowed_types'] = 'xlsx|xlx';
                $config['max_size'] = '50000';
                $config['file_name'] = $newname;
                $this->load->library('upload', $config);

                if($this->upload->do_upload()) {
                    $data = array('upload_data' => $this->upload->data());
                } else {
                    $errors = array('error'=> $this->upload->data());
                }
                $this->file_model->reset_defaults();
                $this->file_model->upload_file($newname.".".$ext, $ext);

            } else {
                show_error("You don't have access to this page", 403, "Forbidden");
                die();
            }
            
            
        }
        public function getdefault() {
            $lid = $this->session->userdata('user_id');
            $data['data'] = $this->file_model->get_default_file($lid);
            $this->load->view('templates/echojson', $data);
        }

        public function setdefault($id = null) {
            if($id) {
                $lid = $this->session->userdata('user_id');
                $this->file_model->set_default($id, $lid);
                redirect('dashboard');
            }
        }

        public function delete() {
            $id = $this->input->post('fileId');
            if($id) {
                $file_name = $this->file_model->delete_file($id);
                if($file_name) {
                    $cwd = getcwd(); // save the current working directory
                    $file_path = $cwd."\\user_files\\sheets\\";
                    chdir($file_path);
                    unlink($file_name);
                    chdir($cwd);
                    $this->load->view('templates/echoresponse', array("data" => "deleted"));
                } else {
                    $this->load->view('templates/echoresponse', array("data" => "failed"));
                }
            } else {
                show_error("You don't have access to this page", 403, "Forbidden");
                die();
            }
            
        }
        public function upload_json() {

            $this->form_validation->set_rules('userfile', 'User File', 'required');

            if($this->form_validation->run()) {

                $newname = time().'.json';
                
                $json_data = $this->input->post('userfile');

                $this->file_model->write_json_file($json_data, $newname);

            }
        }
    }
?>