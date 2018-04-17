function colorGenerator(num) {
    var colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(81, 228, 168, 0.8)',
        'rgba(200, 10, 233, 0.8)',
        'rgba(25, 27, 74, 0.8)',
        'rgba(177, 250, 100, 0.8)',
        'rgba(109, 121, 64, 0.8)',
        'rgba(236, 189, 44, 1)'
    ];
    return colors.slice(0, num);
}
//function to generate random colors
function generateRandomColors(num) {
    var colors = new Array();
    for(i = 0; i<num; i++) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        colors.push(`rgb(${r}, ${g}, ${b}, 0.8)`);
    }
    return colors;
}

var UIController = function () {

    var productListLoaded = false, salesListLoaded = false;

    var DStrings = {
        productBtn: 'productBtn',
        salesBtn: 'salesBtn',
        productFile: 'productFile',
        inputFile: 'userfile',
        yearBtns: 'yearBtns',
        yearStatChart: 'yearStatChart',
        yearlyStats: 'yearlyStats',
        totalRevenue: 'totalrevenue',
        totalProducts: 'totalproducts',
        totalSales: 'totalsales',
        topSold: 'topsold',
        salesheads: 'salesheads',
        productheads: 'productheads',
        headsselection: 'headsselection',
        selectFormats: 'selectformats',
        uploadBtn: 'upload-btn',
        progressDiv: 'progress',
        progressBar: 'progress-bar',
        fileAlerts: 'file-alerts',
        dateFormat: 'dateformat',
        uploadForm: 'upload_file',
        deleteBtn: 'deletebtn',
        deleteBtnModal: 'deletebtnmodal',
        modalDelete: 'modaldelete',
        modal: 'modal',
        home: 'home',
        productTable: 'producttable',
        productList: 'productlist',
        productsBody: 'productsbody',
        homeLink: 'home-link',
        salesTable: 'salestable',
        salesBody: 'salesbody',
        salesList: 'saleslist',
        dataToggle: 'dataToggle',
        chartInfo: 'chartinfo',
        categoryStats: 'categoryStats',
        stateStats: 'stateStats',
        stateSelect: 'stateselect',
        monthDayStats: 'monthdayStats',
        dataSection: 'datasection',
        dayMonthToggle: 'daymonthToggle'
    };

    var yearButtonOperations = {
        addBtn: function(years) {
            years.forEach(function(year, index) {
                var label = $("<label>").addClass("btn btn-sm btn-light");
                var radio = $('<input type="radio" autocomplete="off">').val(year);
                $(label).text(year);
                $(label).click(function(e) {
                    var year = e.target.textContent.trim();
                    var data = $('.' + DStrings.yearlyStats).find('.' + DStrings.dataToggle).find('.active').text().trim();
                    controller.loadYearlyChart(data, year);
                });
                //in case of first button set it as active
                index==0? $(label).addClass("active") : $(label).addClass("");
                index==0? $(radio).prop("checked", true) : $(radio).prop("checked", false);
                $(label).append(radio);
                $('.' + DStrings.yearBtns).append(label);
            });

        },
        clearBtns: function() {
            $('.' + DStrings.yearBtns).empty();
        },
        selectFirstBtn: function() {
            $('.' + DStrings.yearBtns).find('button:first').trigger('click');
        }
    };
    //add all select options for state chart
    var stateSelectOperations = {
        addSelect: function(states) {
            $('.' + DStrings.stateSelect).empty();
            var select = $("<select>").addClass("form-control");
            var option = $('<option>').val("All").text("All States");
            $(select).append(option);
            states.forEach(function(state) {
                var option = $('<option>').val(state).text(state);
                $(select).append(option);
            });
            $('.' + DStrings.stateSelect).append(select);
        },
        clearSelect: function() {
            $('.' + DStrings.stateSelect).empty();
        }
    };

    var fileAlerts = {
        alertDiv: '<div class="alert alert-danger alert-dismissable fade show" role="alert"></div>',
        alertCloseBtn: '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
        invalidType: function invalidType(e) {
            var message = "Only <strong>Excel(xlx,xlsx)</strong> files are supported.";
            var newDiv = $(this.alertDiv).append(message).append(this.alertCloseBtn);
            $('#' + DStrings.fileAlerts).append(newDiv);
            window.setTimeout(function () {
                $(".alert").alert('close');
            }, 3000);
        },

        showModal: function() {
            $("." + DStrings.modal).find(".modal-footer").find("button").click(function(e) {
                if(href = $(e.target).parent().attr("href")) window.location = href;
            });
            $('.' + DStrings.modal).modal({backdrop: 'static', keyboard: false});
        },

        downloadFailed: function(error) {
            var modal = $('.' + DStrings.modal);
            $(modal).find('.modal-title').text("Download Failed!");
            if(error === "No files!") {
                $(modal).find('.modal-body').text("You haven't uploaded any files. Upload one first!");
            } else if(error === "File Not Found!") {
                $(modal).find('.modal-body').html("The file you selected doesn't exist in the server!<br>Please upload or analyze another file.");
            }
            this.showModal();
        },

        parseFailed: function(uploadPage = false) {
            var modal = $('.' + DStrings.modal);
            $(modal).find('.modal-title').text("Parsing Failed!");
            var body = "The file is either corrupted or the column headings you entered are incorrect.";
            if(uploadPage) {
                var footer = $(modal).find(".modal-footer");
                $(footer).empty();
                var button = $(`<button class="btn btn-primary">`).text("Close");
                $(button).click((e) => $(e.target).closest(".modal").modal("hide"));
                $(footer).append(button);
            } else {
                body += "<br> Please upload the file again!";
            }
            $(modal).find('.modal-body').html(body);
            this.showModal();
        },

        notSelected: function(e) {
            var message = "Select a File First!";
            var newDiv = $(this.alertDiv).append(message).append(this.alertCloseBtn);
            $('#' + DStrings.fileAlerts).append(newDiv);
            window.setTimeout(function () {
                $(".alert").alert('close');
            }, 3000);
        },

        uploadProgress: function(progress) {

            var progressBar = document.querySelector("." + DStrings.progressBar);
            var progressDiv = $('.' + DStrings.progressDiv);

            progressDiv.css("display", "flex");

            $(progressBar).css("width", progress + '%');

            if (progress === 100) {
                window.setTimeout(() => {
                    $(progressDiv).hide(1000, () => {
                        this.uploadComplete();
                        $(progressBar).css("width", '0%');
                    });
                }, 1000);
            }
        },

        uploadComplete: function() {
            var message = "Upload Complete!";
            var newDiv = $(this.alertDiv).removeClass('alert-danger').addClass("alert-success");
            newDiv.append(message).append(this.alertCloseBtn);
            $('#' + DStrings.fileAlerts).append(newDiv);
            window.setTimeout(function () {
                $(".alert").alert('close');
            }, 3000);
        },

        uploadFailed: function() {
            var message = "Upload Failed!";
            var newDiv = $(this.alertDiv).append(message).append(this.alertCloseBtn);
            $('#' + DStrings.fileAlerts).append(newDiv);
            window.setTimeout(function () {
                $(".alert").alert('close');
            }, 3000);
        }
    }

    class HeadSelector {
        constructor() {
            var headsDiv = DStrings.headsselection;
            $("." + DStrings.selectFormats).fadeIn();
            var optionHTML = '<option value="%tablehead%">%tablehead%</option>';
            var notAvailalbleHTML = '<option value="NULL">Not Avaliable</option>';
            var selectHTML = '<label for="%actualhead%" class="col-5 col-form-label form-control-sm">%headdesc%: </label><select class="col-7 form-control form-control-sm" name="%actualhead%" id="%actualhead%"></select>';
            if (DBtype === 'salesFile') {
                $('.' + headsDiv).empty();
                //creating two form-groups for product and sales heads and appending it to the main div
                var sHeadsHTML = $("<div>").addClass("form-group col p-2 salesheads").attr('id', "salesheads");
                var pdHeadsHTML = $("<div>").addClass("form-group col p-2 productheads").attr('id', "productheads");
                $('.' + headsDiv).append(sHeadsHTML, pdHeadsHTML);
                //adding each element of product heads as options to the selects
                var pdOptionsHTML = tableHeads.pdHeads.map(function (head) {
                    return optionHTML.replaceAll('%tablehead%', head);
                });
                pdOptionsHTML.push(notAvailalbleHTML);
                //adding each element of sales heads as options to the selects
                var sOptionsHTML = tableHeads.sHeads.map(function (head) {
                    return optionHTML.replaceAll('%tablehead%', head);
                });
                sOptionsHTML.push(notAvailalbleHTML);
                //adding the actual values from excel file to the options
                actualHeads.pdHeads.forEach(function (headDesc, actualHead) {
                    var newSelectHTML = selectHTML.replaceAll('%headdesc%', headDesc).replaceAll('%actualhead%', actualHead);
                    var newRow = $("<div>").addClass("row w-100 py-2 pl-3");
                    newRow.html(newSelectHTML);
                    $(newRow).find("select").html(pdOptionsHTML);
                    pdHeadsHTML.append(newRow);
                });
                actualHeads.sHeads.forEach(function (headDesc, actualHead) {
                    var newSelectHTML = selectHTML.replaceAll('%headdesc%', headDesc);
                    newSelectHTML = newSelectHTML.replaceAll('%actualhead%', actualHead);
                    var newRow = $("<div>").addClass("row w-100 py-2 pl-3");
                    newRow.html(newSelectHTML);
                    $(newRow).find("select").html(sOptionsHTML);
                    sHeadsHTML.append(newRow);
                });
            }
            //assigning object properties
            this.repeatFlag = null;
            this.selectGroups = [
                $(sHeadsHTML).find("select"),
                $(pdHeadsHTML).find("select")
            ]
        }

        resetForm() {
            $('#' + DStrings.uploadForm).trigger('reset');
        }

        markRepeated() {
            this.repeatFlag = false;
            this.clearReds();
            this.selectGroups.forEach((selectGroup) => {
                selectGroup.each((indexOut, elementOut) => {
                    selectGroup.each((indexIn, elementIn) => {
                        if (indexIn > indexOut && elementIn.value !== 'NULL') {
                            return true;
                        } else if (elementIn.value == elementOut.value) {
                            elementIn.classList.add("border-red");
                            elementOut.classList.add("border-red");
                            this.repeatFlag = true;
                        }
                    });
                });
            });
        }

        clearReds() {
            $(DStrings.headsselection).find('.border-red').removeClass('.border-red');
        }
        //return the repeatflag
        repeatedValues() {
            if (this.repeatFlag === null) {
                this.markRepeated();
            }
            return this.repeatFlag;
        }

        clearHeadDiv() {
            $("." + DStrings.headsselection).empty();
            $("." + DStrings.selectFormats).fadeOut();
        }

        getFormData() {
            var formData = new FormData();
            $('.' + DStrings.headsselection).children().each(function (index, heads) {
                var obj = {};
                $(heads).find('select').each(function (index, select) {
                    obj[select.id] = select.value;
                });
                if (heads.id === 'salesheads') {
                    var dateFormat = $('#' + DStrings.dateFormat);
                    obj[dateFormat.attr("id")] = dateFormat.val();
                    var productID = $('.' + DStrings.productheads).find('#pid');
                    obj[productID.attr("id")] = productID.val();
                }
                var id = $(this).attr("id");
                formData.append($(this).attr("id"), JSON.stringify(obj));
            });

            var inputFile = $('#' + DStrings.inputFile);
            formData.append($(inputFile).attr("id"), inputFile[0].files[0]);
            return formData;
        }
    }

    var headOps = {
        selectGroups: null,
        repeatFlag: null,

        initSelectGroups: function() {
            this.repeatFlag = null;
            var headsDivs = [DStrings.productheads, DStrings.salesheads];
            if (this.selectGroups === null) {
                this.selectGroups = headsDivs.map(function(div) {
                    return $('.' + div).find("select");
                });
            }
        },
        resetForm: function() {
            $('#' + DStrings.uploadForm).trigger('reset');
        },
        selectBestMatch: function() {
            var rows = $('.' + DStrings.headsselection).find(".row");
            $.each(rows, function (index, row) {
                var label = $(this).find("label");
            });
        },
        displayHeads: function(DBtype, actualHeads, tableHeads) {
            var headsDiv = DStrings.headsselection;
            $("." + DStrings.selectFormats).fadeIn();
            var optionHTML = '<option value="%tablehead%">%tablehead%</option>';
            var notAvailalbleHTML = '<option value="NULL">Not Avaliable</option>';
            var selectHTML = '<label for="%actualhead%" class="col-5 col-form-label form-control-sm">%headdesc%: </label><select class="col-7 form-control form-control-sm" name="%actualhead%" id="%actualhead%"></select>';
            if (DBtype === 'salesFile') {
                $('.' + headsDiv).empty();
                //creating two form-groups for product and sales heads and appending it to the main div
                var sHeadsHTML = $("<div>").addClass("form-group col p-2 salesheads").attr('id', "salesheads");
                var pdHeadsHTML = $("<div>").addClass("form-group col p-2 productheads").attr('id', "productheads");
                $('.' + headsDiv).append(sHeadsHTML, pdHeadsHTML);
                //adding each element of product heads as options to the selects
                var pdOptionsHTML = tableHeads.pdHeads.map(function (head) {
                    return optionHTML.replaceAll('%tablehead%', head);
                });
                pdOptionsHTML.push(notAvailalbleHTML);
                //adding each element of sales heads as options to the selects
                var sOptionsHTML = tableHeads.sHeads.map(function (head) {
                    return optionHTML.replaceAll('%tablehead%', head);
                });
                sOptionsHTML.push(notAvailalbleHTML);
                //adding the actual values from excel file to the options
                actualHeads.pdHeads.forEach(function (headDesc, actualHead) {
                    var newSelectHTML = selectHTML.replaceAll('%headdesc%', headDesc).replaceAll('%actualhead%', actualHead);
                    var newRow = $("<div>").addClass("row w-100 py-2 pl-3");
                    newRow.html(newSelectHTML);
                    $(newRow).find("select").html(pdOptionsHTML);
                    pdHeadsHTML.append(newRow);
                });
                actualHeads.sHeads.forEach(function (headDesc, actualHead) {
                    var newSelectHTML = selectHTML.replaceAll('%headdesc%', headDesc);
                    newSelectHTML = newSelectHTML.replaceAll('%actualhead%', actualHead);
                    var newRow = $("<div>").addClass("row w-100 py-2 pl-3");
                    newRow.html(newSelectHTML);
                    $(newRow).find("select").html(sOptionsHTML);
                    sHeadsHTML.append(newRow);
                });
            }
            this.initSelectGroups();
        },

        markRepeated: function() {
            this.repeatFlag = false;
            this.clearReds();
            this.selectGroups.forEach((selectGroup) => {
                selectGroup.each((indexOut, elementOut) => {
                    selectGroup.each((indexIn, elementIn) => {
                        if (indexIn > indexOut && elementIn.value !== 'NULL') {
                            if (elementIn.value == elementOut.value) {
                                elementIn.classList.add("border-red");
                                elementOut.classList.add("border-red");
                                this.repeatFlag = true;
                            }
                        }
                    });
                });
            });
        },

        clearHeadDiv: function() {
            $("." + DStrings.headsselection).empty();
            $("." + DStrings.selectFormats).fadeOut();
        },
        //return the repeatflag
        repeatedValues: function() {
            if (this.repeatFlag == null) {
                this.markRepeated();
            }
            return this.repeatFlag;
        },

        getFormData: function() {
            var formData = new FormData();
            $('.' + DStrings.headsselection).children().each(function (index, heads) {
                var obj = {};
                $(heads).find('select').each(function (index, select) {
                    obj[select.id] = select.value;
                });
                if (heads.id === 'salesheads') {
                    var dateFormat = $('#' + DStrings.dateFormat);
                    obj[dateFormat.attr("id")] = dateFormat.val();
                    var productID = $('.' + DStrings.productheads).find('#pid');
                    obj[productID.attr("id")] = productID.val();
                }
                var id = $(this).attr("id");
                formData.append($(this).attr("id"), JSON.stringify(obj));
            });

            var inputFile = $('#' + DStrings.inputFile);
            formData.append($(inputFile).attr("id"), inputFile[0].files[0]);
            return formData;
        },

        clearReds: function() {
            this.initSelectGroups();
            this.selectGroups.forEach(function (selectGroup) {
                selectGroup.each(function (index, elementOut) {
                    elementOut.classList.remove("border-red");
                });
            });
        }
    };

    var displayBasicStats = {
        totalProducts: function(value) {
            $('.' + DStrings.totalProducts).find('.cardvalue').text(value);
        },
        totalRevenue: function(value) {
            $('.' + DStrings.totalRevenue).find('.cardvalue').text(parseInt(value));
        },
        topSold: function(value) {
            var cardvalue = $('.' + DStrings.topSold).find('.cardvalue');
            $(cardvalue).text(value);
            $(cardvalue).attr({
                "data-toggle": "tooltip",
                "data-placement": "top",
                "title": value
            });
        },
        totalSales: function(value) {
            $('.' + DStrings.totalSales).find('.cardvalue').text(parseInt(value));
        }
    }


    //function to generate any type of chart from given data
    function createChart(type, ctx, data, titleText = null, clickHandler = null) {
        //creating new chart and chartoptions object
        var chartObj = new Object();
        var options =  new Object();
        //assigning args and options to chartObj
        chartObj.type = type;
        chartObj.data = data;
        chartObj.options = options;
        //changing the legend position to bottom for all chart types
        options.legend = {
            position: 'bottom',
                labels: {
                    boxWidth: 30
                }
        };
        //setting cutoutPercentage for doughnut chart
        if(type == "doughnut") {
            options.cutoutPercentage = 60;
        }
        //hiding grid lines
        else if(type == "line"|type == "bar") {
            options.scales = {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    }
                }]
            }
            options.legend = {
                display: false
            };
        }
        //adding click handler if provided
        if(clickHandler) {
            options.onClick = clickHandler;
        }
        //adding title text if provided
        if(titleText) {
            options.title = {
                text: titleText,
                display: true,
                fontSize: 14
            }
        }
        //returning new created chart object
        return new Chart(ctx, chartObj);
    }

    function displaySalesList(salesList) {
        if(salesListLoaded) {
            return;
        }
        salesListLoaded = true;
        //templates for thead and td
        var thHTML = "<th>%value%</th>";
        var tdHTML = "<td>%value%</td>";
        var tdCurrencyHTML = '<td class="currency-sign">%value%</td>';
        salesList.forEach(function (curSale, index) {
            //next row
            var newTRow = $("<tr>");
            for (const key of Object.keys(curSale)) {
                if(key === 'revenue') {
                    newTRow.append(tdCurrencyHTML.replace("%value%", curSale[key]));
                } else {
                    newTRow.append(tdHTML.replace("%value%", curSale[key]));
                }
            }
            $('#' + DStrings.salesBody).append(newTRow);
        });
        $('#' + DStrings.salesList).DataTable({
            ordering: true,
            "sPaginationType": "full_numbers"
        });
    }

    function displayProductList(productList) {
        if (productListLoaded) {
           return;
        }
        productListLoaded = true;
        var thHTML = "<th>%value%</th>";
        var tdHTML = "<td>%value%</td>";
        var tdCurrencyHTML = '<td class="currency-sign">%value%</td>';
        productList.forEach(function (curPD, index) {
            var newTRow = $("<tr>");
            var tableLength = curPD.length;
            curPD.forEach(function (value, index) {
                //cheching for last column(it's revenue)
                if (index === tableLength - 1) {
                    newTRow.append(tdCurrencyHTML.replace("%value%", value));
                } else {
                    newTRow.append(tdHTML.replace("%value%", value));
                }
            });
            $('#' + DStrings.productsBody).append(newTRow);
        });
        $('#' + DStrings.productList).DataTable({
            ordering: true,
            "sPaginationType": "full_numbers"
        });
    }

    function displayChartInfo(chartType, dataType, data) {
        var isRevenue = dataType === "Revenue"? true: false;
        data.increase = data.increase? parseInt(data.increase) : null;
        //template for new row
        class row{
            constructor(name, data, currency, percentage, increase) {
                var perc = percentage? "percentage-sign": "";
                var cur = currency? 'currency-sign': '';
                var incOrDec = "";
                if(increase!==undefined) {
                    incOrDec = increase===false? `<i class="fas fa-arrow-down"></i>`:`<i class="fas fa-arrow-up"></i>`;
                }
                var row = $(`<div class="row pt-2 d-block ${name}">`);
                row.append($(`<h3 class="text-primary ${cur} ${perc}">`).html(incOrDec + data[0]));
                row.append($(`<h6 class="d-inline-block pb-1 faded text-muted">`).text(data[1]));
                return row;
            }
        }
        //for all year data
        if(chartType === "yearlyChartAll") {
            var dataInfo = $("." + DStrings.yearlyStats).find(`.${DStrings.chartInfo}`);
            $(dataInfo).empty();
            $(dataInfo).append(new row('total', [data.total, `Total ${dataType} in ${data.name}`], isRevenue));
            $(dataInfo).append(new row('average', [data.avg, `Average ${dataType} Per Year`], isRevenue));
            $(dataInfo).append(new row("high", [data.high, `Year with Highest ${dataType}`]));
        }
        //when specific category is provided
        else if(chartType === "yearlyChart") {
            var dataInfo = $("." + DStrings.yearlyStats).find(`.${DStrings.chartInfo}`);
            $(dataInfo).empty();
            $(dataInfo).append(new row('total', [data.total, `Total ${dataType} in ${data.name}`], isRevenue));
            $(dataInfo).append(new row('average', [data.avg, `Average ${dataType} Per Month`], isRevenue));
            if(data.increasePerc) {
                var change = data.increasePerc>=0? "Increase": "Decrease";
                $(dataInfo).append(new row("increase", [Math.abs(data.increasePerc), `${change} compared to ${data.lastYear}`], false, true, data.increasePerc>=0));
            }
            $(dataInfo).append(new row("high", [data.high, `Month with highest ${dataType}`]));
        }
        else if(chartType === "categoryChartAll") {
            var dataMsg = dataType=="Sales"? "Units Sold": dataType;
            var dataInfo = $("." + DStrings.categoryStats).find(`.${DStrings.chartInfo}`);
            $(dataInfo).empty();
            $(dataInfo).append(new row('total', [data.total, `Total ${dataMsg} from ${data.name}`], isRevenue));
            $(dataInfo).append(new row('average', [data.avg, `Average ${dataMsg} Per Category`], isRevenue));
            $(dataInfo).append(new row("high", [data.high, `Category with Most ${dataMsg}`]));
        }
        //when specific category is provided
        else if(chartType === "categoryChart") {
            var dataMsg = dataType=="Sales"? "Units Sold": dataType;
            var dataInfo = $("." + DStrings.categoryStats).find(`.${DStrings.chartInfo}`);
            $(dataInfo).empty();
            $(dataInfo).append(new row('total', [data.total, `Total ${dataMsg} from ${data.name}`], isRevenue));
            $(dataInfo).append(new row('average', [data.avg, `Average ${dataMsg} Per Sub Category`], isRevenue));
            $(dataInfo).append(new row("high", [data.high, `Sub Category with most ${dataMsg}`]));
        }
        else if(chartType === "stateChartAll") {
            var dataInfo = $("." + DStrings.stateStats).find(`.${DStrings.chartInfo}`);
            $(dataInfo).empty();
            $(dataInfo).append(new row('no', [data.no, `States`]));
            $(dataInfo).append(new row('total', [data.total, `Total ${dataType} from ${data.name}`], isRevenue));
            $(dataInfo).append(new row('average', [data.avg, `Average ${dataType} Per State`], isRevenue));
            $(dataInfo).append(new row("high", [data.high, `State with Highest ${dataType}`]));
            $(dataInfo).append(new row("low", [data.low, `State with Lowest ${dataType}`]));
        }
        //when specific category is provided
        else if(chartType === "stateChart") {
            var dataInfo = $("." + DStrings.stateStats).find(`.${DStrings.chartInfo}`);
            $(dataInfo).empty();
            $(dataInfo).append(new row('no', [data.no, `Cities`]));
            $(dataInfo).append(new row('total', [data.total, `Total ${dataType} from ${data.name}`], isRevenue));
            $(dataInfo).append(new row('average', [data.avg, `Average ${dataType} Per City`], isRevenue));
            $(dataInfo).append(new row("high", [data.high, `City with highest ${dataType}`]));
            $(dataInfo).append(new row("low", [data.low, `City with Lowest ${dataType}`]));
        }
        else if(chartType === "monthDayStats") {
            var dataInfo = $("." + DStrings.monthDayStats).find(`.${DStrings.chartInfo}`);
            $(dataInfo).empty();
            $(dataInfo).append(new row("high", [data.high, `${data.type} with highest ${dataType}`]));
            $(dataInfo).append(new row("low", [data.low, `${data.type} with lowest ${dataType}`]));
        }
    }

    function displayCharts(chartType, chartData, titleText) {
        var canvas = $('<canvas>').attr({'width': '400px', 'height': '400px'});
        var categoriesSalesChart;
        if (chartType == 'categoryStats') {
            //generating background colors
            chartData.datasets.forEach(function (dataset) {
                dataset.backgroundColor = colorGenerator(dataset.data.length);
            });
            //finding chart
            var chartDiv = $('.' + DStrings.categoryStats).find('.chart');
            //checking if a chart already exist
            if ($(chartDiv).children().length) $(chartDiv).empty();
            $(chartDiv).html(canvas);
            var isAll = titleText.includes(" All");
            if (isAll) {
                var evtHandler = function(e, chartElement) {
                    if (chartElement) {
                        var index = chartElement["0"]._index;
                        var label = chartElement["0"]._chart.data.labels[index];
                        var data = $('.' + DStrings.categoryStats).find('.' + DStrings.dataToggle).find('.active').text().trim();
                        controller.loadCategoryChart(data, label);
                    }
                };
            } else {
                var evtHandler = () => {return};
            }
            //creating the new ChartJS chart
            createChart("doughnut", canvas, chartData, titleText, evtHandler);
        } else if (chartType == 'yearlyStats') {
            //generating background colors
            chartData.datasets.forEach(function (dataset) {
                dataset.backgroundColor = 'rgba(75, 192, 192, 0.8)';
            });
            var width = $('.' + DStrings.yearlyStats).width() * 0.75 - 50;
            var height = window.innerHeight > 600? "360px" : "450px";
            canvas = $(canvas).attr({'width': `${width}px`, 'height': height});
            //finding the chart div
            var chartDiv = $('.' + DStrings.yearlyStats).find('.chart');
            //checking if a chart already exist
            if ($(chartDiv).children().length) $(chartDiv).empty();
            //adding the canvas to chart div
            $(chartDiv).html(canvas);
            //creating the new ChartJS chart
            createChart("line", canvas, chartData, `${titleText} (${currency})`);
        } else if (chartType == 'stateStats') {
            //generating background colors
            chartData.datasets.forEach(function (dataset) {
                dataset.backgroundColor = generateRandomColors(dataset.data.length);
            });
            var width = $('.' + DStrings.stateStats).width() * 0.75 - 50;
            var height = window.innerHeight > 600? "420px" : "450px";
            canvas = $(canvas).attr({'width': `${width}px`, 'height': height});
            //finding the chart div
            var chartDiv = $('.' + DStrings.stateStats).find('.chart');
            //checking if a chart already exist
            if ($(chartDiv).children().length) $(chartDiv).empty();
            //adding the canvas to chart div
            $(chartDiv).html(canvas);
            //creating the new ChartJS chart
            createChart("bar", canvas, chartData, `${titleText} (${currency})`);
        }
         else if (chartType == 'monthDayStats') {
            //generating background colors
            chartData.datasets.forEach(function (dataset) {
                dataset.backgroundColor = colorGenerator(dataset.data.length);
            });
            //finding chart
            var chartDiv = $('.' + DStrings.monthDayStats).find('.chart');
            //checking if a chart already exist
            if ($(chartDiv).children().length) $(chartDiv).empty();
            $(chartDiv).html(canvas);
            //creating the new ChartJS chart
            createChart("doughnut", canvas, chartData, titleText);
        }
    }

    return {
        getDStrings: function getDStrings() {
            return DStrings;
        },

        dispSalesList: displaySalesList,

        dispProductList: displayProductList,

        yearBtnOps: yearButtonOperations,

        stateSelectOps: stateSelectOperations,

        dispBasicStats: displayBasicStats,

        headOps: headOps,

        removeTableRow: function(id) {
            $('table').find("#" + id).remove();
        },

        fileAlerts: fileAlerts,

        displayChartInfo: displayChartInfo,

        displayCharts: displayCharts

    };
}();
