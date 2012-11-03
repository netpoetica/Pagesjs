// Framework for Pages with a parent Init function (shared amongst page instances) and a page specific init function
// Run it in your console
// PS No dependency on jQuery, but I encourage you to use it in your individual init/populate/destroy functions!

// Generic Page Container 
function _Pages(config){
	/*
	- 'config' is an object that looks like this:
	var App = new Pages({
		init: function(){
		},
		populate: function(){
		},
		destroy: function()
	});
	*/
	// Private
	var pageArr = [];					// Holds all pages used in program
	
	// Individual Page object
	function Page(config){  // same variable name as Pages... shouldn't cause any issue though.
		// Page specific functions. Indivudal things like maybe
		// animations or various event listeners being put on, etc.
		// These functions are chainable, so you could call PageName.init().populate() if
		// that's what honks your hooter
		this.name = config.name;
		this.init = function(){
			console.log("Instantiating Page '" + this.name + "'"); 
			Page.prototype.init();
                        config.init();
			return this;
		}
		this.populate = function(){
			Page.prototype.populate();
                        config.populate();
			return this;
		}
		this.destroy = function(){
			Page.prototype.destroy();
                        config.destroy();
			return this;
		}
                // Loop thru config looking for functions to populate this object with?               
	}
	
	// Shared funtions or wrapper functions - add general init/populate
	// details to these wrappers which then later call their individual
	// functions.
	Page.prototype = {
		constructor: Page,
		init: function(){
			console.log("Initializing Page...");
			config.init();		// Function passed into Pages object as a general purpose init
		},
		populate: function(){
			console.log("Populating Page...");
			config.populate();
		},
		destroy: function(){
			console.log("Destroying Page...");
			config.destroy();
		}
	};
	
	// PUBLIC API
        this.getTotal = function(){
                return pageArr.length;
        };
        this.addPage = function(obj){
                if(typeof obj === 'object'){
                        //console.log("Pages: adding page '" + obj.name + "' to Pages interal list...");
                        pageArr.push(new Page(obj));
                }
        };
        this.getPageByName = function(sName){
                // Find a specific Page in the Pages array by name
                var len = pageArr.length;
                while(len){
                        len--;
                        if(pageArr[len].name == sName){
                                return pageArr[len];
                        }
                }
        };
        this.each = function(fn){
            // Call a function on all pages. If one page doesn't have the function, it won't break.
            var len = pageArr.length;
            while(len){
                len--;
                if(pageArr[len][fn] !== undefined){
                    pageArr[len][fn].call(pageArr[len]);
                }
            }
        };

        return this;
}