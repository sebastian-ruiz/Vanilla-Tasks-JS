/**
 * Created by Sebastian on 15/07/2014.
 */

document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');

$(document).ready(function () {
    /*
     * This is hacky, would use a library like  Angular.js in production
     */

    var button = document.getElementById('button'),
        button2 = document.getElementById('button2');

    button.addEventListener('click', function () {
        this.setAttribute('class', 'android-btn active');

        var self = this;
        setTimeout(function () {
            self.removeAttribute('class', 'active');
            self.setAttribute('class', 'android-btn');
        }, 300)
    });

    button2.addEventListener('click', function () {
        this.setAttribute('class', 'android-btn ink active');

        var self = this;
        setTimeout(function () {
            self.removeAttribute('class', 'active');
            self.setAttribute('class', 'android-btn ink');
        }, 300)
    });

});

