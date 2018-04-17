String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function findObj(array, property, value) {
    if(array) {
        for(var i=0; i<array.length; i++) {
            if(array[i][property]==value) {
                return array[i];
            }
        }
    }
    return false;
}
function orderItems(objects, property, ascending = false) {
    if(ascending) {
        return objects.sort(function(b,a) {
            return (a[property] < b[property]) ? 1 : ((b[property] < a[property]) ? -1 : 0);
        } );
    } else {
        return objects.sort(function(a,b) {
            return (a[property] < b[property]) ? 1 : ((b[property] < a[property]) ? -1 : 0);
        } );
    }
}

var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var analyzeOperations = (function () {

    var yearlyStats, monthlyStats, categoryStats, dailyStats, stateStats;

    var sdSales, sdRevenue, sdProfit, sdDailySales, sdMonthlySales;

    var productList = null, salesList = null; 

    var sales, products;

    var basicStats = {
        totalRevenue: 0,
        totalProducts: 0,
        totalSoldUnits: 0,
        topSellingProduct: null
    };
    var allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    function createDatasets(array,idLabel,valueLabel, label) {
        var DS = {
            labels: [],
            dataset: {
                data: [],
                label: null
            }
        }
        var labels = [], values = [];
        array.forEach(function(item) {
            DS.labels.push(item[idLabel]);
            DS.dataset.data.push(item[valueLabel]);
        });
        DS.dataset.label = label;
        return DS;
    }

    

    function createproductList(limit) {
        productList = new Array();
        products.forEach(function(curPD) {
            productList.push(
                [
                    curPD.name,
                    curPD.category,
                    curPD.subCategory,
                    Math.round(curPD.totalSales),
                    curPD.totalRevenue.toFixed(2)
                ]
            );
        });
    }

    function getLargest(array, property, n) {
        for(var i = 0; i<n && i<array.length; i++) {
            for(var j=array.length-1; j>i; j--) {
                if(array[j][property] > array[j-1][property]) {
                    var temp = array[j];
                    array[j] = array[j-1];
                    array[j-1] = temp;
                }
            }
        }
        return array.slice(0,n);
    }

    
    function sortByDate(sales) {
        var dailySales = weekDays.map(function(day) {
            return {day: day, totalSales: 0};
        });
        sales.forEach(function(sale){
            dailySales[sale.orderDate.getDay()]['totalSales'] += sale['qty'];
        });
        return dailySales;
    }

    function buildDailyStats() {
        var Day = function(name, totalSales, totalRevenue) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
        };
        var salesIDs = new Set();
        //creating empty objects with months
        var days = weekDays.map(dayName => new Day(dayName));
        //taking each sale and adding its revenue and quanity to month
        sales.forEach(function(sale) {
            var dayName = weekDays[sale.orderDate.getDay()];
            var day = findObj(days, 'name', dayName);
            day.totalRevenue += sale.revenue;
            if(!salesIDs.has(sale.id)) {
                day.totalSales++;
                salesIDs.add(sale.id);
            }
        });
        dailyStats = days;
    }

    function buildMonthlyStats() {
        var Month = function(name, totalSales, totalRevenue) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
        };
        var salesIDs = new Set();
        //creating empty objects with months
        var months = allMonths.map(monthName => new Month(monthName));
        //taking each sale and adding its revenue and quanity to month
        sales.forEach(function(sale) {
            var monthName = allMonths[sale.orderDate.getMonth()];
            var month = findObj(months, 'name', monthName);
            month.totalRevenue += sale.revenue;
            if(!salesIDs.has(sale.id)) {
                month.totalSales++;
                salesIDs.add(sale.id);
            }
        });
        monthlyStats = months;
    }
    //building yearly stats
    function buildYearlyStats() {
        var years = new Array();
        
        var Year = function(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
            this.months = new Array();
            this.incSales = null;
            this.incRevenue = null;
            this.lastYear = null;
        };

        var Month = function(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
        };

        Year.prototype.initMonths = function() {
            this.months = allMonths.map(function(curMonth) {
                return new Month(curMonth, 0);
            });
        }

        Year.prototype.addData = function(month, id, revenue) {
            this.totalRevenue += revenue;
            this.months[month].totalRevenue += revenue;
            if(!salesIDs.has(id)) {
                this.totalSales++;
                this.months[month].totalSales++;
                salesIDs.add(id);
            }
        }
        var salesIDs = new Set();
        sales.forEach(function(sale) {
            var year = findObj(years, 'name', sale.orderDate.getFullYear());
            if(year === false) {
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
        years.forEach(function(curYear, index) {
            if(index>0) {
                curYear.lastYear = curYear.name - 1;
                curYear.incSales = Math.round(100 * (curYear.totalSales - years[index-1].totalSales) / years[index-1].totalSales);
                curYear.incRevenue = Math.round(100 * (curYear.totalRevenue - years[index-1].totalRevenue) / years[index-1].totalRevenue);
            }
        });
        yearlyStats = years;
    }

    //building state stats
    function buildStateStats() {

        var states = new Array();
        
        var State = function(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
            this.cities = new Array();
        };

        var City = function(name, totalRevenue) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = totalRevenue;
        };

        State.prototype.addData = function(name, id, revenue) {
            var city = findObj(this.cities, 'name', name);
            if(city === false) {
                city = new City(name, revenue);
                this.cities.push(city);
            }
            //updating the current data
            city.totalRevenue += revenue;
            this.totalRevenue += revenue;
            if(!salesIDs.has(id)) {
                this.totalSales++;
                city.totalSales++;
                salesIDs.add(id);
            }
        }
        var salesIDs = new Set();
        sales.forEach(function(sale) {
            var state = findObj(states, 'name', sale.state);
            if(state == false) {
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
        var Category = function(name) {
            this.name = name;
            this.totalSales = 0;
            this.totalRevenue = 0;
            this.subCategories = new Array();
        };

        var SubCategory = function(name,totalSales, totalRevenue) {
            this.name = name;
            this.totalSales = totalSales;
            this.totalRevenue = totalRevenue;
        };

        Category.prototype.addSubCategory = function(name, totalSales, totalRevenue) {
            var checkSubCategory = findObj(this.subCategories, 'name', name);
            if(checkSubCategory == false) {
                this.subCategories.push(new SubCategory(name, totalSales, totalRevenue));
            } else {
                checkSubCategory.totalSales += totalSales;
                checkSubCategory.totalRevenue += totalRevenue;
            }
        }

        Category.prototype.calcTotals = function() {
            this.subCategories.forEach(function(subCategory){
                this.totalSales += subCategory.totalSales;
                this.totalRevenue += subCategory.totalRevenue;
            }.bind(this));
        }

        products.forEach(function(product,productID) {
            var checkCategory = findObj(categories, 'name', product.category);
            if(checkCategory == false) {
                var cat = new Category(product.category);
                cat.addSubCategory(product.subCategory, product.totalSales, product.totalRevenue);
                categories.push(cat);
            } else {
                checkCategory.addSubCategory(product.subCategory, product.totalSales, product.totalRevenue);
            }
        });
        
        categories.forEach(function(category) {
            category.calcTotals();
        });
        categoryStats = categories;
    }

    function createSalesList() {
        salesList = new Array();
        for(var sale of sales) {
            var salesItem = findObj(salesList, 'id', sale.id);
            if(salesItem == false) {
                salesList.push({
                    id: sale.id,
                    items: `${products.get(sale.pid).name}`,
                    revenue: parseInt(sale.revenue),
                    address: `${sale.city},\n ${sale.state}`,
                    orderDate: dateFormat(sale.orderDate, "dddd, mmmm dS, yyyy")
                });
            } else {
                salesItem.revenue += parseInt(sale.revenue); 
                salesItem.items += `, ${products.get(sale.pid).name}`;
            }
        }
    }

    function updateBasicStats(product) {
        basicStats.totalSoldUnits += product.totalSales;
        basicStats.totalRevenue += product.totalRevenue;
        basicStats.totalProducts += 1;
    }

    function top20products(array) {
        for(var i=0;i<20&&array.length;i++) {
            console.log(array[i]);
        }
    }
    //building the basic stats from sales data
    function buildSalesStats() {
        products.forEach(function(curPD) {
            curPD.tnxs = new Array();
            sales.forEach(function(curSales) {
                if(curSales.pid == curPD.id) {
                    curPD.tnxs.push(curSales);
                }
            });
            curPD.tnxs.forEach(function(curtxn) {
                curtxn.calcRevenue(curPD.sellPrice);
                curPD.totalSales += parseInt(curtxn.qty);
                curPD.totalRevenue -= parseFloat(curtxn.discount);
            });
            curPD.totalRevenue += (curPD.sellPrice * curPD.totalSales);
            updateBasicStats(curPD);
        });
        var arrayOfProducts = Array.from(products, (v) => v[1]);
        sdSales = getLargest(arrayOfProducts, 'totalSales', 7);
        basicStats.topSellingProduct = sdSales[0].name;
        //adding  up no. of unique sales transactions
        basicStats.totalSalesTxns = new Set(sales.map(sale => sale.id)).size;
        buildYearlyStats();
    }
    function calcHighLowTotalAvg(labels, dataset) {
        var high = labels[dataset.data.indexOf(Math.max(...dataset.data))];
        var low = labels[dataset.data.indexOf(Math.min(...dataset.data))];
        var total = Math.floor(dataset.data.reduce((total, value) => total + value));
        var avg = Math.floor(dataset.data.reduce((total, value) => total+value)/dataset.data.length);
        return {high, low, total, avg};
    }
    //method to get the data need for generating chart
    function getChartData(type, params) {
        if(type=='monthlyStats') {
            if(!monthlyStats) {
                buildMonthlyStats();
            }
            var {labels, dataset} = createDatasets(monthlyStats,'name',`total${params.type}`, params.type);
            var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
            var chartInfo = {avg, high, low, type: params.data};
            var chartData =  {labels: labels, datasets: [dataset]};
            return {chartData, chartInfo};
        }
        else if(type=='dailyStats') {
            if(!dailyStats) {
                buildDailyStats();
            }
            var {labels, dataset} = createDatasets(dailyStats,'name',`total${params.type}`, params.type);
            var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
            var chartInfo = {avg, high, low, type: params.data};
            var chartData =  {labels: labels, datasets: [dataset]};
            return {chartData, chartInfo};
        }
        else if(type=='categoryStats') {
            if(!categoryStats) {
                buildCategoryStats();
            }
            if(params.category === "All") {
                var {labels, dataset} = createDatasets(categoryStats, 'name', `total${params.type}`, params.type);
                var name = "All Categories";
                var chartData = {labels: labels, datasets: [dataset]};
                var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
                var chartInfo = {name, high, low, avg, total};
                return {chartData, chartInfo};
            }
            else {
                var category = findObj(categoryStats, "name", params.category);
                var {labels, dataset} = createDatasets(category.subCategories,'name',`total${params.type}`, params.type);
                var chartData = {labels: labels, datasets: [dataset]};
                var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
                var chartInfo = {
                    name: category['name'],
                    avg: avg,
                    total: total,
                    high: high,
                    low: low,
                };
                return {chartData, chartInfo};
            }
        }
        else if(type=='stateStats') {
            if(!stateStats) {
                buildStateStats();
            }
            if(params.state === "All") {
                var returnObj = new Object();
                if(stateStats.length>1) {
                    var states = stateStats.map(function(state) {
                        return state.name;
                    });
                    returnObj.states = states;
                }
                var {labels, dataset} = createDatasets(stateStats, 'name', `total${params.type}`, params.type);
                var name = "All States";
                var chartData = {labels: labels, datasets: [dataset]};
                var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
                var chartInfo = {no: labels.length, name, high, low, avg, total};
                returnObj.chartData = chartData;
                returnObj.chartInfo = chartInfo;
                return returnObj;
            }
            else {
                var state = findObj(stateStats, "name", params.state);
                var {labels, dataset} = createDatasets(state.cities,'name',`total${params.type}`, params.type);
                var chartData = {labels: labels, datasets: [dataset]};
                var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
                var chartInfo = {
                    no: labels.length,
                    name: state['name'],
                    avg: avg,
                    total: total,
                    high: high,
                    low: low,
                };
                return {chartData, chartInfo};
            }
        }
        else if(type=='yearlyStats') {
            if(!yearlyStats) {
                buildYearlyStats();
            }
            if(params.year === "All") {
                var returnObj = new Object();
                if(yearlyStats.length>1) {
                    var years = yearlyStats.map(function(year) {
                        return year.name;
                    });
                    years.unshift("All");
                    returnObj.years = years;
                }
                var {labels, dataset} = createDatasets(yearlyStats, 'name', `total${params.type}`, "All Years");
                var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
                var name = "All Years";
                returnObj.chartData = {labels: labels, datasets: [dataset]};
                returnObj.chartInfo = {high, low, avg, total, name};
                return returnObj;
            } else {
                var year = findObj(yearlyStats, "name", params.year);
                var {labels, dataset} = createDatasets(year.months, 'name', `total${params.type}`, params.year);
                var chartData = {labels: labels, datasets: [dataset]};
                var {high, low, total, avg} = calcHighLowTotalAvg(labels, dataset);
                var chartInfo = {
                    name: year['name'],
                    avg: avg,
                    total: total,
                    increasePerc: year[`inc${params.type}`],
                    high: high,
                    low: low,
                    lastYear: year.lastYear
                };
                return {chartData, chartInfo};
            }
        }
    }
    return {

        init: function(productTable, salesTable) {
            sales = salesTable;
            products = productTable;
        },
        //test to display all data
        displaydata() {
            console.log(yearlyStats);
            console.log(stateStats);
            console.log(monthlyStats);
            console.log(dailyStats);
        },
        //public API for building stats
        buildSalesStats: buildSalesStats,
        getChartData: getChartData,

        getBasicStats: function() {
            return basicStats;
        },

        getSalesList: function() {
            if(!salesList) {
                createSalesList();
            }
            return salesList;
        },

        getProductList: function() {
            if(!productList) {
                createproductList();
            }
            return productList;
        }
    }
}());
