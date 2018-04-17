"use strict";

var controller = function (UICtrl) {
    var deleteURL = 'http://localhost/sales-dashboard/files/delete';
    var DStrings = UICtrl.getDStrings();
    var selectedFileID;
    function deleteFile(fileID) {
        $.post(deleteURL, { fileId: fileID }, function (data, textStatus, jqXHR) {
            if (data === "deleted") {
                UICtrl.removeTableRow("tr" + selectedFileID);
                initForm();
            } else {
                console.log(textStatus + data);
            }
        }, "text");
    }
    function setupEventListeners() {
        $(document).ready(function () {
            $('#filelist').DataTable({
                ordering: true,
                columnDefs: [{ "orderable": false, "targets": 0 }]
            });
            $('.' + DStrings.deleteBtn).click(function (e) {
                selectedFileID = $(e.target).parent().parent().attr("id").replace('tr', '');
                $('#' + DStrings.modalDelete).modal('show');
            });
            $('#' + DStrings.deleteBtnModal).click(function () {
                var j = $('.' + DStrings.deleteBtn);
                $('#' + DStrings.modalDelete).modal('hide');
                deleteFile(selectedFileID);
            });
        });
    }

    function initForm() {
        selectedFileID = null;
    }

    return {
        init: function init() {
            initForm();
            setupEventListeners();
        }
    };
}(UIController);

controller.init();
