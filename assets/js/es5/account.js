'use strict';

var controller = function () {

    function setupEventListeners() {
        $(document).ready(function () {
            //backing up the address of original Image
            var originalImage = $('.user_image').attr('src');
            //when change button is clicked the file is triggered
            $('#change_image').click(function () {
                $('#userfile').trigger('click');
            });
            //triggered when file is submitted to check whether any file is selected
            $('#submitfile').click(function (e) {
                if ($('#userfile').val() == '') {
                    e.preventDefault();
                    showAlers($(".imageChange"), "Select an Image First!");
                }
            });
            //remove red border on value change
            $('#new-password').change(removeRed);
            $('#re-new-password').change(removeRed);
            //checking if new passwords are equal on submit
            $('.passwordChange').find('.submitBtn').click(function (e) {
                if ($('#new-password').val() != $('#re-new-password').val()) {
                    e.preventDefault();
                    showAlers($(".passwordChange"), 'The passwords you entered do not match!');
                    //changing the border to red
                    addRed($('#new-password'));
                    addRed($('#re-new-password'));
                }
            });
            //checking if the file selected is valid image file
            $('#userfile').change(function (event) {
                if (event.target.files && event.target.files[0]) {
                    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.ico|.gif)$/;
                    if (regex.test(event.target.files[0].name)) {
                        var reader = new FileReader();
                        //changing the image on screen by reading file
                        reader.onload = function (e) {
                            $('.user_image').attr('src', e.target.result);
                        };
                        reader.readAsDataURL(event.target.files[0]);
                    } else {
                        $('.user_image').attr('src', originalImage);
                        showAlers($(".imageChange"), "Only <strong>Image (jpg,png,gif,ico)</strong> files are supported.");
                    }
                }
            });
        });
    }

    //function to add class red to given element
    function addRed(e) {
        if (!$(e).hasClass('border-red')) {
            $(e).addClass('border-red');
        }
    }
    function removeRed(e) {
        if ($(e.target).hasClass('border-red')) {
            $(e.target).removeClass('border-red');
        }
    }

    //common function to display error alerts
    function showAlers(parent, message) {
        var alertDiv = '<div class="alert alert-danger alert-dismissable fade show" role="alert"></div>';
        var alertCloseBtn = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        var newDiv = $(alertDiv).append(message).append(alertCloseBtn);
        $(parent).find('.file-alerts').append(newDiv);
        window.setTimeout(function () {
            $(".alert").alert('close');
        }, 5000);
    }

    return {
        init: function init() {
            setupEventListeners();
        }
    };
}();
controller.init();
