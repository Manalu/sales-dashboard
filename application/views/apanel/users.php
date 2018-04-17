<div class="container">
    <h2 class="my-4 ml-2 text-secondary"><?php echo $title; ?></h2>
    <table class="table table-striped table-bordered table-hover w-100" id="userlist" cellspacing="0" width="100%"
    data-page-length='10'>
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Email ID</th>
                <th scope="col">Contact No.</th>
                <th scope="col">Files</th>
                <th scope="col">Joined On</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $count = 1;
                foreach($users as $user) {
                ?>
                    <tr id="tr<?php echo $user['lid'];?>">
                        <th scope="row"><?php echo $count;?></th>
                        <td><?php echo $user['username']; ?></td>
                        <td><?php echo $user['fname']." ".$user['lname']; ?></td>
                        <td><a href="mailto:<?php echo $user['email']; ?>"><?php echo $user['email']; ?></a> </td>
                        <td><?php
                        if($user['contact_no']===NULL || $user['contact_no']==0) {
                            echo "Not Available";
                        } else {
                            echo $user['contact_no'];
                        }
                        ?></td>
                        <td><?php echo $user['files_count']; ?> </td>
                        <td><?php
                            $dateAndTime = explode(" ", $user['joined_time']);
                            $date = join("-", array_reverse(explode("-", $dateAndTime[0])));
                            echo $date.' '.$dateAndTime[1];
                        ?></td>

                    </tr>
                <?php
                $count++;
                }
                ?>
        </tbody>
    </table>
    <script>
        $('#userlist').DataTable({
                ordering: true,
                columnDefs: [
                    { "orderable": false, "targets": 0 }
                  ]
            });
    </script>
</div>