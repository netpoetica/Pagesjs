// All the pages on our site, the DOM element containers to target with our code
var pageElements = [];				// Page Elements with a data-name of...
$('.page').each(function(){ 
    // Can now access each element in an array form, pagesElements['home'].init() 
    // for example. This is useful so you can call .destroy() on all pages in your
    // general Pages functions.
    pageElements[$(this).attr('data-name')] = $(this); 

});

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
/* HOME */
Pages.addPage({
    name: 'home',
    listHomes: function(){
        // Example of how you can use a function you might need in all your main functions. This could be just about anything you can think of
        // and you can reference it from all your init/populate/destroy functions as this.listHomes
        return "There are all types of homes: ranches, castles, farms, caves, tents, TPs - you name it!";
    },
    init: function(){
        // this.name is not in scope. For some reason, console.log(this) is logging window
        // any ideas? /SOLVED.
        //console.log("home.init");
        //console.log(this.name);
        //console.log(this);
        var container = $('<div />');
        var title = $('<h1 />').html('The House Your Father Built');
        var content = $('<p />')
        .html('This is the house your father built with his rusty tools and his dirty hands. Welcome! Okay, so, maybe it could have been better - but, hey, he was drunk and he only had a hammer!');

        container.append(title).append(content).append(this.listHomes);

        pageElements[this.name].append(container);
    },
    populate: function(){
        pageElements[this.name].fadeIn(300);
    },
    destroy: function(){
        pageElements[this.name].fadeOut(100);
    }
});

/* ABOUT */
Pages.addPage({
    name: 'about',
    init: function(){
        // No init
    },
    populate: function(){
        // HTML is built every time the populate function would get called
        // Maybe this page has dynamic content
        var container = $('<div />');
        var title = $('<h1 />').html("We're A Family");
        var content = $('<p />')
        .html("In the loosest sense of the word. We're a family because:");

        $('<ul />')
        .append('<li>We live in NJ</li>')
        .append("<li>We break people's knees</li>")
        .append("<li>We shop at Cosco</li>")
        .appendTo(content);

        container.append(title).append(content);

        pageElements[this.name].append(container).fadeIn(300);
    },
    destroy: function(){
        // Destroy HTML every time because it might be dynamic content
        pageElements[this.name].fadeOut(100).empty();
    }
});

/* CONTACT US */
Pages.addPage({
    name: 'contact',
    init: function(){
        var container = $('<div />');
        var title = $('<h1 />').html("Reach Out and Touch Someone");
        var content = $('<p />')
        .html("Namely, us. Touch us with your words.");

        $('<form />')
        .append('<label for="user_name">Name: <input type="text" name="user_name" /></label>')
        .append('<label for="user_email">Email:<input type="text" name="user_email" /></label>')
        .append("<textarea>Say something...</textarea>")
        .appendTo(content);

        container.append(title).append(content);

        pageElements[this.name].append(container);
    },
    populate: function(){
        pageElements[this.name].fadeIn(300);
    },
    destroy: function(){
        pageElements[this.name].fadeOut(100);
    }
});

// Get the total just to make sure all of our Pages went through
//console.log("Total Pages: " + Pages.getTotal());

// Init all pages
Pages.each('init');

// Show the home page by default
Pages.getPageByName('home').populate();
