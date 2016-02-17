let $ = window.$ = window.jQuery = require('jquery');
import page from 'page';

(function ($) {
    let waves = require('materialize-css/js/waves');
    let velocity = require('materialize-css/js/velocity.min');
    let Hammer = require('materialize-css/js/jquery.hammer');
    let sideNav = require('materialize-css/js/sideNav');
    let app = document.getElementById('app');

    $(document).ready(function () {
        $('.button-collapse').sideNav();
    });

})(jQuery);
