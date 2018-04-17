<div class="container">
    <h2 class="my-4 ml-2 text-secondary"><?php echo $title; ?></h2>
    <table class="table table-striped table-bordered table-hover w-100" id="feedback_list" cellspacing="0" width="100%"
    data-page-length='10'>
        <thead>
            <tr>
                <th scope="col">Sender</th>
                <th scope="col">Subject</th>
                <th scope="col">Message</th>
                <th scope="col">Received</th>
                <th scope="col">Type</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $count = 1;
                foreach($feedbacks as $feedback) {
                    $read = "text-muted";
                    if(!$feedback['read_flag']) {
                        $read = "";
                    }
                ?>
                    
                    <tr id="tr<?php echo $feedback['id'];?>" class="<?php echo $read;?>">
                        <td><?php echo $feedback['username']; ?></td>
                        <td class="subject"><?php echo $feedback['subject']; ?></td>
                        <td class="message"><?php echo $feedback['message']; ?></td>
                        <td><?php echo $feedback['submit_time']; ?></td>
                        <td><?php echo ucfirst($feedback['type']); ?> </td>
                    </tr>
                <?php
                $count++;
                }
                ?>
        </tbody>
    </table>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger delete">Delete</button>
                <a class="btn btn-primary reply" href="">Reply</a>
            </div>
            </div>
        </div>
    </div>
    <script>
        function deleteFeedback(id) {
            $.ajax({
                type: "delete",
                url: "<?php echo base_url('feedback/delete/')?>" + id,
                success: function (response) {
                    console.log(response);
                    if(response == "success") {
                        deleteRow(id);
                    }
                }
            });
        }
        function deleteRow(id) {
            $('table').find('#tr' + id).remove();
            $('.modal').modal('hide');
        }
        function get_details(id) {
            $.ajax({
                type: "get",
                url: "<?php echo base_url('feedback/get/')?>" + id,
                dataType: "json",
                success: function (response) {
                    showModal(response);
                }
            });
        }
        function showModal(feedback) {
            $('.modal').find('.modal-title').text(feedback.subject);
            $('.modal-body').find('p').text(feedback.message);
            var mailto = "mailto:" + feedback.email + "?subject=Re:" + feedback.subject;
            $('.modal').find('.reply').attr("href", mailto);
            $('.modal').attr("id", "modal" + feedback.id);
            $('.modal').modal('show');
        }
        $('#feedback_list').DataTable();
        $('td').click(function(e) {
            $(e.target).parent().addClass("text-muted");
            var id = $(e.target).parent().attr('id').split('tr')[1];
            get_details(id);
        });
        $('.delete').click(function(e) {
            var id = $('.modal').attr('id').split('modal')[1];
            deleteFeedback(id);
        });
    </script>
</div>