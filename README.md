d3.chart.sankey
===============

Reusable [D3](http://d3js.org/) Sankey [diagram](https://www.npmjs.com/package/d3-plugins-sankey)
using [d3.Chart](http://misoproject.com/d3-chart/).

## Usage

Include `d3`, `sankey` and `d3.chart` before `d3.chart.sankey`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
<script src="https://raw.githubusercontent.com/newrelic-forks/d3-plugins-sankey/v1.1.0/sankey.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3.chart/0.2.1/d3.chart.min.js"></script>
<script src="d3.chart.sankey.min.js"></script>
```

Then build the chart:
```js
var chart = d3.select("#chart").append("svg").chart("Sankey");
chart.draw({nodes: [/*...*/], links: [/*...*/]});
```

The chart object supports various ways to customize the diagram:
```js
chart
  .nodeWidth(24)    // width of node
  .nodePadding(8)   // vertical space between nodes
  .iterations(32)   // number of layout iterations
  .name(function(n) { return n.name; })               // node label
  .colorNodes('red')                                  // color for nodes
  .colorNodes(d3.chart.category20c())                 // ... or a color scale
  .colorNodes(function(name, node) { return 'red'; }) // ... or a function
  .colorLinks('yellow')                               // color for labels
  .colorLinks(function(link) { /* ... */ });          // ... or a function
```

The following events are emitted on the chart:
`node:mouseover`, `node:mouseout`, `node:click`,
`link:mouseover`, `link:mouseout`, `link:click`.
For example:
```js
chart.on('node:click', function(node) {
  alert('Clicked on ' + node.name);
});
```

## Building

You'll need [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/). To fetch required dependencies, run the following commands from the root of this repository:
```sh
$ npm install
$ bower install
```

After this, the project can be built by invoking Grunt from within this repository:
```sh
$ grunt
```

To build the project along with a minified version of the library, run `grunt release`.
