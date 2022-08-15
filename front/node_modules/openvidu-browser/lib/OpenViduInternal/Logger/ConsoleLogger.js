"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(console) {
        this.logger = console;
        this.log = window.console.log,
            this.info = window.console.info,
            this.debug = window.console.debug,
            this.warn = window.console.warn,
            this.error = window.console.error;
    }
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map