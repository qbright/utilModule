/**
 * Created with WebStorm.
 * User: zqbright
 * Date: 2015/5/15 0015
 * Time: 14:27
 * To change this template use File | Settings | File Templates.
 */




define(function(){
    /**
     * domReady事件封装
     * 兼容性
     * IE6+
     * Firefox 2+
     * Safari 3+
     * Chrome
     * Opera
     *
     *
     * @param ready
     * @returns {Function}
     */
   var domReady =  function (ready) {

       var fns = [], fn, f = false
           , doc = document
           , testEl = doc.documentElement
           , hack = testEl.doScroll
           , domContentLoaded = 'DOMContentLoaded'
           , addEventListener = 'addEventListener'
           , onreadystatechange = 'onreadystatechange'
           , readyState = 'readyState'
           , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
           , loaded = loadedRgx.test(doc[readyState])

       function flush(f) {
           loaded = 1
           while (f = fns.shift()) f()
       }

       doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
           doc.removeEventListener(domContentLoaded, fn, f)
           flush()
       }, f)


       hack && doc.attachEvent(onreadystatechange, fn = function () {
           if (/^c/.test(doc[readyState])) {
               doc.detachEvent(onreadystatechange, fn)
               flush()
           }
       })

       return (ready = hack ?
           function (fn) {
               self != top ?
                   loaded ? fn() : fns.push(fn) :
                   function () {
                       try {
                           testEl.doScroll('left')
                       } catch (e) {
                           return setTimeout(function() { ready(fn) }, 50)
                       }
                       fn()
                   }()
           } :
           function (fn) {
               loaded ? fn() : fns.push(fn)
           })
   }




    return domReady();





});
