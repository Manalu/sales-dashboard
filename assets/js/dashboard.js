var controller = function (excelCtrl, UICtrl, analyzer) {

    var DOM = UICtrl.getDStrings();
    //default URLs
    var defaultFileURL = 'http://localhost/sales-dashboard/files/getdefault',
    fileLocation = "http://localhost/sales-dashboard/user_files/sheets/";

    //download the last/default file from server
    function downloadFile(fileName) {
        return new Promise(function(resolve, reject) {
            var url = fileLocation + fileName;
            console.log(url);
            var req = new XMLHttpRequest();
            req.open("GET", url);
            req.responseType = "arraybuffer";
            req.onload = function (e) {
                if(req.status !== 404) {
                    var data = new Uint8Array(req.response);
                    resolve(data);
                } else {
                    reject("File Not Found!");
                }
            };
            req.send();
        });
    }
    //download the name & metadata of default file
    function getLastFile(type) {
        return new Promise(function(resolve, reject) {
            console.time('readFile');
            $.post(defaultFileURL, { type: type },
                function (fileMeta, textStatus, jqXHR) {
                if (textStatus == "success") {
                    downloadFile(fileMeta.fileName).then(function(file) {
                        resolve({
                            fileName: fileMeta.fileName,
                            data: file,
                            heads: fileMeta.heads
                        });
                    }).catch(function(message) {
                        reject(message);
                    });
                } else {
                    reject("No files!");
                }
            }, "json");
        })

    }
    function xlsxCheck(name) {
        var xlsxflag = false;
        if (name.toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        return xlsxflag;
    }
    //function to load Yearly Chart data
    function loadYearlyChart(type = "Revenue", year = "All") {
        //getting Yearly Stats from analyzer
        var {chartData, chartInfo, years} = analyzer.getChartData('yearlyStats', {type, year});
        //when year is not provided
        if(year === "All") {
            //add button group
            UICtrl.yearBtnOps.clearBtns();
            UICtrl.yearBtnOps.addBtn(years);
            //displaying additional info of data on datasection
            UICtrl.displayChartInfo('yearlyChartAll', type, chartInfo);
        }
        //when year is provided
        else {
            UICtrl.displayChartInfo("yearlyChart", type, chartInfo);
        }
        UICtrl.displayCharts('yearlyStats', chartData, `${type} from ${chartInfo.name}`);
        
    }
    //load monthly charts
    function loadMonthDayChart(type = "Revenue", data = "Day") {
        if(data === "Day") {
            var {chartData, chartInfo} = analyzer.getChartData('dailyStats', {type, data});
        } else if(data === "Month") {
            var {chartData, chartInfo} = analyzer.getChartData('monthlyStats', {type, data});
        }
        UICtrl.displayCharts('monthDayStats', chartData, `${type} from each ${data}`);
        UICtrl.displayChartInfo("monthDayStats", type, chartInfo);
    }
    //load category charts
    function loadCategoryChart(type = "Revenue", category = "All") {
        var {chartData, chartInfo} = analyzer.getChartData('categoryStats', {category, type});
        if (category === 'All') {
            UICtrl.displayCharts('categoryStats', chartData, `${type} from ${chartInfo.name}`);
            UICtrl.displayChartInfo("categoryChartAll", type, chartInfo);
        } else {
            UICtrl.displayCharts('categoryStats', chartData, `${type} from ${chartInfo.name}`);
            UICtrl.displayChartInfo("categoryChart", type, chartInfo);
        }
    }
    //load state charts
    function loadStateChart(type = "Revenue", state = "All") {
        //getting State Stats from analyzer
        var {chartData, chartInfo, states} = analyzer.getChartData('stateStats', {type, state});
        //when state is not provided
        if(state === "All") {
            //add select
            UICtrl.stateSelectOps.clearSelect();
            UICtrl.stateSelectOps.addSelect(states);
            //displaying additional info of data on datasection
            UICtrl.displayChartInfo('stateChartAll', type, chartInfo);
        }
        //when state is provided
        else {
            UICtrl.displayChartInfo("stateChart", type, chartInfo);
        }
        UICtrl.displayCharts('stateStats', chartData, `${type} from ${chartInfo.name}`);
    }
    //load product list/table
    function loadProductList() {
        var productList = analyzer.getProductList();
        UICtrl.dispProductList(productList);
    }
    //load sales list/table
    function loadSalesList() {
        var salesList = analyzer.getSalesList();
        UICtrl.dispSalesList(salesList);
    }
    //extracting the data from excel file
    function parseFile(file, fileType) {
        excelCtrl.initHeads(file.heads, fileType);
        excelCtrl.parseData(file.data, fileType, xlsxCheck(file.fileName), false)
        .then(function(tables) {
            analyzer.init(tables.productTable, tables.salesTable);
            analyzer.buildSalesStats();
            console.log('finished');
            controller.dispBasicStats();
            controller.loadCharts();
        })
        .catch(function(message) {
            UICtrl.fileAlerts.parseFailed(message);
        });
    }

    function setupEventListeners() {

        $(document).ready(function () {
            //listener for year data toggle
            $('.' + DOM.yearlyStats).find('.' + DOM.dataToggle).find('label').click((e) => {
                loadYearlyChart(e.target.textContent.trim());
            });
            //listener for category data toggle
            $('.' + DOM.categoryStats).find('.' + DOM.dataToggle).find('label').click((e) => {
                loadCategoryChart(e.target.textContent.trim());
            });
            //listener for revenue/sales data toggle of monthDayStats
            $('.' + DOM.monthDayStats).find('.' + DOM.dataToggle).find('label').click((e) => {
                var monthOrDay = $('.' + DOM.dayMonthToggle).find('.active').text().trim();
                loadMonthDayChart(e.target.textContent.trim(), monthOrDay);
            });
            //listener for month/day data toggle of monthDayStats
            $('.' + DOM.dayMonthToggle).find('label').click((e) => {
                var revenueOrSales = $('.' + DOM.monthDayStats).find('.' + DOM.dataToggle).find('.active').text().trim();
                loadMonthDayChart(revenueOrSales, e.target.textContent.trim());
            });
            //listener for revenue/sales data toggle of state stats
            $('.' + DOM.stateStats).find('.' + DOM.dataToggle).find('label').click((e) => {
                var state = $('.' + DOM.stateSelect).find('select').val().trim();
                loadStateChart(e.target.textContent.trim(), state);
            });
            //listener for state data toggle of state stats
            $('.' + DOM.stateSelect).change((e) => {
                var revenueOrSales = $('.' + DOM.stateStats).find('.' + DOM.dataToggle).find('.active').text().trim();
                loadStateChart(revenueOrSales, e.target.value.trim());
            });
            //load product list/table
            $('.' + DOM.totalProducts).click(function () {
                $('.' + DOM.home).fadeOut(500, function () {
                    $('.' + DOM.productTable).fadeIn("fast");
                });
                loadProductList();
            });
            //load sales list/table
            $('.' + DOM.totalSales).click(function() {
                $('.' + DOM.home).fadeOut(500, function () {
                    $('.' + DOM.salesTable).fadeIn("fast");
                });
                loadSalesList();
            });
            //show home
            $("." + DOM.homeLink).click(function () {
                $(this).parent().parent().fadeOut("fast", function () {
                    $('.' + DOM.home).fadeIn("fast");
                });
            });
            
        });
    }

    return {
        init: function init() {
            var fileType = "salesFile";
            getLastFile(fileType).then(function(file) {
                parseFile(file, fileType);
                
            })
            .catch(function(message) {
                UICtrl.fileAlerts.downloadFailed(message);
            });
            setupEventListeners();
        },
        loadCharts: function() {
            $(document).ready(function () {
                $('.' + DOM.home).fadeIn('slow');
                loadYearlyChart();
                loadCategoryChart();
                loadMonthDayChart();
                loadStateChart();
            }.bind(this));
        },
        //public API to load charts
        loadYearlyChart: loadYearlyChart,
        loadCategoryChart: loadCategoryChart,
        loadMonthDayChart: loadMonthDayChart,
        //load basic statistic cards
        dispBasicStats: function() {
            var basicStats = analyzer.getBasicStats();
            UICtrl.dispBasicStats.totalProducts(basicStats.totalProducts);
            UICtrl.dispBasicStats.totalRevenue(basicStats.totalRevenue);
            UICtrl.dispBasicStats.topSold(basicStats.topSellingProduct);
            UICtrl.dispBasicStats.totalSales(basicStats.totalSalesTxns);
        },
        dispProductList: function() {
            loadProductList();
        }
    };
}(excelController, UIController, analyzeOperations);

controller.init();
