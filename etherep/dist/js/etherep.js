"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

///
/// CONSTANTS
///
var STATIC_ROOT = "";
var DEFAULT_PROVIDER = "https://ropsten.infura.io/FDJajyHvjza2cZK85SZ6 ";
var NETWORKS = ["3", "9999"];
var ETHEREP_FEE = 200000000000000;
var ETHEREP_ADDR = "0xee7a7b5a928a87f4eefdb1cf9ec9f61287b83f5b";
var ETHEREP_ABI = [{ "constant": false, "inputs": [{ "name": "d", "type": "bool" }], "name": "setDebug", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "drain", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "getScoreAndCount", "outputs": [{ "name": "score", "type": "int256" }, { "name": "ratings", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "who", "type": "address" }], "name": "setManager", "outputs": [{ "name": "manager", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "getScore", "outputs": [{ "name": "score", "type": "int256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "who", "type": "address" }, { "name": "rating", "type": "int256" }], "name": "rate", "outputs": [], "payable": true, "type": "function" }, { "inputs": [{ "name": "_manager", "type": "address" }, { "name": "_fee", "type": "uint256" }, { "name": "_storageAddress", "type": "address" }, { "name": "_wait", "type": "uint256" }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "message", "type": "string" }], "name": "Error", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "message", "type": "string" }], "name": "Debug", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "message", "type": "int256" }], "name": "DebugInt", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "message", "type": "uint256" }], "name": "DebugUint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "by", "type": "address" }, { "indexed": false, "name": "who", "type": "address" }, { "indexed": false, "name": "rating", "type": "int256" }], "name": "Rating", "type": "event" }];
var RATINGSTORE_ADDR = "0x70b3faf62b6d4a3e3d4a61d9f36d43232f4d1cec";
var RATINGSTORE_ABI = [{ "constant": false, "inputs": [{ "name": "_debug", "type": "bool" }], "name": "setDebug", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getController", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "wScore", "type": "int256" }], "name": "add", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }], "name": "reset", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "cumulative", "type": "int256" }, { "name": "total", "type": "uint256" }], "name": "set", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newController", "type": "address" }], "name": "setController", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "target", "type": "address" }], "name": "get", "outputs": [{ "name": "", "type": "int256" }, { "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newManager", "type": "address" }], "name": "setManager", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getDebug", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getManager", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_manager", "type": "address" }, { "name": "_controller", "type": "address" }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "message", "type": "string" }], "name": "Debug", "type": "event" }];
var MIGRATION_ADDR = "0x55646c2d031c6be279d34b56a050b38543c302d1";
var MIGRATION_ABI = [{ "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "getPermissions", "outputs": [{ "name": "", "type": "bool" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "adminAddress", "type": "address" }], "name": "removeAdmin", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "manAddress", "type": "address" }], "name": "addManager", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "key", "type": "string" }], "name": "getContract", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "key", "type": "string" }, { "name": "contractAddress", "type": "address" }], "name": "setContract", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "adminAddress", "type": "address" }], "name": "addAdmin", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "manAddress", "type": "address" }], "name": "removeManager", "outputs": [], "payable": false, "type": "function" }, { "inputs": [{ "name": "originalAdmin", "type": "address" }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "by", "type": "address" }, { "indexed": false, "name": "key", "type": "string" }, { "indexed": false, "name": "contractAddress", "type": "address" }], "name": "EventSetContract", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "by", "type": "address" }, { "indexed": false, "name": "admin", "type": "address" }], "name": "EventAddAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "by", "type": "address" }, { "indexed": false, "name": "admin", "type": "address" }], "name": "EventRemoveAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "by", "type": "address" }, { "indexed": false, "name": "manager", "type": "address" }], "name": "EventAddManager", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "by", "type": "address" }, { "indexed": false, "name": "manager", "type": "address" }], "name": "EventRemoveManager", "type": "event" }];

// Approximate gas to rate
var APPROX_GAS_RATE = 23000;

///
/// UTILS
///
function byid(id) {
    return document.getElementById(id);
}

function submitLookup(form) {
    if (typeof etherep === 'undefined') console.error("etherep not defined!");else etherep.lookup(form.elements['address'].value);
}

function selectRating(rating) {
    console.log("selectRating");
    console.log(rating);
    var who = byid('rating-address').value;
    etherep.rate(who, rating);
    return false;
}

/**
 * Data sanity checking class
 */

var StringValidator = function () {
    function StringValidator() {
        _classCallCheck(this, StringValidator);
    }

    _createClass(StringValidator, null, [{
        key: "isNumber",

        /** 
         * Is the provided string a number?
         * @param {string} val - String to test to see if it's a number
         */
        value: function isNumber(val) {
            if (typeof val === "number") return true;
            var regex = /^[0-9\.]+$/;
            if (typeof val == "string" && val.match(regex)) return true;
            return false;
        }

        /**
         * Is the provided value a (possibly) valid ethereum address?
         * @param {string} val - The string to test to see if it's an address
         */

    }, {
        key: "isAddress",
        value: function isAddress(val) {
            var regex = /0x[A-Fa-f0-9]{40}/;
            if (typeof val == "string" && val.match(regex)) return true;
            return false;
        }
    }]);

    return StringValidator;
}();

