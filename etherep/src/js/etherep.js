///
/// CONSTANTS
///
const DEFAULT_PROVIDER = "http://localhost:8545";
const NETWORKID = 9999;
const ETHEREP_FEE = 200000000000000;
const ETHEREP_ADDR = 0x7f8c6b6688fc58e0d5ee4f216c4a3bb900000000;
const ETHEREP_ABI = [{"constant":false,"inputs":[{"name":"d","type":"bool"}],"name":"setDebug","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"drain","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"who","type":"address"}],"name":"setManager","outputs":[{"name":"manager","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"getScore","outputs":[{"name":"score","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"who","type":"address"},{"name":"rating","type":"int256"}],"name":"rate","outputs":[],"payable":true,"type":"function"},{"inputs":[{"name":"_manager","type":"address"},{"name":"_fee","type":"uint256"},{"name":"_storageAddress","type":"address"},{"name":"_wait","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"message","type":"string"}],"name":"Error","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"Debug","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"int256"}],"name":"DebugInt","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"uint256"}],"name":"DebugUint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"by","type":"address"},{"indexed":false,"name":"who","type":"address"},{"indexed":false,"name":"rating","type":"int256"}],"name":"Rating","type":"event"}];
const RATINGSTORE_ADDR = null;
const RATINGSTORE_ABI = [{"constant":false,"inputs":[{"name":"_debug","type":"bool"}],"name":"setDebug","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"wScore","type":"int256"}],"name":"add","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"}],"name":"reset","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"cumulative","type":"int256"},{"name":"total","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newController","type":"address"}],"name":"setController","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"target","type":"address"}],"name":"get","outputs":[{"name":"","type":"int256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newManager","type":"address"}],"name":"setManager","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getDebug","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getManager","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_manager","type":"address"},{"name":"_controller","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"Debug","type":"event"}];

///
/// UTILS
///
function byid(id) {
    return document.getElementById(id);
}

function submitLookup(form) {
    console.log('lookup!');
}

function selectRating(rating) {
    console.log(rating);
    return false;
}

/**
 * Data sanity checking class
 */
class StringValidator {
    /** 
     * Is the provided string a number?
     * @param {string} val - String to test to see if it's a number
     */
    static isNumber(val) {
        if (typeof val === "number") return true;
        let regex = /^[0-9\.]+$/;
        if (typeof val == "string" && val.match(regex)) return true;
        return false;
    }

    /**
     * Is the provided value a (possibly) valid ethereum address?
     * @param {string} val - The string to test to see if it's an address
     */
    static isAddress(val) {
        let regex = /0x[A-Fa-f0-9]{40}/
        if (typeof val == "string" && val.match(regex)) return true;
        return false;
    }
}

///
/// MAIN 
///
class Etherep {
    
    constructor(el) {

        this.mainElement = el;

        // Get/set web3
        if (typeof web3 == typeof undefined) {
            this.web3 = new Web3(new Web3.providers.HttpProvider(DEFAULT_PROVIDER));
        } else {
            this.web3 = web3;
        }

        /*if (typeof page == typeof undefined) {
            console.error("page is unavailable, this app will not work properly!");
        }*/

        this._renderMain(byid('tmplMain').innerHTML, { fee: this.web3.fromWei(ETHEREP_FEE, "ether") });

    }

    /**
     * Make sure we're properly connected to the blockchain
     * @param {boolean} ignoreDefault - Whether or not to ignore the default account check
     * @returns {Promise}
     */
    _web3Valid(ignoreDefault=false) {
        var that = this;
        return new Promise((resolve, reject) => {
            // Are we connected?
            if (that.web3.isConnected()) {
                
                // Check network ID
                that.web3.version.getNetwork((err, netId) =>  {
                    
                    // If this failed, maybe we aren't really connected?
                    if (err) {
                        reject("User is not using a Web3 browser!");
                    }

                    // Need to be connected to a specific network
                    if (netId != NETWORKID) {
                        reject("User is connected to network " + netId);
                    } else {
                        
                        // Sometimes we may need to ignore this check to prevent
                        // an infinite loop of checks
                        if (ignoreDefault) {
                            resolve("Connected");
                        } else {
                            
                            // Check for a default account
                            if (typeof web3.eth.defaultAccount === "undefined") {
                                
                                // We're going to need to wait on this
                                this.EventAccountSet.add(resolve);

                                // Prompt the user to set the account
                                this.promptSetAccount();

                            } else {
                                
                                resolve("Connected to the proper network");

                            }
                        }
                    }

                });

            } else {
                
                reject("Not connected");

            }

        });
    }

    /** 
     * Is this text a url? 
     * @param {string} url - The string to test to see if it's a URL
     */
    _isTemplateUrl(url) {
        if (url !== undefined && (url.slice(0,4) === "http" || url.slice(0,1) === '/')) return true;
        return false;
    }

    /** 
     * Fetch a template's source from a URL 
     * @param {string} url - The URL of the template to fetch
     */
    _getTemplate(url) {
        return new Promise((resolve, reject) => {
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else {
                var xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.responseText);
                } else if (xhr.readyState == 4) {
                    reject(xhr.status);
                }
            }
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
    _render(element, template, context) {
        return new Promise((resolve, reject) => {

            if (this._isTemplateUrl(template)) {

                this._getTemplate(template).then(function(tmpl) {
                    
                    element.innerHTML = Mustache.render(tmpl, context);
                    resolve();

                }.bind(this)).catch(function(err) {

                    reject(err);

                });

            } else {
                
                element.innerHTML = Mustache.render(template, context);
                resolve();

            }

        })
    }

    /** 
     * Render a template to the main element of the app 
     * @param {string} template - The template string we will be rendering
     * @param {object} context - The context variables to render to the template
     */
    _renderMain(template, context) {
        return this._render(this.mainElement, template, context);
    }

    /**
     * Close all modals
     */
    closeModals() {
        byid('modal-container').innerHTML = "";
    }

    /**
     * Show the modal explaining why a fee is charged
     */
    showWhyFee() {
        this._render(
            byid('modal-container'), 
            byid('tmplNotice').innerHTML, 
            { 
                title: "Why does Etherep charge a fee?", 
                content: "Etherep charges a small fee for upkeep up services and to reduce spam ratings.  It will likely be adjusted on the fly as spam realities change and the price of ether changes." 
            }
        );
    }

    /**
     * Show the lookup page
     * @param {string} address - The ethereum address to lookup
     */
    showLookup(address) {}

    /**
     * Show the rating form
     */
    showRate() {

    }

    /**
     * Lookup the rating for an address
     * @param {string} address - The ethereum address to lookup
     * @returns {int} - The rating for the address
     */
    lookup(address) {}

    /**
     * Rate an address
     * @param {string} address - The ethereum address to rate
     * @param {int} rating - The rating from -5 to 5
     * @returns {string} Transaction hash
     */
    rate(address, rating) {

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

        this._web3Valid(true).then(function(res) {
            
            let rep = this.web3.eth.contract(ETHEREP_ABI).at(ETHEREP_ADDR);


            response = rep.rate(address, rating);

        });

        return response;

    }
}
