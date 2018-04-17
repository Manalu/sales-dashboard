<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <script src="<?php echo base_url();?>assets/libs/jquery.min.js"></script>
   <link rel="stylesheet" href="<?php echo base_url();?>assets/libs/bootstrap.min.css">
   <script src="<?php echo base_url();?>assets/libs/popper.min.js"></script>
   <script src="<?php echo base_url();?>assets/libs/bootstrap.min.js"></script>
   <link rel="stylesheet" href="<?php echo base_url("assets/css/apanel.css");?>">
   <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
   <link rel="stylesheet" href="<?php echo base_url("assets/css/dataTables.bootstrap4.min.css");?>">
   <script src="<?php echo base_url("assets/libs/jquery.dataTables.min.js");?>"></script>
   <script src="<?php echo base_url("assets/libs/dataTables.bootstrap4.min.js");?>"></script>
   <title><?php echo $title; ?></title>
</head>
<body class="h-100">
   <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="<?php echo base_url("apanel");?>">Admin Panel</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav mr-auto">
            <?php
            foreach($links as $link) {
               $active = "";
               if(uri_string() == $link["link"]) {
                  $active = " active";
               }
            ?>
               <li class="nav-item <?php echo $active; ?>">
                  <a class="nav-link" href="<?php echo base_url($link["link"]); ?>">
                  <?php echo $link["name"]; ?> <span class="sr-only">(current)</span></a>
               </li>
            <?php
            }
            ?>
         </ul>
         <a href="<?php echo base_url("users/logout");?>" class="btn btn-link text-white">
            Logout
         </a>
      </div>
   </nav>