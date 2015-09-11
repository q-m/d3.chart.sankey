"use strict";
/*jshint node: true */

// Sankey diagram with a path-hover effect
d3.chart("Sankey.Selection").extend("Sankey.Path", {

  selection: function(_) {
    var chart = this;

    if (!arguments.length) { return chart.features.selection; }
    chart.features.selection = (!_ || _ instanceof Array) ? _ : [_];

    // expand selection with connections
    if (chart.features.selection) {
      chart.features.selection.forEach(function(o) {
        getConnections(o).forEach(function(p) {
          chart.features.selection.push(p);
        });
      });
    }

    chart.trigger("change:selection");

    return chart;
  }

});

function getConnections(o, direction) {
  if (o.source && o.target) {
    return getConnectionsLink(o, direction);
  } else {
    return getConnectionsNode(o, direction);
  }
}

// Return the link and its connected nodes with their links etc.
function getConnectionsLink(o, direction) {
  var links = [o];
  direction = direction || 'both';

  if (direction == 'source' || direction == 'both') {
    links = links.concat(getConnectionsNode(o.source, 'source'));
  }
  if (direction == 'target' || direction == 'both') {
    links = links.concat(getConnectionsNode(o.target, 'target'));
  }

  return links;
}

// Return the node and its connected links. If direction is 'both', just return
// all links; if direction is 'source', only return the source link when there
// is one target link (or none, in which case the node is an endnode); if
// direction is 'target' vice versa. Open the product example to see why.
function getConnectionsNode(o, direction) {
  var links = [o];
  direction = direction || 'both';

  if ((direction == 'source' && o.sourceLinks.length < 2) || direction == 'both') {
    o.targetLinks.forEach(function(p) { links = links.concat(getConnectionsLink(p, direction)); });
  }
  if ((direction == 'target' && o.targetLinks.length < 2) || direction == 'both') {
    o.sourceLinks.forEach(function(p) { links = links.concat(getConnectionsLink(p, direction)); });
  }

  return links;
}
