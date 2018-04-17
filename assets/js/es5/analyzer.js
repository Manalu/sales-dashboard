"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function findObj(array, property, value) {
    if (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] == value) {
                return array[i];
            }
        }
    }
    return false;
}
function orderItems(objects, property) {
    var ascending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (ascending) {
        return objects.sort(function (b, a) {
            return a[property] < b[property] ? 1 : b[property] < a[property] ? -1 : 0;
        });
    } else {
        return objects.sort(function (a, b) {
            return a[property] < b[property] ? 1 : b[property] < a[property] ? -1 : 0;
        });
    }
}

var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var analyzeOperations = function () {

    var yearlyStats, monthlyStats, categoryStats, dailyStats, stateStats;

    var sdSales, sdRevenue, sdProfit, sdDailySales, sdMonthlySales;

    var productList = null,
        salesList = null;

    var sales, products;

    var basicStats = {
        totalRevenue: 0,
        totalProducts: 0,
        totalSoldUnits: 0,
        topSellingProduct: null
    };
    var allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function createDatasets(array, idLabel, valueLabel, label) {
        var DS = {
            labels: [],
            dataset: {
                data: [],
                label: null
            }
        };
        var labels = [],
            values = [];
        array.forEach(function (item) {
            DS.labels.push(item[idLabel]);
            DS.dataset.data.push(item[valueLabel]);
        });
        DS.dataset.label = label;
        return DS;
    }

    function createproductList(limit) {
        productList = new Array();
        products.forEach(function (curPD) {
            productList.push([curPD.name, curPD.category, curPD.subCategory, Math.round(curPD.totalSales), curPD.totalRevenue.toFixed(2)]);
        });
    }

    function getLargest(array, property, n) {
        for (var i = 0; i < n && i < array.length; i++) {
            for (var j = array.length - 1; j > i; j--) {
                if (array[j][property] > array[j - 1][property]) {
                    var temp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                }
            }
        }
        return array.slice(0, n);
    }

    function sortByDate(sales) {
        var dailySales = weekDays.map(function (day) {
            return { day: day, totalSales: 0 };
        });
        sales.forEach(function (sale) {
            dailySales[sale.orderDate.getDay()]['totalSales'] += sale['qty'];
        });
        return dailySales;
    }

    function buildDailyStats() {
        var Day = function Day(name, totalSales, totalRevenue) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
        };
        var salesIDs = new Set();
        //creating empty objects with months
        var days = weekDays.map(function (dayName) {
            return new Day(dayName);
        });
        //taking each sale and adding its revenue and quanity to month
        sales.forEach(function (sale) {
            var dayName = weekDays[sale.orderDate.getDay()];
            var day = findObj(days, 'name', dayName);
            day.totalRevenue += sale.revenue;
            if (!salesIDs.has(sale.id)) {
                day.totalSales++;
                salesIDs.add(sale.id);
            }
        });
        dailyStats = days;
    }

    function buildMonthlyStats() {
        var Month = function Month(name, totalSales, totalRevenue) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
        };
        var salesIDs = new Set();
        //creating empty objects with months
        var months = allMonths.map(function (monthName) {
            return new Month(monthName);
        });
        //taking each sale and adding its revenue and quanity to month
        sales.forEach(function (sale) {
            var monthName = allMonths[sale.orderDate.getMonth()];
            var month = findObj(months, 'name', monthName);
            month.totalRevenue += sale.revenue;
            if (!salesIDs.has(sale.id)) {
                month.totalSales++;
                salesIDs.add(sale.id);
            }
        });
        monthlyStats = months;
    }
    //building yearly stats
    function buildYearlyStats() {
        var years = new Array();

        var Year = function Year(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
            this.months = new Array();
            this.incSales = null;
            this.incRevenue = null;
            this.lastYear = null;
        };

        var Month = function Month(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
        };

        Year.prototype.initMonths = function () {
            this.months = allMonths.map(function (curMonth) {
                return new Month(curMonth, 0);
            });
        };

        Year.prototype.addData = function (month, id, revenue) {
            this.totalRevenue += revenue;
            this.months[month].totalRevenue += revenue;
            if (!salesIDs.has(id)) {
                this.totalSales++;
                this.months[month].totalSales++;
                salesIDs.add(id);
            }
        };
        var salesIDs = new Set();
        sales.forEach(function (sale) {
            var year = findObj(years, 'name', sale.orderDate.getFullYear());
            if (year === false) {
                var year = new Year(sale.orderDate.getFullYear());
                //creating a new month array
                year.initMonths();
                //pushing the new year to array
                years.push(year);
            }
            year.addData(sale.orderDate.getMonth(), sale.id, sale.revenue);
        });
        //sorting by year name
        years = orderItems(years, 'name', true);
        //increase of revenue/sales from last year
        years.forEach(function (curYear, index) {
            if (index > 0) {
                curYear.lastYear = curYear.name - 1;
                curYear.incSales = Math.round(100 * (curYear.totalSales - years[index - 1].totalSales) / years[index - 1].totalSales);
                curYear.incRevenue = Math.round(100 * (curYear.totalRevenue - years[index - 1].totalRevenue) / years[index - 1].totalRevenue);
            }
        });
        yearlyStats = years;
    }

    //building state stats
    function buildStateStats() {

        var states = new Array();

        var State = function State(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
            this.cities = new Array();
        };

        var City = function City(name, totalRevenue) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = totalRevenue;
        };

        State.prototype.addData = function (name, id, revenue) {
            var city = findObj(this.cities, 'name', name);
            if (city === false) {
                city = new City(name, revenue);
                this.cities.push(city);
            }
            //updating the current data
            city.totalRevenue += revenue;
            this.totalRevenue += revenue;
            if (!salesIDs.has(id)) {
                this.totalSales++;
                city.totalSales++;
                salesIDs.add(id);
            }
        };
        var salesIDs = new Set();
        sales.forEach(function (sale) {
            var state = findObj(states, 'name', sale.state);
            if (state == false) {
                state = new State(sale.state);
                states.push(state);
            }
            state.addData(sale.city, sale.id, sale.revenue);
        });
        //sorting by year name
        states = orderItems(states, 'name', true);
        stateStats = states;
    }

    function buildCategoryStats() {
        var categories = new Array();
        var Category = function Category(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
            this.subCategories = new Array();
        };

        var SubCategory = function SubCategory(name, totalSales, totalRevenue) {
            this.name = name;
            this.totalSales = totalSales;
            this.totalRevenue = totalRevenue;
        };

        Category.prototype.addSubCategory = function (name, totalSales, totalRevenue) {
            var checkSubCategory = findObj(this.subCategories, 'name', name);
            if (checkSubCategory == false) {
                this.subCategories.push(new SubCategory(name, totalSales, totalRevenue));
            } else {
                checkSubCategory.totalSales += totalSales;
                checkSubCategory.totalRevenue += totalRevenue;
            }
        };

        Category.prototype.calcTotals = function () {
            this.subCategories.forEach(function (subCategory) {
                this.totalSales += subCategory.totalSales;
                this.totalRevenue += subCategory.totalRevenue;
            }.bind(this));
        };

        products.forEach(function (product, productID) {
            var checkCategory = findObj(categories, 'name', product.category);
            if (checkCategory == false) {
                var cat = new Category(product.category);
                cat.addSubCategory(product.subCategory, product.totalSales, product.totalRevenue);
                categories.push(cat);
            } else {
                checkCategory.addSubCategory(product.subCategory, product.totalSales, product.totalRevenue);
            }
        });

        categories.forEach(function (category) {
            category.calcTotals();
        });
        categoryStats = categories;
    }

    function createSalesList() {
        salesList = new Array();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = sales[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var sale = _step.value;

                var salesItem = findObj(salesList, 'id', sale.id);
                if (salesItem == false) {
                    salesList.push({
                        id: sale.id,
                        items: "" + products.get(sale.pid).name,
                        revenue: parseInt(sale.revenue),
                        address: sale.city + ",\n " + sale.state,
                        orderDate: dateFormat(sale.orderDate, "dddd, mmmm dS, yyyy")
                    });
                } else {
                    salesItem.revenue += parseInt(sale.revenue);
                    salesItem.items += ", " + products.get(sale.pid).name;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    function updateBasicStats(product) {
        basicStats.totalSoldUnits += product.totalSales;
        basicStats.totalRevenue += product.totalRevenue;
        basicStats.totalProducts += 1;
    }

    function top20products(array) {
        for (var i = 0; i < 20 && array.length; i++) {
            console.log(array[i]);
        }
    }
    //building the basic stats from sales data
    function buildSalesStats() {
        products.forEach(function (curPD) {
            curPD.tnxs = new Array();
            sales.forEach(function (curSales) {
                if (curSales.pid == curPD.id) {
                    curPD.tnxs.push(curSales);
                }
            });
            curPD.tnxs.forEach(function (curtxn) {
                curtxn.calcRevenue(curPD.sellPrice);
                curPD.totalSales += parseInt(curtxn.qty);
                curPD.totalRevenue -= parseFloat(curtxn.discount);
            });
            curPD.totalRevenue += curPD.sellPrice * curPD.totalSales;
            updateBasicStats(curPD);
        });
        var arrayOfProducts = Array.from(products, function (v) {
            return v[1];
        });
        sdSales = getLargest(arrayOfProducts, 'totalSales', 7);
        basicStats.topSellingProduct = sdSales[0].name;
        //adding  up no. of unique sales transactions
        basicStats.totalSalesTxns = new Set(sales.map(function (sale) {
            return sale.id;
        })).size;
        buildYearlyStats();
    }
    function calcHighLowTotalAvg(labels, dataset) {
        var high = labels[dataset.data.indexOf(Math.max.apply(Math, _toConsumableArray(dataset.data)))];
        var low = labels[dataset.data.indexOf(Math.min.apply(Math, _toConsumableArray(dataset.data)))];
        var total = Math.floor(dataset.data.reduce(function (total, value) {
            return total + value;
        }));
        var avg = Math.floor(dataset.data.reduce(function (total, value) {
            return total + value;
        }) / dataset.data.length);
        return { high: high, low: low, total: total, avg: avg };
    }
    //method to get the data need for generating chart
    function getChartData(type, params) {
        if (type == 'monthlyStats') {
            if (!monthlyStats) {
                buildMonthlyStats();
            }

            var _createDatasets = createDatasets(monthlyStats, 'name', "total" + params.type, params.type),
                labels = _createDatasets.labels,
                dataset = _createDatasets.dataset;

            var _calcHighLowTotalAvg = calcHighLowTotalAvg(labels, dataset),
                high = _calcHighLowTotalAvg.high,
                low = _calcHighLowTotalAvg.low,
                total = _calcHighLowTotalAvg.total,
                avg = _calcHighLowTotalAvg.avg;

            var chartInfo = { avg: avg, high: high, low: low, type: params.data };
            var chartData = { labels: labels, datasets: [dataset] };
            return { chartData: chartData, chartInfo: chartInfo };
        } else if (type == 'dailyStats') {
            if (!dailyStats) {
                buildDailyStats();
            }

            var _createDatasets2 = createDatasets(dailyStats, 'name', "total" + params.type, params.type),
                labels = _createDatasets2.labels,
                dataset = _createDatasets2.dataset;

            var _calcHighLowTotalAvg2 = calcHighLowTotalAvg(labels, dataset),
                high = _calcHighLowTotalAvg2.high,
                low = _calcHighLowTotalAvg2.low,
                total = _calcHighLowTotalAvg2.total,
                avg = _calcHighLowTotalAvg2.avg;

            var chartInfo = { avg: avg, high: high, low: low, type: params.data };
            var chartData = { labels: labels, datasets: [dataset] };
            return { chartData: chartData, chartInfo: chartInfo };
        } else if (type == 'categoryStats') {
            if (!categoryStats) {
                buildCategoryStats();
            }
            if (params.category === "All") {
                var _createDatasets3 = createDatasets(categoryStats, 'name', "total" + params.type, params.type),
                    labels = _createDatasets3.labels,
                    dataset = _createDatasets3.dataset;

                var name = "All Categories";
                var chartData = { labels: labels, datasets: [dataset] };

                var _calcHighLowTotalAvg3 = calcHighLowTotalAvg(labels, dataset),
                    high = _calcHighLowTotalAvg3.high,
                    low = _calcHighLowTotalAvg3.low,
                    total = _calcHighLowTotalAvg3.total,
                    avg = _calcHighLowTotalAvg3.avg;

                var chartInfo = { name: name, high: high, low: low, avg: avg, total: total };
                return { chartData: chartData, chartInfo: chartInfo };
            } else {
                var category = findObj(categoryStats, "name", params.category);

                var _createDatasets4 = createDatasets(category.subCategories, 'name', "total" + params.type, params.type),
                    labels = _createDatasets4.labels,
                    dataset = _createDatasets4.dataset;

                var chartData = { labels: labels, datasets: [dataset] };

                var _calcHighLowTotalAvg4 = calcHighLowTotalAvg(labels, dataset),
                    high = _calcHighLowTotalAvg4.high,
                    low = _calcHighLowTotalAvg4.low,
                    total = _calcHighLowTotalAvg4.total,
                    avg = _calcHighLowTotalAvg4.avg;

                var chartInfo = {
                    name: category['name'],
                    avg: avg,
                    total: total,
                    high: high,
                    low: low
                };
                return { chartData: chartData, chartInfo: chartInfo };
            }
        } else if (type == 'stateStats') {
            if (!stateStats) {
                buildStateStats();
            }
            if (params.state === "All") {
                var returnObj = new Object();
                if (stateStats.length > 1) {
                    var states = stateStats.map(function (state) {
                        return state.name;
                    });
                    returnObj.states = states;
                }

                var _createDatasets5 = createDatasets(stateStats, 'name', "total" + params.type, params.type),
                    labels = _createDatasets5.labels,
                    dataset = _createDatasets5.dataset;

                var name = "All States";
                var chartData = { labels: labels, datasets: [dataset] };

                var _calcHighLowTotalAvg5 = calcHighLowTotalAvg(labels, dataset),
                    high = _calcHighLowTotalAvg5.high,
                    low = _calcHighLowTotalAvg5.low,
                    total = _calcHighLowTotalAvg5.total,
                    avg = _calcHighLowTotalAvg5.avg;

                var chartInfo = { no: labels.length, name: name, high: high, low: low, avg: avg, total: total };
                returnObj.chartData = chartData;
                returnObj.chartInfo = chartInfo;
                return returnObj;
            } else {
                var state = findObj(stateStats, "name", params.state);

                var _createDatasets6 = createDatasets(state.cities, 'name', "total" + params.type, params.type),
                    labels = _createDatasets6.labels,
                    dataset = _createDatasets6.dataset;

                var chartData = { labels: labels, datasets: [dataset] };

                var _calcHighLowTotalAvg6 = calcHighLowTotalAvg(labels, dataset),
                    high = _calcHighLowTotalAvg6.high,
                    low = _calcHighLowTotalAvg6.low,
                    total = _calcHighLowTotalAvg6.total,
                    avg = _calcHighLowTotalAvg6.avg;

                var chartInfo = {
                    no: labels.length,
                    name: state['name'],
                    avg: avg,
                    total: total,
                    high: high,
                    low: low
                };
                return { chartData: chartData, chartInfo: chartInfo };
            }
        } else if (type == 'yearlyStats') {
            if (!yearlyStats) {
                buildYearlyStats();
            }
            if (params.year === "All") {
                var returnObj = new Object();
                if (yearlyStats.length > 1) {
                    var years = yearlyStats.map(function (year) {
                        return year.name;
                    });
                    years.unshift("All");
                    returnObj.years = years;
                }

                var _createDatasets7 = createDatasets(yearlyStats, 'name', "total" + params.type, "All Years"),
                    labels = _createDatasets7.labels,
                    dataset = _createDatasets7.dataset;

                var _calcHighLowTotalAvg7 = calcHighLowTotalAvg(labels, dataset),
                    high = _calcHighLowTotalAvg7.high,
                    low = _calcHighLowTotalAvg7.low,
                    total = _calcHighLowTotalAvg7.total,
                    avg = _calcHighLowTotalAvg7.avg;

                var name = "All Years";
                returnObj.chartData = { labels: labels, datasets: [dataset] };
                returnObj.chartInfo = { high: high, low: low, avg: avg, total: total, name: name };
                return returnObj;
            } else {
                var year = findObj(yearlyStats, "name", params.year);

                var _createDatasets8 = createDatasets(year.months, 'name', "total" + params.type, params.year),
                    labels = _createDatasets8.labels,
                    dataset = _createDatasets8.dataset;

                var chartData = { labels: labels, datasets: [dataset] };

                var _calcHighLowTotalAvg8 = calcHighLowTotalAvg(labels, dataset),
                    high = _calcHighLowTotalAvg8.high,
                    low = _calcHighLowTotalAvg8.low,
                    total = _calcHighLowTotalAvg8.total,
                    avg = _calcHighLowTotalAvg8.avg;

                var chartInfo = {
                    name: year['name'],
                    avg: avg,
                    total: total,
                    increasePerc: year["inc" + params.type],
                    high: high,
                    low: low,
                    lastYear: year.lastYear
                };
                return { chartData: chartData, chartInfo: chartInfo };
            }
        }
    }
    return {

        init: function init(productTable, salesTable) {
            sales = salesTable;
            products = productTable;
        },
        //test to display all data
        displaydata: function displaydata() {
            console.log(yearlyStats);
            console.log(stateStats);
            console.log(monthlyStats);
            console.log(dailyStats);
        },

        //public API for building stats
        buildSalesStats: buildSalesStats,
        getChartData: getChartData,

        getBasicStats: function getBasicStats() {
            return basicStats;
        },

        getSalesList: function getSalesList() {
            if (!salesList) {
                createSalesList();
            }
            return salesList;
        },

        getProductList: function getProductList() {
            if (!productList) {
                createproductList();
            }
            return productList;
        }
    };
}();
