<div class="container">
    <h2 class="my-4 ml-2 text-secondary"><?php echo $title; ?></h2>
    <table class="table table-striped table-bordered table-hover w-100" id="filelist" cellspacing="0" width="100%"
    data-page-length='10'>
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">File Type</th>
                <th scope="col">Format</th>
                <th scope="col">Uploaded By</th>
                <th scope="col">Uploaded On</th>
                <th scope="col">Size</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $count = 1;
                foreach($files as $file) {
                ?>
                    <tr id="tr<?php echo $file['id'];?>">
                        <th scope="row"><?php echo $count;?></th>
                        <td><?php
                        if($file['filetype'] === "salesFile") {
                            echo "Sales File";
                        }
                        ?></td>
                        <td><?php echo $file['fileformat']; ?></td>
                        <td><?php echo $file['username']; ?> </td>
                        <td><?php
                        $dateAndTime = explode(" ", $file['upload_time']);
                        $date = join("-", array_reverse(explode("-", $dateAndTime[0])));
                        echo $date.' '.$dateAndTime[1]; 
                        ?></td>
                        <td><?php echo $file['file_size']; ?> </td>

                    </tr>
                <?php
                $count++;
                }
                ?>
        </tbody>
    </table>
    <script>
        $('#filelist').DataTable({
                ordering: true,
            });
    </script>
</div>