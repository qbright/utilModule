/**
 * Created with WebStorm.
 * User: zqbright
 * Date: 2015/4/8 0008
 * Time: 10:11
 * To change this template use File | Settings | File Templates.
 */


define(function () {
    var util = {
        /**
         * 将字符串去除空格、空白字符等
         * @param st
         * @returns {XML|string|void}
         */
        trim: function (st) {
            return st.replace(/(^\s*)|(\s*$)/g, "");
        },
        /**
         * 替换空格等字符
         * @param st
         * @returns {*|string}
         */
        replaceBlank: function (st) {
            var s = st.toString();
            s = s.replace(/ /g, "");
            s = s.replace(/&nbsp;/g, "");
            s = s.replace(/&/g, "|||");
            s = s.replace(/r/g, "");
            return s;
        },
        /**
         * 判断字符串是否为空
         * @param st
         * @returns {boolean}
         */
        isNotBlank: function (st) {
            return (this.trim(st) !== "");
        },
        isBlank: function (st) {
            return (!this.isNotBlank(st));
        },
        contains: function (st, sub) {
            return st.indexOf(sub) > -1;
        },
        startWith: function (st, str) {
            if (!str || st.length === 0 || str.length > st.length) {
                return false;
            }
            if (st.substring(0, str.length) === str) {
                return true;
            }
            return false;
        },
        encode: function (st) {
            return encodeURIComponent(st);
        },
        decode: function (st) {
            return decodeURIComponent(st);
        },
        parseToInt: function (st) {
            return isNaN(parseInt(st)) ? 0 : parseInt(st);
        },
    
        /**
         * 从url 中获取域名
         */
        getUrlDomain: function (url) {
            if (!url) {
                return document.domain;
            }
            var regex = /.*\:\/\/([^\/]*).*/;
            var match = url.match(regex);
            var host = "";
            if (typeof match != "undefined" && null != match) {
                host = match[1];
            }
            return host;
        },
        /**
         * 截取url中后缀资源地址
         * this.getURILocation("")  = ""
         * this.getURILocation("http://www.yy.com")  = http://www.yy.com
         * this.getURILocation("http://www.yy.com/page1.htm")  = page1.htm
         * this.getURILocation("http://www.yy.com/web/page1.htm")  = web/page1.htm
         * this.getURILocation("http://www.yy.com/web/page1.htm?p=param1&q=searchq&t=135785457")  = web/page1.htm
         */
        "getURILocation": function (url) {
            if (!this.isURL(url)) {
                return "";
            }
            return url.replace(/(.*\.[\w-]+\/){0,}([^\?]+).*/ig, "$2");
        },


        /**
         * 判断字符串 url 是否为 url地址
         *    assertFalse("“null”", _constant.isURL(null));
         *    assertFalse("", _constant.isURL(""));
         *    assertFalse("", _constant.isURL("http"));
         *    assertFalse("", _constant.isURL("http://"));
         *    assertFalse("", _constant.isURL("wwwfaafal"));
         *    assertTrue("http://www.yy.com", _constant.isURL("http://www.yy.com"));
         *    assertTrue("www.jamcode.org", _constant.isURL("www.jamcode.org"));
         *    assertTrue("http://www.jamcode.org", _constant.isURL("http://www.jamcode.org"));
         *    assertTrue("http://www.jamcode.org/robots.txt", _constant.isURL("http://www.jamcode.org/robots.txt"));
         *    assertTrue("https://www.jamcode.org/favicon.ico", _constant.isURL("https://www.jamcode.org/favicon.ico"));
         *    assertTrue("https://www.jamcode.org/?q=Go&t=1358978654", _constant.isURL("http://www.jamcode.org/?q=Go&t=1358978654"));
         */
        "isURL": function (str) {
            var re = /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
            return re.test(str);
        },
        "extractByCutPrefix": function (str, prefix) {
            if (!str instanceof String || !this.startWith(str, prefix)) {
                return str;
            }
            return str.substring(prefix.length, str.length);
        }

     

    }


    return util;
});

