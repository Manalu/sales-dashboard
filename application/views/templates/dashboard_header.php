<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $title; ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="<?php echo base_url();?>assets/libs/fontAwesome.js"></script>
        <script src="<?php echo base_url();?>assets/libs/jquery.min.js"></script>
        <link rel="stylesheet" href="<?php echo base_url();?>assets/libs/bootstrap.min.css">
        <script src="<?php echo base_url();?>assets/libs/popper.min.js"></script>
        <script src="<?php echo base_url();?>assets/libs/bootstrap.min.js"></script>
        <link rel="stylesheet" href="<?php echo base_url("assets/css/dashboard.css");?>">
        <link rel="stylesheet" href="<?php echo base_url("assets/css/dataTables.bootstrap4.min.css");?>">
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
        <?php
            if(isset($libraries)) {
                foreach($libraries as $library=>$location) {
        ?>
            <script src="<?php echo base_url("assets/".$location); ?>"></script>
        <?php
                }
            }
        ?>

        <?php
            if($es5_flag) {
                $addOn =  "es5/";
            }
            else {
                $addOn =  "";
            }
            if(isset($modules)) {
                foreach($modules as $module=>$location) {
        ?>
            <script src="<?php echo base_url("assets/js/".$addOn.$location); ?>"></script>
        <?php
                }
            }
        ?>
    </head>
    <body>
        <div class="container-fluid d-flex flex-column h-100">
            <div class="row color-tone top-bar py-2">
                <div class="col-md-2 logo text-center">
                    <a href="<?php echo base_url("dashboard"); ?>" class="logo-text "><h2>Dashboard</h2></a>
                </div>
                <div class="col-sm-10">
                    <div class="btn-group float-right">
                        <a href="<?php echo base_url('dashboard/account'); ?>"><button type="button" class="btn bg-white">My Account</button></a>
                        <button type="button" class="btn bg-white dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="<?php echo base_url('dashboard/settings'); ?>">Settings</a>
                            <a class="dropdown-item" href="<?php echo base_url('users/logout'); ?>">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row h-100">
                <nav class="container-fluid col-md-2 left-side d-flex flex-column color-tone px-2">
                    <div class="user-info text-white text-center pt-5">
                        <img src="<?php echo base_url("user_files/profile_pic/".$user_image); ?>" class="avatar" width="100px">
                        <p class="my-3 username"> <?php echo $fullname; ?> </p>
                    </div>

                    <div class="nav list-group mb-4">
                    <?php
                        foreach($links as $key => $value) {
                            $active = "";
                            if(uri_string() == $value) {
                                $active = " active";
                            }
                    ?>
                            <a href="<?php echo base_url($value); ?>" class="list-group-item list-group-item-action<?php echo $active; ?> p-3">
                            <?php echo $key; ?>
                            </a>
                    <?php
                        }
                    ?>
                    </div>
                </nav>
                <div class="container col-md-10 mt-3 right-side scroll">
