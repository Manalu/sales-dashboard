<div class="settings px-5 pt-3">
   <div class="row ml-1">
      <h2 class="h2 text-primary">Dashboard Settings</h2>
   </div>
    <?php echo form_open('dashboard/settings') ?>
      <div class="form-group mt-3 py-2">
         <label for="currency">Select Your Currency</label>
         <select id="currency" name="currency" class="form-control">
             <?php
             foreach ($currencies as $key => $value) {
                 $selected = $key === $settings['currency']? "selected": "";
             ?>
            <option value="<?php echo $key ?>" <?php echo $selected ?>>
                <?php echo ucfirst($key); ?> (<?php echo $value; ?>)
            </option>
            <?php
            }
            ?>
         </select>
         <div class="text-danger"><?php echo form_error('currency'); ?></div>
      </div>
      <div class="form-group mt-3 py-2">
         <label for="startpage">Select which page to go to after login</label>
         <select id="startpage" name="startpage" class="form-control">
             <?php
             foreach ($links as $key => $value) {
                $selected = $value === $settings['startpage']? "selected": "";
             ?>
            <option value="<?php echo $value ?>" <?php echo $selected ?>>
                <?php echo ucfirst($key); ?>
            </option>
            <?php
            }
            ?>
         </select>
         <div class="text-danger"><?php echo form_error('startpage'); ?></div>
      </div>
      <div class="form-group mt-3 py-2">
         <input type="submit" class="btn btn-primary" value="Save" style="width: 8vw;">
      </div>

   </form>
   <?php
      if($message = $this->session->flashdata('settings_success')) {
          $alert_type = "alert-success";
      } else if($message = $this->session->flashdata('settings_failed')) {
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
