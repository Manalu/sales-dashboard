<div class="container manage col-md p-4">
    <table class="table table-striped table-bordered table-hover w-100" id="filelist" cellspacing="0" width="100%"
    data-page-length='10'>
        <thead>
            <tr>
                <!-- <th scope="col">No.</th> -->
                <th scope="col">Uploaded Time</th>
                <th scope="col">File Format</th>
                <th scope="col">File Type</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $count = 1;
                foreach($file_list as $file) {
                ?>
                    <tr id="tr<?php echo $file['id'];?>">
                        <!-- <th scope="row"><?php echo $count;?></th> -->
                        <td>
                        <?php
                            $dateAndTime = explode(" ", $file['upload_time']);
                            $date = join("-", array_reverse(explode("-", $dateAndTime[0])));
                            echo $date.' '.$dateAndTime[1];
                        ?>
                        </td>
                        <td>
                            <?php
                            if(strcmp($file['fileformat'],"xlsx") == 0) {
                                echo "Microsoft Excel (xlsx)";
                            }
                            ?>
                        </td>
                        <td>
                            <?php
                            if(strcmp($file['filetype'],"salesFile") == 0) {
                                echo "Sales Data";
                            }
                            ?>
                        </td>
                        <td>
                            <a href="<?php echo base_url("files/setdefault/".$file['id']);?>">
                                <button type="button" class="btn btn-primary btn-sm mr-2">Analyze Data</button>
                            </a>
                            <button type="button" class="btn btn-danger btn-sm deletebtn">Delete</button>
                        </td>

                    </tr>
                <?php
                $count++;
                }
                ?>
        </tbody>
        
    </table>
    <div class="modal fade" id="modaldelete" tabindex="-1" role="dialog" aria-labelledby="modaltitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modaltitle">Confirmation</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" id="deletebtnmodal" class="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
    </div>
</div>