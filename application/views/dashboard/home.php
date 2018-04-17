<style rel="stylesheet">
.currency-sign::before{
    content: "<?php echo $currency; ?>";
}
</style>
<script type="text/javascript">
    var currency = "<?php echo $currency; ?>";
</script>
<div class="home hidden">
    <div class="row mx-2 mt-2 flex-wrap basicstats">
        <div class="card col-md mx-2 my-2 totalproducts">
            <div class="card-body inline-flex py-3">
                <h1 class="mr-3"><i class="fas fa-shopping-bag text-secondary"></i></h1>
                <div class="card-data">
                    <h5 class="cardheads">Products</h5>
                    <h6 class="cardvalue"></h6>
                </div>

            </div>
        </div>

        <div class="card col-md mx-2 my-2 totalsales">
            <div class="card-body inline-flex py-3">
                <h1 class="mr-3"><i class="fas fa-shopping-cart text-danger"></i></h1>
                <div class="card-data">
                    <h5 class="cardheads">Sales</h5>
                    <h6 class="cardvalue" id=""></h6>
                </div>
            </div>
        </div>
        <div class="card col-md mx-2 my-2 totalrevenue">
            <div class="card-body py-3 inline-flex">
                <h1 class="mr-3"><i class="fas fa-money-bill-alt text-warning"></i></h1>
                <div class="card-data">
                    <h5 class="cardheads">Reveneue</h5>
                    <div class="currency">
                        <h6 class="currency-sign inline-flex cardvalue"></h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="card col-md mx-2 my-2 topsold">
            <div class="card-body inline-flex py-3">
                <h1 class="mr-3"><i class="fas fa-level-up-alt text-success"></i></h1>
                <div class="card-data">
                    <h5 class="cardheads">Top Product</h5>
                    <h6 class="cardvalue" id=""></h6>
                </div>
            </div>
        </div>
    </div>
    <div class="row mx-3 advancedStats">
        <div class="col-md-12 card p-0 mr-2 my-2 yearlyStats">
            <div class="card-body row py-3">
                <div class="row w-100 py-2">
                    <div class="col-md-9 justify-content-center btn-group btn-group-toggle mx-auto dataToggle" data-toggle="buttons">
                        <label class="btn btn-sm btn-light active">
                            <input type="radio" name="options" id="revenue" autocomplete="off" checked>Revenue
                        </label>
                        <label class="btn btn-sm btn-light">
                            <input type="radio" name="options" id="sales" autocomplete="off">Sales
                        </label>
                    </div>
                    <div class="col-md-3 justify-content-center btn-group btn-group-toggle yearBtns flex-wrap" data-toggle="buttons">
                    </div>
                </div>
                <div class="col-md-9">

                    <div class="row">
                        <div class="col chart">
                            <div class="spinner">
                                <div class="bounce1"></div>
                                <div class="bounce2"></div>
                                <div class="bounce3"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 datasection d-flex flex-column justify-content-around">
                    <div class="chartinfo d-flex flex-column m-auto">
                        <!-- chart info here -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row mx-0">
            <div class="col-md mr-1 card my-2 categoryStats">
                <div class="card-body row py-3 px-0">
                    <div class="row w-75 py-2">
                        <!-- toggle button for revenue/sales -->
                        <div class="btn-group btn-group-toggle mx-auto dataToggle" data-toggle="buttons">
                            <label class="btn btn-sm btn-light active">
                                <input type="radio" name="options" id="revenue" autocomplete="off" checked>Revenue
                            </label>
                            <label class="btn btn-sm btn-light">
                                <input type="radio" name="options" id="sales" autocomplete="off">Sales
                            </label>
                        </div>
                    </div>
                    <div class="col-md-9">

                        <div class="row">
                            <div class="col chart">
                                <div class="spinner">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 my-auto pl-0 datasection">
                        <div class="chartinfo m-auto pr-3">
                            <!-- chart info here -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md ml-1 card my-2 monthdayStats">
                <div class="card-body row py-3 px-0">
                    <div class="row w-100 py-2">
                        <div class="col-9 h-25 text-center">
                        <div class="btn-group btn-group-toggle dataToggle" data-toggle="buttons">
                            <label class="btn btn-sm btn-light active">
                                <input type="radio" name="options" id="revenue" autocomplete="off" checked>Revenue
                            </label>
                            <label class="btn btn-sm btn-light">
                                <input type="radio" name="options" id="sales" autocomplete="off">Sales
                            </label>
                        </div>
                        </div>
                        <div class="col-3 h-25 text-center">
                        <div class="btn-group btn-group-toggle daymonthToggle" data-toggle="buttons">
                            <label class="btn btn-sm btn-light active">
                                <input type="radio" name="options" id="day" autocomplete="off" checked>Day
                            </label>
                            <label class="btn btn-sm btn-light">
                                <input type="radio" name="options" id="month" autocomplete="off">Month
                            </label>
                        </div>
                        </div>

                    </div>
                    <div class="col-md-9">

                        <div class="row">
                            <div class="col chart">
                                <div class="spinner">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 my-auto pl-0 datasection">

                        <div class="chartinfo d-flex flex-column m-auto pr-3">
                            <!-- chart info here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 card p-0 mr-2 my-2 stateStats">
            <div class="card-body row py-3">
                <div class="row w-100 py-2">
                    <div class="col-md-9 justify-content-center btn-group btn-group-toggle mx-auto dataToggle" data-toggle="buttons">
                        <label class="btn btn-sm btn-light active">
                            <input type="radio" name="options" id="revenue" autocomplete="off" checked>Revenue
                        </label>
                        <label class="btn btn-sm btn-light">
                            <input type="radio" name="options" id="sales" autocomplete="off">Sales
                        </label>
                    </div>
                    <div class="col-md-3" data-toggle="buttons">
                        <div class="form-group stateselect">
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col chart">
                            <div class="spinner">
                                <div class="bounce1"></div>
                                <div class="bounce2"></div>
                                <div class="bounce3"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 datasection d-flex flex-column justify-content-around">
                    <div class="chartinfo d-flex flex-column m-auto">
                        <!-- chart info here -->
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>
<div class="container producttable hidden p-3">

    <div class="row ml-1 mb-3">
        <button type="button" class="btn btn-link home-link"><i class="fas fa-chevron-circle-left"></i> Return to Home</button>
    </div>

    <table class="table table-bordered table-hover w-100" id="productlist" cellspacing="0" width="100%"
    data-page-length='10'>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Sub Category</th>
                <th scope="col">Units Sold</th>
                <th scope="col">Total Reveneue</th>
            </tr>
        </thead>
        <tbody id="productsbody">
            <!-- table content here -->
        </tbody>

    </table>
</div>
<div class="container salestable hidden p-3">

    <div class="row ml-1 mb-3">
        <button type="button" class="btn btn-link home-link"><i class="fas fa-chevron-circle-left"></i> Return to Home</button>
    </div>

    <table class="table table-bordered table-hover w-100" id="saleslist" cellspacing="0" width="100%"
    data-page-length='10'>
        <thead>
            <tr>
                <th scope="col">Sale ID</th>
                <th scope="col">Items</th>
                <th scope="col">Reveneue</th>
                <th scope="col">Location</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
        <tbody id="salesbody">
            <!-- table content here -->
        </tbody>

    </table>
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