///
/// MAIN 
///


var Etherep = function () {
    function Etherep(el) {
        _classCallCheck(this, Etherep);

        this.mainElement = el;

        this.web3 = null;
        this.web3Connected = false;
        this.address = null;

        /*if (typeof page == typeof undefined) {
            console.error("page is unavailable, this app will not work properly!");
        }*/

        this._renderMain(byid('tmplMain').innerHTML, { fee: ETHEREP_FEE / 1000000000000000000 });

        // TBD later
        this.readOnly = false;

        // Connect
        if (!this.web3) {
            if ((typeof web3 === "undefined" ? "undefined" : _typeof(web3)) == (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
                console.warn("Attempting to create a connection to default RPC");
                this.web3 = new Web3(new Web3.providers.HttpProvider(DEFAULT_PROVIDER));
                this._setReadOnly(true);
            } else {
                this.web3 = web3;
            }
        }
    }

    /**
     * Make sure we're properly connected to the blockchain
     * @param {boolean} ignoreDefault - Whether or not to ignore the default account check
     * @returns {Promise}
     */


    _createClass(Etherep, [{
        key: "_web3Valid",
        value: function _web3Valid() {
            var ignoreDefault = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var that = this;
            return new Promise(function (resolve, reject) {

                // Are we connected?
                if (that.web3.isConnected()) {

                    // Don't do this repeatedly
                    if (that.web3Connected) {
                        resolve("Already connected");
                    } else {

                        // Check network ID
                        that.web3.version.getNetwork(function (err, netId) {

                            // If this failed, maybe we aren't really connected?
                            if (err) {
                                reject("User is not using a Web3 browser!");
                            }

                            // Need to be connected to a network with our contracts deployed
                            if (NETWORKS.includes(netId)) {

                                // Get the migration contract
                                var migrate = that.web3.eth.contract(MIGRATION_ABI).at(MIGRATION_ADDR);

                                // Get the contract address from the migration contract
                                migrate.getContract("etherep", function (err, res) {

                                    if (err) {
                                        console.error(err);
                                        reject('Could not get etherep contract address!');
                                    } else {

                                        console.log("Etherep contract address: ", res);
                                        that.address = res;

                                        // If we're read-only, we're done
                                        if (that.readOnly) {
                                            that.web3Connected = true;
                                            resolve("Connected read-only");
                                        }

                                        // Otherwise, do basic account setup
                                        else if (!ignoreDefault) {

                                                // Check for a default account
                                                if (typeof that.web3.eth.defaultAccount === "undefined") {

                                                    console.error("Not Implemented: Need to set account");
                                                    that.web3.eth.defaultAccount = that.web3.eth.accounts[0];
                                                    that.web3Connected = true;
                                                    resolve("Connected");
                                                } else {

                                                    that.web3Connected = true;
                                                    resolve("Connected to the proper network");
                                                }
                                            }

                                            // We're still good to go
                                            else {
                                                    that.web3Connected = true;
                                                    resolve("Connected");
                                                }
                                    }
                                });
                            }

                            // Not a valid network
                            else {
                                    reject("User is connected to network " + netId);
                                }
                        });
                    }
                } else {

                    reject("Not connected");
                }
            });
        }

        /** 
         * Is this text a url? 
         * @param {string} url - The string to test to see if it's a URL
         */

    }, {
        key: "_isTemplateUrl",
        value: function _isTemplateUrl(url) {
            if (url !== undefined && (url.slice(0, 4) === "http" || url.slice(0, 1) === '/')) return true;
            return false;
        }

        /** 
         * Fetch a template's source from a URL 
         * @param {string} url - The URL of the template to fetch
         */

    }, {
        key: "_getTemplate",
        value: function _getTemplate(url) {
            return new Promise(function (resolve, reject) {
                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else if (xhr.readyState == 4) {
                        reject(xhr.status);
                    }
                };
                xhr.open("GET", url);
                xhr.send();
            });
        }

        /** 
         * Render a template to an element using context 
         * @param {element} element - DOM element we're rendering to
         * @param {string} template - The template string we will be rendering
         * @param {object} context - The context variables to render to the template
         */

    }, {
        key: "_render",
        value: function _render(element, template, context) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                // Get our defaults available to templates
                var combinedContext = Object.assign(context, {
                    static: STATIC_ROOT,
                    migrateAddress: MIGRATION_ADDR
                });

                if (_this._isTemplateUrl(template)) {

                    _this._getTemplate(template).then(function (tmpl) {

                        element.innerHTML = Mustache.render(tmpl, combinedContext);
                        resolve();
                    }.bind(_this)).catch(function (err) {

                        reject(err);
                    });
                } else {

                    element.innerHTML = Mustache.render(template, combinedContext);
                    resolve();
                }
            });
        }

        /** 
         * Render a template to the main element of the app 
         * @param {string} template - The template string we will be rendering
         * @param {object} context - The context variables to render to the template
         */

    }, {
        key: "_renderMain",
        value: function _renderMain(template, context) {
            return this._render(this.mainElement, template, context);
        }

        /**
         * Set readOnly and render accordingly 
         * @param {boolean} ro - readOnly setting
         */

    }, {
        key: "_setReadOnly",
        value: function _setReadOnly(ro) {

            // Set the var
            this.readOnly = ro;

            // Get the read only elements
            var roEls = document.getElementsByClassName('ro');

            // Figure out display setting
            var display = void 0;
            if (this.readOnly) {
                display = "block";
            } else {
                display = "none";
            }

            // Set it
            for (var i = 0; i < roEls.length; i++) {
                roEls[i].style.display = "block";
            }
        }

        /**
         * Close all modals
         */

    }, {
        key: "closeModals",
        value: function closeModals() {
            byid('modal-container').innerHTML = "";
        }

        /**
         * Show the modal explaining why a fee is charged
         */

    }, {
        key: "showWhyFee",
        value: function showWhyFee() {
            this._render(byid('modal-container'), byid('tmplNotice').innerHTML, {
                title: "Why does Etherep charge a fee?",
                content: "Etherep charges a small fee for upkeep up services and to reduce spam ratings.  It will likely be adjusted on the fly as spam realities change and the price of ether changes."
            });
        }

        /**
         * Show the lookup page
         * @param {string} address - The ethereum address to lookup
         */

    }, {
        key: "showLookup",
        value: function showLookup(address) {}

        /**
         * Show the rating form
         */

    }, {
        key: "showRate",
        value: function showRate() {}

        /**
         * Lookup the rating for an address
         * @param {string} address - The ethereum address to lookup
         * @returns {int} - The rating for the address
         */

    }, {
        key: "lookup",
        value: function lookup(address) {
            console.log(address);
            if (!StringValidator.isAddress(address)) {
                console.error("Invalid address");
                return;
            }

            var targetElement = byid('lookup-score');

            // Show results element
            targetElement.classList.remove('hide');
            // Add loading effects
            targetElement.classList.add('spinner');

            var submitButton = byid('lookup-button');
            // Signal loading
            submitButton.classList.add('is-loading');

            var lookupForm = byid('lookup-form');
            // Reset any error status
            lookupForm.elements['address'].classList.remove('is-danger');

            var that = this;
            this._web3Valid().then(function (res) {

                var rep = that.web3.eth.contract(ETHEREP_ABI).at(that.address);

                rep.getScoreAndCount.call(address, function (err, resp) {

                    // Handle this in the catch block
                    if (err) throw err;

                    // Calculate single digit score
                    var score = parseFloat(resp[0]) / 100;

                    var scoreClass = void 0;
                    if (score >= -5 && score < -1) scoreClass = "bad";else if (score >= -1 && score < 3) scoreClass = "fair";else if (score >= 3) scoreClass = "good";
                    console.log("Score: ", score, " scoreClass: ", scoreClass);

                    // Render the element
                    that._render(targetElement, byid('tmplLookupResults').innerHTML, {
                        address: address,
                        score: score,
                        count: resp[1],
                        scoreClass: scoreClass
                    });

                    targetElement.classList.remove('spinner');
                    submitButton.classList.remove('is-loading');
                });
            }).catch(function (err) {

                // Reset all style
                targetElement.classList.remove('spinner');
                submitButton.classList.remove('is-loading');

                // And signal error on the input
                lookupForm.elements['address'].classList.add('is-danger');

                // Render the element
                that._render(targetElement, byid('tmplLookupError').innerHTML, {
                    errorMessage: err
                });
            });
        }

        /**
         * Rate an address
         * @param {string} address - The ethereum address to rate
         * @param {int} rating - The rating from -5 to 5
         * @returns {string} Transaction hash
         */

    }, {
        key: "rate",
        value: function rate(address, rating) {

            // Sanity checks
            if (rating < -5 || rating > 5) {
                console.error("Rating out of bounds");
                return;
            }
            if (!StringValidator.isAddress(address)) {
                console.error("Invalid address");
                return;
            }

            var response;

            var that = this;
            this._web3Valid(true).then(function (res) {

                var rep = that.web3.eth.contract(ETHEREP_ABI).at(that.address);

                // Get the target element and show loading effect
                var targetElement = byid('rating-results');
                targetElement.classList.remove('hide');
                targetElement.classList.add('spinner');
                console.log("making rep.rate call");
                response = rep.rate(address, rating, { value: ETHEREP_FEE, gas: 300000 }, function (err, resp) {
                    console.log('rep.rate callback');
                    console.log(resp);
                    if (err) {

                        console.error(err);
                        return;
                    } else {

                        // Render the notice
                        that._render(targetElement, byid('tmplRatingResults').innerHTML, {
                            address: address,
                            score: rating,
                            transaction: resp
                        });

                        // Done loading
                        targetElement.classList.remove('spinner');
                    }
                });
            });

            return response;
        }
    }]);

    return Etherep;
}();
//# sourceMappingURL=etherep.js.map
