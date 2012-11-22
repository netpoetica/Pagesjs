/* ABOUT */
var About = {
    name: 'about',
    elem: null,
    init: function(){
        // Set elem
        this.elem = $('.page[data-name="'+this.name + '"]');
    },
    populate: function(){
        // HTML is built every time the populate function would get called
        // Maybe this page has dynamic content
        var container = $('<div />');
        var title = $('<h1 />').html("We're A Family");
        var content = $('<p />').html("In the loosest sense of the word. We're a family because:");

        $('<ul />')
        .append('<li>We live in NJ</li>')
        .append("<li>We break people's knees</li>")
        .append("<li>We shop at Cosco</li>")
        .appendTo(content);

        container.append(title).append(content);

        this.elem.append(container).fadeIn(300);
    },
    destroy: function(){
        // Destroy HTML every time because it might be dynamic content
        this.elem.fadeOut(300).empty();
    }
};