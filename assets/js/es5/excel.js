'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var excelController = function (analyzer) {

    var DOM = UIController.getDStrings();

    var promiseObjs = { resolve: null, reject: null };

    var productDB = {
        products: null,
        JSON: null,
        columnHeads: null
    };

    var salesDB = {
        columnHeads: null,
        JSON: null,
        sales: null
    };

    function dateParse(dateString) {
        var date = new Date('2000-01-01');
        var splitStrings = dateString.split('/');
        if (splitStrings.length == 3) {
            splitStrings[2] = "20" + splitStrings[2];
            var _ref = [splitStrings[1], splitStrings[0]];
            splitStrings[0] = _ref[0];
            splitStrings[1] = _ref[1];

            splitStrings.reverse();
            splitStrings = splitStrings.map(function (val, index) {
                var intVal = parseInt(val);
                if (index !== 0) intVal -= 1;
                return intVal;
            });
            date = new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(splitStrings))))();
        } else {
            throw new Error("Date Parse Failed");
            console.log("error");
        }
        return date;
    }

    function initSales() {
        var heads = salesDB.columnHeads;
        var sale = function sale(id, pid, qty, discount, pinCode, city, state, oDate) {
            this.id = id;
            this.city = city;
            this.state = state;
            this.pid = pid;
            this.orderDate = dateParse(oDate);
            this.revenue = 0;
            if (isNaN(pinCode)) {
                if (reject = promiseObjs.reject) reject("PinCode Parse Failed");
            } else {
                this.pinCode = parseInt(pinCode);
            }
            if (isNaN(qty)) {
                if (reject = promiseObjs.reject) reject("qty Parse Failed");
            } else {
                this.qty = parseInt(qty);
            }
            if (isNaN(discount)) {
                if (reject = promiseObjs.reject) reject("discount Parse Failed");
            } else {
                this.discount = parseFloat(discount);
            }
        };

        sale.prototype.calcRevenue = function (sellPrice) {
            this.revenue = sellPrice * this.qty - this.discount;
        };

        var sales = new Array();
        sales = salesDB.JSON.map(function (cur) {
            return new sale(cur[heads.oid], cur[heads.pid], cur[heads.qty], cur[heads.discount], cur[heads.pinCode], cur[heads.city], cur[heads.state], cur[heads.oDate]);
        });
        salesDB.sales = sales;
        var resolve = promiseObjs.resolve;
        resolve();
    }

    function initProducts() {
        var heads = productDB.columnHeads;
        var product = function product(id, name, sellPrice, category, subCategory) {
            this.id = id;
            this.name = name;
            this.category = category;
            this.subCategory = subCategory;
            this.totalSales = 0;
            this.totalRevenue = 0;
            this.totalProfit = 0;
            if (isNaN(sellPrice)) {
                if (reject = promiseObjs.reject) reject("sellPrice Parse Failed");
            } else {
                this.sellPrice = parseFloat(sellPrice);
            }
        };

        var products = new Map();
        productDB.JSON.forEach(function (cur) {
            var pd = new product(cur[heads.pid], cur[heads.name], parseFloat(cur[heads.salesPrice]), cur[heads.category], cur[heads.subCategory]);
            products.set(cur[heads.pid], pd);
        });
        productDB.products = products;
    }

    function buildTable() {
        return new Promise(function (resolve, reject) {
            promiseObjs.reject = reject;
            promiseObjs.resolve = resolve;
            initProducts();
            initSales();
        });
    }

    function storeData(DBtype, workbook, xlsxflag) {
        console.timeEnd('readFile');
        /*Gets all the sheetnames of excel in to a variable*/
        var sheet_name_list = workbook.SheetNames;
        /*Iterate through all sheets*/
        sheet_name_list.forEach(function (y) {
            /*Convert the cell value to Json*/
            if (xlsxflag) {
                exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
            } else {
                exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
            }
            //initializing tables
            if (workbook !== undefined) {
                if (y == 'Products') {
                    productDB.JSON = exceljson;
                } else if (y == 'Sales') {
                    salesDB.JSON = exceljson;
                }
            }
        });
        buildTable();
        return {
            salesTable: salesDB.sales,
            productTable: productDB.products
        };
    }

    function readHeads(DBtype, workbook, xlsxflag) {
        var exceljson;
        var pdHeads, sHeads;
        /*Gets all the sheetnames of excel in to a variable*/
        var sheet_name_list = workbook.SheetNames;
        // var sheets = {};
        /*Iterate through all sheets*/
        sheet_name_list.forEach(function (y) {
            /*Convert the cell value to Json*/
            if (xlsxflag) {
                exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
            } else {
                exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
            }
            // sheets[y] = exceljson;
            //storing column headings
            if (workbook !== undefined) {
                if (y == 'Products') {
                    productDB.JSON = exceljson;
                    pdHeads = Object.keys(exceljson[0]);
                } else if (y == 'Sales') {
                    salesDB.JSON = exceljson;
                    sHeads = Object.keys(exceljson[0]);
                }
            }
        });
        // controller.initFormData(sheets);
        return {
            pdHeads: pdHeads,
            sHeads: sHeads
        };
    }

    return {
        getSalesHeads: function getSalesHeads() {

            var pdHeads = new Map([['pid', 'Product ID'], ['name', 'Product Name'], ['category', 'Category'], ['subCategory', 'Sub Category'], ['salesPrice', 'Selling Price']]);

            var sHeads = new Map([['oid', 'Order ID'], ['oDate', 'Order Date'], ['qty', 'Quantity'], ['discount', 'Discount'], ['city', 'City'], ['state', 'State'],
            // ['country', 'Country'],
            ['pinCode', 'Postal Code']]);
            return { pdHeads: pdHeads, sHeads: sHeads };
        },
        parseData: function parseData(source, DBtype, xlsxflag, getHeads) {
            return new Promise(function (resolve, reject) {
                var workbook;
                if (!getHeads) {
                    /*Converts the excel data into object*/
                    if (xlsxflag) {
                        workbook = XLSX.read(source, { type: "array" });
                    } else {
                        workbook = XLS.read(source, { type: "array" });
                    }
                    var tables = storeData(DBtype, workbook, xlsxflag);
                    resolve(tables);
                } else {
                    if (typeof FileReader != "undefined") {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            /*Converts the excel data into object*/
                            if (xlsxflag) {
                                workbook = XLSX.read(data, { type: 'buffer' });
                            } else {
                                workbook = XLS.read(data, { type: 'binary' });
                            }
                            var heads = readHeads(DBtype, workbook, xlsxflag);
                            resolve(heads);
                        };

                        if (xlsxflag) {
                            /*If excel file is .xlsx extension then creates a Array Buffer from excel*/
                            reader.readAsArrayBuffer(source);
                        } else {
                            reader.readAsBinaryString(source);
                        }
                    } else {
                        reject("Sorry! Your browser does not support HTML5!");
                    }
                }
            });
        },
        initHeads: function initHeads(heads, fileType) {
            if (fileType === "salesFile") {
                productDB.columnHeads = heads.pdHeads;
                salesDB.columnHeads = heads.sHeads;
            }
        },

        dispdata: function dispdata() {
            console.log(productDB.table);
            console.log(salesDB.table);
        },
        buildTable: buildTable
    };
}(analyzeOperations);
