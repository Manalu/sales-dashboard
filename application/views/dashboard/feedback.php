<div class="container feedback col-md p-4">
   <h2 class="mb-3 text-primary">Send Feeback</h2>
   <?php
   echo form_open('feedback/create');
   ?>
   <div class="form-group">
      <label for="feedbacktype">Type of Message</label>
      <select class="form-control" id="type" name="type">
         <option value="suggestion">Suggestion</option>
         <option value="bug">Bug</option>
      </select>
   </div>
   <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" class="form-control" id="subject" name="subject" maxlength="200" placeholder="Enter the Subject here" required>
   </div>
   <div class="form-group">
      <label for="message">Message</label>
      <textarea class="form-control" id="message" name="message" placeholder="Describe in detail..." rows="6" minlength="20" required></textarea>
   </div>
   <input type="submit" class="btn btn-submit btn-primary" value="Submit">
   </form>
   <?php
    if($message = $this->session->flashdata('submit_success')) {
      $alert_type = "alert-success";
    } else if($message = $this->session->flashdata('submit_failed')){
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
