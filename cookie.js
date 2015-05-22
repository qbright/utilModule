/**
 * Created with WebStorm.
 * User: zqbright
 * Date: 2015/4/8 0008
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */


define(["ya.util"],function (Util) {
    var cookie = {
        "init": "",
        "getCookieValue": function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) {
                endstr = document.cookie.length;
            }
            return Util.decode(document.cookie.substring(offset, endstr));
        },
        /**
         * 获取Cookie
         */
        "getCookie": function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) {
                    return this.getCookieValue(j);
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) {
                    break;
                }
            }
            return null;
        },
        "getExpires": function (time) {
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + time);
            return expdate;
        },
        /**
         * 删除Cookie
         */
        "deleteCookie": function (cname) {
            this.setCookie(cname, "", 0);
        },

        /**
         * 设置Cookie
         *
         * @param name
         *            cookie名称
         * @param value
         *            cookie值
         * @param expires
         *            过期时间,单位:ms
         */
        "setCookie": function (name, value, expires) {
            /* TODO setCookie指定了duowan.com */
            var _domain = document.domain;
            var value = name + "=" + Util.encode(value) + "; domain=" + _domain + ";";
            if (expires > 0) {
                value += " expires=" + this.getExpires(expires).toGMTString();
            }
            document.cookie = value;
        }
    }

    return cookie;
});