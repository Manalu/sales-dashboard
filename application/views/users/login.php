<div class="row d-flex align-items-center h-100">
    <div class="col mx-auto card box px-5 py-3">
        <h3 class="text-center my-4" id="heading"><?php echo $title ?></h3>
        <div class="form-group">
            <?php
            $attributes = ["class" => "sign-in"];
            echo form_open('users/login', $attributes);
            ?>
                <div class="row">
                    <input type="text" name="username" class="col form-control control-lg my-2 " id="username" placeholder="Username" required>
                </div> 
                <div class="row">
                    <input type="password" name="password" class="col form-control control-lg my-3" id="password" placeholder="Password" required>
                </div>
                <?php
                    if($this->session->flashdata('login_failed')) {
                ?>
                    <p class="col text-center text-danger message"><?php echo $this->session->flashdata('login_failed'); ?></p>
                <?php
                    }
                ?>
                <div class="row my-2"><input type="submit" value="Login" class="btn btn-primary btn-md mx-auto w-25" id="login"></input></div>
            <?php echo form_close() ?>
        </div>
        <div class="row">
            <p class="col text-center" >Don't have an account? <a href="<?php echo base_url(); ?>register" id="sign-up-link"><strong>Register</strong></a></p>
        </div>
    </div>   
</div>