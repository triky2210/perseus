/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var _ = require("underscore");
var WrappedDefaults = require("./wrapped-defaults.js");

var DEFAULT_OPTIONS = {
    maxScale: 1,
    mouselayer: false,
    shadow: false,
};

var WrappedEllipse = function(graphie, center, radii, options) {
    options = _.extend({}, DEFAULT_OPTIONS, options);

    // Add `wrapper`, `visibleShape`, and remaining properties.
    const fixedEllipse = graphie.fixedEllipse(
        center, radii, options.maxScale, options.padding);
    _.extend(this, fixedEllipse, {
        graphie: graphie,
        initialPoint: center
    });

    // Add to appropriate graphie layer
    if (options.mouselayer) {
        this.graphie.addToMouseLayerWrapper(this.wrapper);
    } else {
        this.graphie.addToVisibleLayerWrapper(this.wrapper);
    }

    if (options.shadow) {
        const filter = "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.7))";
        const svgElem = this.wrapper;
        svgElem.style.webkitFilter = filter;
        svgElem.style.filter = filter;
    }
};

_.extend(WrappedEllipse.prototype,  WrappedDefaults);

module.exports = WrappedEllipse;
