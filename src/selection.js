"use strict";
/*jshint node: true */

// Sankey diagram with a hoverable selection
d3.chart("Sankey").extend("Sankey.Selection", {

  initialize: function() {
    var chart = this;

    chart.features.selection = null;
    chart.features.unselectedOpacity = 0.2;

    chart.on("link:mouseover", chart.selection);
    chart.on("link:mouseout", function() { chart.selection(null); });
    chart.on("node:mouseover", chart.selection);
    chart.on("node:mouseout", function() { chart.selection(null); });

    // going through the whole draw cycle can be a little slow, so we use
    // a selection changed event to update existing nodes directly
    chart.on("change:selection", updateTransition);
    this.layer("links").on("enter", update);
    this.layer("nodes").on("enter", update);

    function update() {
      /*jshint validthis:true */
      if (chart.features.selection && chart.features.selection.length) {
        return this.style("opacity", function(o) {
          return chart.features.selection.indexOf(o) >= 0 ? 1 : chart.features.unselectedOpacity;
        });
      } else {
        return this.style("opacity", 1);
      }
    }

    function updateTransition() {
      var transition = chart.layers.base.selectAll('.node, .link').transition();
      if (!chart.features.selection || !chart.features.selection.length) {
        // short delay for the deselect transition to avoid flicker
        transition = transition.delay(100);
      }
      update.apply(transition.duration(50));
    }
  },

  selection: function(_) {
    if (!arguments.length) { return this.features.selection; }
    this.features.selection = (!_ || _ instanceof Array) ? _ : [_];

    this.trigger("change:selection");

    return this;
  },

  unselectedOpacity: function(_) {
    if (!arguments.length) { return this.features.unselectedOpacity; }
    this.features.unselectedOpacity = _;

    this.trigger("change:selection");

    return this;
  }

});
