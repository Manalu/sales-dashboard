<div class="upload">
    <form action="upload.php" class=" row m-2 px-5 pt-5 pb-0" id="upload_file">
        <div class="row w-100">
            <input type="file" id="userfile" hidden>
            <div class="input-group form-group col-xs-12">
                <span class="input-group-addon"><i class="glyphicon glyphicon-picture"></i></span>
                <input type="text" class="form-control input-box input-lg" disabled placeholder="Upload File">
                <span class="input-group-btn">
                <button class="browse btn btn-primary input-lg" type="button"><i class="glyphicon glyphicon-search"></i> Browse</button>
                </span>
            </div>
        </div>
        <div class="selectformats py-4 w-100">
            <div class="row w-100">
                <label for="dateformat" class="col-2 col-form-label" hidden>Date</label>
                <select class="col-5 form-control form-control-sm" name="dateformat" id="dateformat" hidden>
                    <option value="Short">MM/DD/YYYY</option>
                    <option value="Indian">DD/MM/YYYY</option>
                    <option value="ISO">YYYY-MM-DD</option>
                </select>
            </div>
            <div class="row headsselection w-100">
                <div class="form-group col p-2 salesheads">
                    <div class="row w-100">
                        <label for="%actualhead%" class="col-4 col-form-label">%headdesc%</label>
                        <select class="col-8 form-control" id="%actualhead%">
                            <option value="%tablehead%">%tablehead%</option>
                        </select>
                    </div>
                </div>
                <div class="col form-group p-2 productheads">
                    <div class="row w-100">
                        <label for="%actualhead%" class="col-4 col-form-label">%headdesc%</label>
                        <select class="col-8 form-control" name="%actualhead%" id="%actualhead%">
                            <option value="%tablehead%">%tablehead%</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row form-group w-100">
            
            <div class="col-sm text-center my-4" >
                <input type="submit" id="upload-btn" value="Upload" class="btn btn-primary btn-md">
            </div>
        </div>
        <div class="col mx-auto" id="file-alerts" style="max-width: 450px">
        </div>
        <div class="card row mx-2 information mx-auto bg-light">
            <div class="card-body">
            <p class="mx-auto">Upload your sales data as an Excel file here.<br>
            The sales transactions must be stored in a sheet called <strong>"Sales"</strong><br> and Product details must be stored in a sheet called <strong>"Products"</strong>.<br>
            Download the <a href="<?php echo base_url("user_files/sheets/sample.xlsx");?>">sample file</a> for reference.</p>
            </div>
        </div>
        
    </form>
<div class="row progress hidden w-25 mx-auto">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modaltitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title"></h5>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
            <a href="<?php echo base_url("dashboard/manage");?>"><button type="button" class="btn btn-primary" data-dismiss="modal">Manage Files</button></a>
            <a href="<?php echo base_url("dashboard/upload");?>"><button type="button" class="btn btn-primary" data-dismiss="modal">Upload New File</button></a>
        </div>
        </div>
    </div>
</div>