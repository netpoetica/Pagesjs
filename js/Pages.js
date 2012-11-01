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
	function Page(config){
		// Page specific functions. Indivudal things like maybe
		// animations or various event listeners being put on, etc.
		// These functions are chainable, so you could call PageName.init().populate() if
		// that's what honks your hooter
		this.name = config.name;
		this.init = function(){
			console.log("Instantiating Page '" + this.name + "'"); 
			Page.prototype.init(config.init);
			return this;
		}
		this.populate = function(){
			Page.prototype.populate(config.populate);
			return this;
		}
		this.destroy = function(){
			Page.prototype.destroy(config.destroy);
			return this;
		}
	};
	
	// Shared funtions or wrapper functions - add general init/populate
	// details to these wrappers which then later call their individual
	// functions.
	Page.prototype = {
		constructor: Page,
		init: function(pageSpecificInit){
			console.log("Initializing Page...");
			config.init();		// Function passed into Pages object as a general purpose init
			pageSpecificInit();
		},
		populate: function(pageSpecificPopulate){
			console.log("Populating Page...");
			config.populate();
			pageSpecificPopulate();
		},
		destroy: function(pageSpecificDestroy){
			console.log("Destroying Page...");
			config.destroy();
			pageSpecificDestroy();
		}
	};
	
	return {
		getTotal: function(){
			return pageArr.length;
		},
		addPage: function(obj){
			if(typeof obj === 'object'){
				//console.log("Pages: adding page '" + obj.name + "' to Pages interal list...");
				pageArr.push(new Page(obj));
			}
		},
		getPageByName: function(sName){
			// Find a specific Page in the Pages array by name
			var len = pageArr.length;
			while(len){
				len--;
				if(pageArr[len].name == sName){
					return pageArr[len];
				}
			}
		},
		destroy: function(){	// Destroy all
			var len = pageArr.length;
			while(len){
				len--;
				pageArr[len].destroy();
			}
		},
		init: function(){	// init all
			var len = pageArr.length;
			while(len){
				len--;
				pageArr[len].init();
			}
		}
	}
};