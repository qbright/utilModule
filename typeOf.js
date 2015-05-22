/**
 * Created with WebStorm.
 * User: zqbright
 * Date: 2015/5/21 0021
 * Time: 14:29
 * To change this template use File | Settings | File Templates.
 */

define(function () {
    var toString = Object.prototype.toString;

    var typeOf = function (val) {

        switch (toString.call(val)) {
            case '[object Function]':
                return 'function'
            case '[object Date]':
                return 'date'
            case '[object RegExp]':
                return 'regexp'
            case '[object Arguments]':
                return 'arguments'
            case '[object Array]':
                return 'array'
            case '[object String]':
                return 'string'
        }

        if (typeof val == 'object' && val && typeof val.length == 'number') {
            try {
                if (typeof val.callee == 'function') return 'arguments';
            } catch (ex) {
                if (ex instanceof TypeError) {
                    return 'arguments';
                }
            }
        }
        if (val === null) return 'null'
        if (val === undefined) return 'undefined'
        if (val && val.nodeType === 1) return 'element'
        if (val === Object(val)) return 'object'

        return typeof val
    }

    return typeOf;


});
