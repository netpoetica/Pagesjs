/* CONTACT US */
var Contact = {
    name: 'contact',
    elem: null,
    buildForm: function(){
        var form = $('<form />')
        .append(
            '<label for="user_name">Name: <input type="text" name="user_name" /></label><br />',
            '<label for="user_email">Email:<input type="text" name="user_email" /></label><br />',
            "<textarea>Say something...</textarea>"
        );
        
        return form;
    },
    init: function(){
        // Set elem
        this.elem = $('.page[data-name="'+this.name + '"]');
        
        var container = $('<div />');
        var title = $('<h1 />').html("Reach Out and Touch Someone");
        var content = $('<p />').html("Namely, us. Touch us with your words.");
        
        container.append(
            title, 
            content, 
            this.buildForm()
        );

        this.elem.append(container);
    },
    populate: function(){
        this.elem.fadeIn(300);
    },
    destroy: function(){
        this.elem.fadeOut(300);
    }
};