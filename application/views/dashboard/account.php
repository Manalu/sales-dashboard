<div class="account p-4">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true">
            Account Details
        </a>
        <a class="nav-item nav-link" id="nav-image-tab" data-toggle="tab" href="#nav-image" role="tab" aria-controls="nav-image" aria-selected="false">
            Profile Image
        </a>
        <a class="nav-item nav-link" id="nav-password-tab" data-toggle="tab" href="#nav-password" role="tab" aria-controls="nav-password" aria-selected="false">
            Change Password
        </a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane card fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div class="card-body detailsChange pt-2">
                <?php echo form_open('users/update_details', array('id' => 'user_details', 'class' => 'w-75 mx-auto')); ?>
                    <div class="row ml-0 my-4 text-center">
                        <h3 class="mx-auto">General Account Details</h3>
                    </div>
                    <div class="form-row form-group justify-content-between my-4">
                        <label for="fullName" class="col-3 col-form-label">Full Name</label>
                        <div id="fullName" class="col-9 px-0 d-flex justify-content-between">
                            <input type="text" class="col-md-4-9 form-control" value="<?php echo $user_details['fname']; ?>" name="fname" required autofocus>
                            <input type="text" class="col-md-4-9 form-control" value="<?php echo $user_details['lname']; ?>" name="lname" required>
                        </div>
                    </div>
                    <div class="form-row form-group justify-content-between my-4">
                        <label for="email" class="col-3 col-form-label">Email Address</label>
                        <input type="email" class="col-9 form-control" value="<?php echo $user_details['email']; ?>" id="email" name="email" required>
                        <?php if(form_error('email')) {
                        ?>
                        <div class="row text-danger"><?php echo form_error('email'); ?></div>
                        <?php
                        }
                        ?>
                    </div>
                    <div class="form-row form-group justify-content-between my-4">
                        <label for="username" class="col-3 col-form-label">Username</label>
                        <input type="text" class="col-9 form-control" id="username" value="<?php echo $user_details['username']; ?>" name="username"  data-toggle="tooltip" data-placement="top" title="You cannot change username" disabled>
                    </div>
                    <div class="form-row form-group justify-content-between my-4">
                        <label for="contact_no" class="col-3 col-form-label">Contact No.</label>
                        <input type="number" id="contact_no" class="col-9 form-control" value="<?php echo $user_details['contact_no']; ?>"  name="contact_no">
                    </div>
                    <div class="form-row form-group justify-content-around">
                        <input type="submit" class="btn btn-primary px-4" value="Save">
                    </div>
                </form>
                <?php
                 if($message = $this->session->flashdata('update_success')) {
                   $alert_type = "alert-success";
               } else if($message = $this->session->flashdata('update_failed')){
                   $alert_type = "alert-danger";
                 }
                 if(isset($message)) {
                 ?>
                     <div class="alert mt-2 h-75 <?php echo $alert_type; ?> alert-dismissible fade show" role="alert">
                      <?php echo $message; ?>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                      </button>
                     </div>
                 <?php
                 }
                 ?>
            </div>
        </div>
        <div class="tab-pane card fade" id="nav-image" role="tabpanel" aria-labelledby="nav-image-tab">
            <div class="card-body imageChange pt-2">
                <?php echo form_open_multipart('users/change_user_image') ?>
                    <div class="d-flex flex-column w-100 py-4">
                        <div class="row py-4 mx-auto">
                            <img class="user_image" src="<?php echo base_url("user_files/profile_pic/".$user_details['user_image']); ?>" alt="Profile Image">
                        </div>
                        <input type="file" id="userfile" name="userfile" value="Change Image" hidden>
                        <div class="row py-2 mx-auto">
                            <button type="button" class="btn btn-secondary" id="change_image" name="button">Change Image</button>
                        </div>
                        <div class="row mt-4 py-2 mx-auto">
                            <input type="submit" id="submitfile" class="btn btn-primary px-4" value="Save">
                        </div>
                    </div>
                </form>
                <div class="col mx-auto file-alerts" style="max-width: 450px">
                </div>
            </div>
        </div>

        <div class="tab-pane card fade" id="nav-password" role="tabpanel" aria-labelledby="nav-password-tab">
            <div class="card-body passwordChange pt-2">
                <?php echo form_open_multipart('users/change_password', array('id' => 'change_password', 'class' => 'w-75 mx-auto')); ?>
                    <div class="d-flex flex-column w-100 py-4">
                        <div class="form-row form-group justify-content-between my-3">
                            <label for="current-password" class="col-3 col-form-label">Current Password:</label>
                            <input type="password" class="col-9 form-control" id="current-password" name="current-password" required>
                        </div>
                        <div class="form-row form-group justify-content-between my-3">
                            <label for="new-password" class="col-3 col-form-label">New Password:</label>
                            <input type="password" class="col-9 form-control" id="new-password" name="new-password">
                        </div>
                        <div class="form-row form-group justify-content-between my-3">
                            <label for="re-new-password" class="col-3 col-form-label">Retype New Password:</label>
                            <input type="password" class="col-9 form-control" id="re-new-password" name="re-new-password" required>
                        </div>
                        <div class="form-row form-group justify-content-around my-3">
                            <input type="submit" class="btn btn-primary submitBtn px-4" value="Change Password" required>
                        </div>
                    </div>
                </form>
                <div class="col mx-auto file-alerts" style="max-width: 450px">
                </div>
            </div>
        </div>
    </div>
</div>
