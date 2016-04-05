"use strict";
var ReactiveModel = (function () {
    function ReactiveModel() {
        // fields
        this._events = {};
    }
    // methods
    /**
     * Helper function used to create model listeners
     *
     * @protected
     * @param {string} event Name of the event
     * @param {Function} callback Event function
     */
    ReactiveModel.prototype.on = function (event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    };
    /**
     * Helper function for triggering model events
     *
     * @protected
     * @param {string} event Name of the event
     * @param {...any[]} params Event parameters
     */
    ReactiveModel.prototype.trigger = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this._events[event]) {
            return;
        }
        for (var _a = 0, _b = this._events[event]; _a < _b.length; _a++) {
            var callback = _b[_a];
            callback.apply(void 0, params);
        }
    };
    return ReactiveModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactiveModel;
