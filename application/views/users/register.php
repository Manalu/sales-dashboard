<div class="row d-flex align-items-center h-100">
    <div class="col mx-auto card box px-5 py-2">
        <h3 class="text-center my-4" id="heading"><?php echo $title ?></h3>
        <div class="form-group">
            <?php
                $attributes = ["class" => "sign-in"];
                echo form_open('register', $attributes);
            ?>
                <div class="row">
                    <input type="text" class="col form-control control-lg my-2" value="<?php echo set_value('fname'); ?>" name="fname" placeholder="First Name" required autofocus>
                    <input type="text" class="col form-control control-lg my-2 ml-2" value="<?php echo set_value('lname'); ?>" name="lname" placeholder="Last Name" required>
                </div>
                <div class="row">
                    <input type="email" class="col form-control control-lg my-2" name="email" placeholder="Email Address" required>

                </div>
                <div class="text-danger"><?php echo form_error('email'); ?></div>

                <div class="row">
                    <input type="text" class="col form-control control-lg my-2" value="<?php echo set_value('username'); ?>" name="username" placeholder="Username" required>

                </div>
                <div class="text-danger"><?php echo form_error('username'); ?></div>

                <div class="row">
                    <input type="password" class="col form-control control-lg my-2" name="password" placeholder="Password" required>
                </div>
                <div class="row">
                    <input type="password" class="col form-control control-lg my-2" name="re-password" placeholder="Retype Password" required>
                </div>
                <div class="text-danger"><?php echo form_error('re-password'); ?></div>
                <div class="row">
                    <input type="number" class="col form-control control-lg my-2" name="contact_no" placeholder="Contact Number">
                </div>
                <div class="row mt-3">
                    <input type="submit" class="btn btn-primary btn-md mx-auto w-25" name="register" style="min-width: 80px;" value="Submit">
                </div>
            <?php echo form_close() ?>
        </div>
        <div class="row mb-3">
            <p class="col text-center" >Already have account? <a href="<?php echo base_url(); ?>" id="sign-up-link"><strong>Login</strong></a></p>
        </div>
    </div>
</div>
<script type="text/javascript">

</script>
