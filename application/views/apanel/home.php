<div class="container pb-5">
   <div class="d-flex flex-column user-stats mt-4">
      <div class="row">
         <a class="btn-link h2 d-inline text-dark stat-header mr-auto" href="<?php echo base_url("apanel/users"); ?>">Users</a>
      </div>
      <div class="row flex-wrap mt-2">
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $users_stats['total']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Total Users</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $users_stats['joined_today']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Users Joined Today</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $users_stats['joined_this_month']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Users Joined this Month</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $users_stats['avg_day']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Average New Users/Day</h6>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="d-flex flex-column file-stats mt-4">
      <div class="row">
         <a class="btn-link h2 d-inline text-dark stat-header mr-auto" href="<?php echo base_url("apanel/files"); ?>">Files</a>
      </div>
      <div class="row flex-wrap mt-2">
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $files_stats['total']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Total Files</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-2">
                  <?php echo $files_stats['total_size']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Total Space Used</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $files_stats['uploaded_today']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Files Uploaded Today</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $files_stats['uploaded_this_month']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Files Uploaded this Month</h6>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="d-flex flex-column feedback-stats mt-4">
      <div class="row">
         <a class="btn-link h2 d-inline text-dark stat-header mr-auto" href="<?php echo base_url("apanel/feedbacks"); ?>">Feedbacks</a>
      </div>
      <div class="row flex-wrap mt-2">
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $feedbacks_stats['total']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Total Feedbacks</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $feedbacks_stats['submitted_today']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">New Feedbacks Submitted Today</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $feedbacks_stats['submitted_this_month']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Feedbacks Submitted this Month</h6>
               </div>
            </div>
         </div>
         <div class="col-md-2 card bg-dark mr-auto my-2">
            <div class="card-body">
               <div class="h-75">
                  <h1 class="text-white text-center py-4">
                  <?php echo $feedbacks_stats['avg_day']; ?>
                  </h1>
               </div>
               <div class="h-25">
                  <h6 class="text-light-card text-center">Average Feedbacks Submitted/Day</h6>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>