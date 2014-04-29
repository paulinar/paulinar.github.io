$(document).ready(function() {
  console.log('hi');
  var width = 1000,
    height = 800,
    root;
 
var force = d3.layout.force()
    .linkDistance(110)
    .charge(-220)
    .gravity(.05)
    .size([width, height])
    .on("tick", tick);
 
var svg = d3.select("#my-corporations").append("svg")
    .attr("width", width)
    .attr("height", height);
 
var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");
 
root = {
 "name": "Pepsico", "size": 200000,
 "children": [
  {
   "name": "Quaker Company Division", "size":90000,
   "children": [
    {
     "name": "Life", "size":20000
    },
    {
     "name": "Aunt Jemima", "size":20000
    },
    {
     "name": "Crispy Minis", "size":20000
    },
    {
     "name": "Harvest Crunch", "size":20000
    },
    {
     "name": "Captain Crunch", "size":20000
    },
    {
     "name": "Chewy", "size":20000
    }
   ]
  },
  {
   "name": "Yum! Restaurant Division", "size":90000,
   "children": [
    {
     "name": "KFC", "size":20000
    },
    {
     "name": "Taco Bell", "size":20000
    },
    {
     "name": "Pizza Hut", "size":20000
    }
   ]
  },
  {
   "name": "Snack Division", "size":90000,
   "children": [
   {
    "name": "Lays", "size":20000 
   },
   {
    "name": "Doritos", "size":20000 
   },
   {
    "name": "Spitz", "size":20000 
   },
   {
    "name": "Sun Chips", "size":20000 
   },
   {
    "name": "Tostitos", "size":20000 
   },
   {
    "name": "Rold Gold", "size":20000 
   },
   {
    "name": "Cracker Jack", "size":20000 
   },
   {
    "name": "Cheetos", "size":20000 
   },
   {
    "name": "Fritos", "size":20000 
   },
   {
    "name": "Ruffles", "size":20000 
   },
   {
    "name": "Miss Vickie's", "size":20000 
   }
   ]
  },
  {
   "name": "Drink Division", "size":90000,
   "children": [
   {
    "name": "Looza", "size":20000 
   },
   {
    "name": "Mirinda", "size":20000 
   },
   {
    "name": "Brisk", "size":20000 
   },
   {
    "name": "Ocean Spray", "size":20000 
   },
   {
    "name": "Mug", "size":20000 
   },
   {
    "name": "Mountain Dew", "size":20000 
   },
   {
    "name": "SoBe", "size":20000 
   },
   {
    "name": "7up", "size":20000 
   },
   {
    "name": "Aquafina", "size":20000 
   },
   {
    "name": "Lipton", "size":20000 
   },
   {
    "name": "Amp Energy", "size":20000 
   },
   {
    "name": "Tropicana", "size":20000 
   },
   {
    "name": "Gatorade", "size":20000 
   },
   {
    "name": "Dole", "size":20000 
   },
   {
    "name": "Pepsi", "size":20000 
   }
   ]
  }
 ]
}

update();
 
function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);
 
  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

 
  // Update links.
  link = link.data(links, function(d) { return d.target.id; });
 
  link.exit().remove();
 
  link.enter().insert("line", ".node")
      .attr("class", "link");
 
  // Update nodes.
  node = node.data(nodes, function(d) { return d.id; });
 
  node.exit().remove();
 
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .on("click", click)
      .call(force.drag);
 
  nodeEnter.append("circle")
      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; });
 
  nodeEnter.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
 
  node.select("circle")
      .style("fill", color);
}
 
function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
 
  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}
 
function color(d) {
  return d._children ? "#3182bd" // collapsed package
      : d.children ? "#c6dbef" // expanded package
      : "#fd8d3c"; // leaf node
}
 
// Toggle children on click.
function click(d) {
  if (d3.event.defaultPrevented) return; // ignore drag
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update();
}
 
// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;
 
  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }
 
  recurse(root);
  return nodes;
}

});

