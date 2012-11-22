// /////////////////////////////////////
// MAIN LOGIC.
$(document).ready(function(){
    // These functions passed into the config object represent tasks that must be done,
    // code that will be executed, every time a page's init/populate/destroy functions
    // are called. This includes things like showing/hiding other pages, adding/removing
    // event listeners, making ajax calls, errthang you can think of.
    var Pages = new _Pages({
        init: function(){
            console.log('Pages.init()');
        },
        populate: function(){
            console.log('Pages.populate()');

        },
        destroy: function(){
            console.log('Pages.destroy()');
        }
    });
    
    // Add Pages from objects
    // Individual pages being passed a config object - each page is responsible
    // for building it's HTML, appending it properly, etc. For example, in init you
    // might have an AJAX call, and then you would pass it a populate function
    // as a call back, ie:
    // var home = Pages.getPageByName['home'];
    // home.init(home.populate);
    // 
    // and your init function might look like:
    // init: function(callback){
    // 		DataManager.getHomePageData(callback);
    // };
    Pages.addPage(Home);
    Pages.addPage(About);
    Pages.addPage(Contact);

    // All the pages on our site, the DOM element containers to target with our code
    var $pageContainerElem = $('#page_container');
    
    /*var pageElements = [];				
    
    // Page Elements with a data-name of...
    $('.page').each(function(){ 
        // Can now access each element in an array form, pagesElements['home'].init() 
        // for example. This is useful so you can call .destroy() on all pages in your
        // general Pages functions.
        pageElements[$(this).attr('data-name')] = $(this); 
    });*/

    // All the links to pages
    var navigationElements = [];
    $('#main_menu')
    .find('li')
    .each(function(){ 
        // data-nav is an attribute we can use to bind navigation to a specific page
        var pageName = $(this).attr('data-nav');
        navigationElements[pageName] = $(this);
        $(this).find('a').attr('href', '#'+pageName); // Hash system for routing/deep linking
    })
    .click(function(){
        // Hijack link functionality
        Pages.each('destroy');
        Pages.getPageByName($(this).attr('data-nav')).populate();
    });


    /* MAIN MENU TOGGLE AND EVENT LISTENERS */
    var bMainMenuOpen = true;
    function toggleMainMenu(bForceClosed){
        if(bMainMenuOpen || bForceClosed){
            $pageContainerElem.animate({
                left: '0%',
                width: '100%'
            });
            bMainMenuOpen = false;
        }
        else{
            $pageContainerElem.animate({
                left: '29%',
                width: '71%'
            });
            bMainMenuOpen = true;
        }
    }
    $('#menu_button').click(function(){
        toggleMainMenu();
    });
    
    // Init all pages
    Pages.each('init');

    // Show the home page by default
    Pages.getPageByName('home').populate();
    
});

