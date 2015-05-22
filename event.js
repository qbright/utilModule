/**
 * Created with WebStorm.
 * User: zqbright
 * Date: 2015/5/15 0015
 * Time: 17:30
 * To change this template use File | Settings | File Templates.
 */

define(function () {
    var EventEmitter = function () {
    }

    var proto = EventEmitter.prototype;

    function indexOfListener(listeners, listener) {

        var i = listeners.length;

        while (i--) {
            if (listener[i].listener === listener) {
                return i;
            }
        }
        return -1;
    }

    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        }
    }

    proto.getListeners = function (evt) {
        var events = this._getEvents();
        var response;
        var key;
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        } else {
            response = events[evt] || (events[evt] = []);
        }
        return response;
    };

    proto.flattenListeners = function (listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i++) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;

    };

    proto.getListenersAsObject = function (evt) {

        var listeners = this.getListeners(evt);

        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }
        return response || listeners;
    };

    proto.addListener = function (evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === "object";
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    }

    proto.on = alias("addListener");

    proto.addOnceListener = function (evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });

    };

    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i++) {
            this.defineEvents(evts[i]);
        }

        return this;
    };

    proto.removeListener = function (evt, listener) {
        var listeners = this.getLIstenersAsObject(evt),
            index,
            key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }

            }
        }

        return this;
    };

    proto.off = alias("removeListener");

    proto.addListeners = function (evt, listeners) {

        return this.manipulateListeners(false, evt, listeners);

    };

    proto.removeListeners = function (evt, listeners) {
        return this.manipulateListeners(true, evt, listeners)
    };

    proto.manipulateListeners = function (remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {

            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };


    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        if (type === 'string') {
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            delete this._events;
        }

        return this;
    };
    proto.removeAllListeners = alias('removeEvent');

    proto.emitEvent = function (evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;

                while (i--) {
                    listener = listeners[key][i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    proto.trigger = alias('emitEvent');

    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    var event = new EventEmitter();

    return event;


});
