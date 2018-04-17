var controller = (function(UICtrl,excelCtrl) {
    var fileSelected, uploadClicked;
    var jsonFormData = new FormData();
    var DOM = UICtrl.getDStrings();
    function xlsxCheck(name) {
        var xlsxflag = false;
        if (name.toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        return xlsxflag;
    }

    function initForm() {
        UICtrl.headOps.clearHeadDiv();
        UICtrl.headOps.selectGroups = null;
        UICtrl.headOps.repeatFlag = null;
        fileSelected = false;
        uploadClicked = false;
        UICtrl.headOps.resetForm();
    }

    function uploadFile(formData) {

        var uploadURL = "http://localhost/sales-dashboard/files/upload";

        var upload = new XMLHttpRequest();
        $.ajax({
            xhr: function()
            {
                var xhr = new XMLHttpRequest();
                xhr.upload.onprogress = function(event) {
                    UICtrl.fileAlerts.uploadProgress(event.loaded/event.total * 100);
                }
                return xhr;
            },
            type: 'POST',
            url: uploadURL,
            data: formData,
            // data: jsonFormData,
            contentType: false,
            processData: false,
            success: function(){
                initForm();
            },
            error: function(...status) {
                console.log(status);
                UICtrl.fileAlerts.uploadFailed();
            }
          });

    }
    function setupEventListeners() {
        $(document).ready(function() {
            var inputFile = $('#' + DOM.inputFile);
            $('.browse').click(function() {
                inputFile.trigger('click');
            });
            inputFile.change(function() {
                $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
                var re = /(?:\.([^.]+))?$/;
                var file = inputFile[0].files[0];
                var ext = re.exec(file.name)[1].toLowerCase();
                if(ext =='xls' || ext == 'xlsx') {
                    excelCtrl.parseData(file, 'salesFile',xlsxCheck(file.name), true)
                    .then(function(tableHeads) {
                            UICtrl.headOps.displayHeads('salesFile',excelCtrl.getSalesHeads(), tableHeads);
                            $(".information").hide();
                        }
                    )
                    .catch(function(message) {
                        console.log(message)
                    });
                    fileSelected = true;
                } else {
                    UICtrl.fileAlerts.invalidType();
                }
            });
            $('#' + DOM.uploadBtn).click(function(event) {
                uploadClicked = true;
                event.preventDefault();
                var headOps = UICtrl.headOps;
                if(fileSelected) {
                    if(headOps.repeatedValues()) {
                        return;
                    }
                    var formData = headOps.getFormData();
                    var heads = {
                        pdHeads: JSON.parse(formData.get("productheads")),
                        sHeads: JSON.parse(formData.get("salesheads"))
                    };
                    excelCtrl.initHeads(heads, "salesFile");
                    excelCtrl.buildTable().then(function() {
                        uploadFile(formData);
                    })
                    .catch((e) => {
                        console.log(e);
                        UICtrl.fileAlerts.parseFailed(true);
                    });
                } else {
                    UICtrl.fileAlerts.notSelected();
                }
            });
            $("." + DOM.headsselection).change(function(event) {
                if(uploadClicked) {
                    UICtrl.headOps.markRepeated();
                }
            });

        });
    }

    return {
        init: function() {
            setupEventListeners();
            initForm();
        },

        initFormData: function(sheets) {
            jsonFormData.append('userfile', JSON.stringify(sheets));
        }
    };
}
)(UIController,excelController);

controller.init();
