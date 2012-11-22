/* HOME */
var Home = {
    name: 'home',
    elem: null,
    listHomes: function(){
        // Example of how you can use a function you might need in all your main functions. This could be just about anything you can think of
        // and you can reference it from all your init/populate/destroy functions as this.listHomes
        return "There are all types of homes: ranches, castles, farms, caves, tents, TPs - you name it!";
    },
    init: function(){
        // Set elem
        this.elem = $('.page[data-name="'+this.name + '"]');
        
        var container = $('<div />');
        var title = $('<h1 />').html('The House Your Father Built');
        var content = $('<p />').html('This is the house your father built with his rusty tools and his dirty hands. Welcome! Okay, so, maybe it could have been better - but, hey, he was drunk and he only had a hammer!');

        container.append(title).append(content).append(this.listHomes);

        this.elem.append(container);
    },
    populate: function(){
        this.elem.fadeIn(300);
    },
    destroy: function(){
        this.elem.fadeOut(300);
    }
};