"use strict";
/*jshint node: true */

d3.chart("Sankey.Base").extend("Sankey", {

  initialize: function() {
    var chart = this;

    chart.d3.sankey = d3.sankey();
    chart.d3.path = chart.d3.sankey.link();
    chart.d3.sankey.size([chart.features.width, chart.features.height]);

    chart.features.spread = false;
    chart.features.iterations = 32;
    chart.features.nodeWidth = chart.d3.sankey.nodeWidth();
    chart.features.nodePadding = chart.d3.sankey.nodePadding();

    chart.layers.links = chart.layers.base.append("g").classed("links", true);
    chart.layers.nodes = chart.layers.base.append("g").classed("nodes", true);


    chart.on("change:sizes", function() {
      chart.d3.sankey.nodeWidth(chart.features.nodeWidth);
      chart.d3.sankey.nodePadding(chart.features.nodePadding);
    });

    chart.layer("links", chart.layers.links, {
      dataBind: function(data) {
        return this.selectAll(".link").data(data.links);
      },

      insert: function() {
        return this.append("path").classed("link", true);
      },

      events: {
        "enter": function() {
          this.on("mouseover", function(e) { chart.trigger("link:mouseover", e); });
          this.on("mouseout",  function(e) { chart.trigger("link:mouseout",  e); });
          this.on("click",     function(e) { chart.trigger("link:click",     e); });
        },

        "merge": function() {
          this
            .attr("d", chart.d3.path)
            .style("stroke", colorLinks)
            .style("stroke-width", function(d) { return Math.max(1, d.dy); })
            .sort(function(a, b) { return b.dy - a.dy; });
        },

        "exit": function() {
          this.remove();
        }
      }
    });

    chart.layer("nodes", chart.layers.nodes, {
      dataBind: function(data) {
        return this.selectAll(".node").data(data.nodes);
      },

      insert: function() {
        return this.append("g").classed("node", true);
      },

      events: {
        "enter": function() {
          this.append("rect");
          this.append("text")
            .attr("dy", ".35em")
            .attr("transform", null);

          this.on("mouseover", function(e) { chart.trigger("node:mouseover", e); });
          this.on("mouseout",  function(e) { chart.trigger("node:mouseout",  e); });
          this.on("click",     function(e) { chart.trigger("node:click",     e); });
        },

        "merge": function() {
          this.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          this.select("rect")
            .attr("height", function(d) { return d.dy; })
            .attr("width", chart.features.nodeWidth)
            .style("fill", colorNodes)
            .style("stroke", function(d) { return d3.rgb(colorNodes(d)).darker(2); });

          this.select("text")
            .text(chart.features.name)
            .attr("y", function(d) { return d.dy / 2; })
            .attr("x", function(d) { return hasTextLeft(d) ? (6 + chart.features.nodeWidth) : -6; })
            .attr("text-anchor", function(d) { return hasTextLeft(d) ? "start" : "end"; });
        },

        "exit": function() {
          this.remove();
        }
      }
    });

    function hasTextLeft(node) {
      return node.x < chart.features.width / 2;
    }

    function colorNodes(node) {
      if (typeof chart.features.colorNodes === 'function') {
        // allow using d3 scales, but also custom function with node as 2nd argument
        return chart.features.colorNodes(chart.features.name(node), node);
      } else {
        return chart.features.colorNodes;
      }
    }

    function colorLinks(link) {
      if (typeof chart.features.colorLinks === 'function') {
        // always expect custom function, there's no sensible default with d3 scales here
        return chart.features.colorLinks(link);
      } else {
        return chart.features.colorLinks;
      }
    }
  },


  transform: function(data) {
    var chart = this;

    chart.data = data;

    chart.d3.sankey
      .nodes(data.nodes)
      .links(data.links)
      .layout(chart.features.iterations);

    if (this.features.spread) { this._spreadNodes(data); }

    return data;
  },


  iterations: function(_) {
    if (!arguments.length) { return this.features.iterations; }
    this.features.iterations = _;

    if (this.data) { this.draw(this.data); }

    return this;
  },


  nodeWidth: function(_) {
    if (!arguments.length) { return this.features.nodeWidth; }
    this.features.nodeWidth = _;

    this.trigger("change:sizes");
    if (this.data) { this.draw(this.data); }

    return this;
  },


  nodePadding: function(_) {
    if (!arguments.length) { return this.features.nodePadding; }
    this.features.nodePadding = _;

    this.trigger("change:sizes");
    if (this.data) { this.draw(this.data); }

    return this;
  },


  spread: function(_) {
    if (!arguments.length) { return this.features.spread; }
    this.features.spread = _;

    if (this.data) { this.draw(this.data); }

    return this;
  },


  _spreadNodes: function(data) {
    var chart = this,
        nodesByBreadth = d3.nest()
        .key(function(d) { return d.x; })
        .entries(data.nodes)
        .map(function(d) { return d.values; });

    nodesByBreadth.forEach(function(nodes) {
      var i,
          node,
          sum = d3.sum(nodes, function(o) { return o.dy; }),
          padding = (chart.features.height - sum) / nodes.length,
          y0 = 0;
      for (i = 0; i < nodes.length; ++i) {
        node = nodes[i];
        node.y = y0;
        y0 += node.dy + padding;
      }
    });
  }

});
