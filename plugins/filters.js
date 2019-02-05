import Vue from 'vue'
import moment from 'moment'

Vue.filter('capitalize', val => val.toUpperCase());
Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
    }
});
Vue.filter('truncate', function (text, stop, clamp = '') {

    if (!text)
        return '';
    var separator = ' ';
    if (text.length <= stop) return text;
    return text.substr(0, text.lastIndexOf(separator, stop)) + clamp;



    // return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

