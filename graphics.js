
"use strict";

function setupRender(){
	var layout = new Springy.Layout.ForceDirected(GRAPH, STIFFNESS, REPULSION, DAMPENING);
	var renderer = new Springy.Renderer(layout,
		function clear() {
			// Not needed for SVG renderer
		},
		function drawEdge(edge, p1, p2) {
			positionEdge(edge, p1, p2);
		},
		function drawNode(node, p) {
			positionNode(node, p);
		}
	);
}

function positionEdge(edge, p1, p2) {
	var n1 = edge.source.id;
	var n2 = edge.target.id;

	var e = document.querySelector(edgeSelector(n1, n2)) || addEdgeDOM(edge);

	updateElm(e, {
		x1: p1.x,
		x2: p2.x,
		y1: p1.y,
		y2: p2.y,
	});
}

function positionNode(node, point) {
	var id = node.id;
	var nodeElm = document.getElementById(nodeID(id)) || addNodeDOM(node);

	updateElm(nodeElm, {
		transform: `translate(${point.x}, ${point.y})`
	});
}

function addNodeDOM(node) {
	var n = node.id;

	var g = elm("g", {
		id: nodeID(n),
		transform: "translate(0,0)",
	});

	var c = elm("circle", {
		cx: 0,
		cy: 0,
		r: CIRCLE_SIZE,
		style: `fill: hsl(${n / NUM_NODES * 360}, 100%, 50%)`
	});

	g.appendChild(c);

	var t = elm("text", {
		x: 0,
		y: -CIRCLE_SIZE,
		"font-size": CIRCLE_SIZE,
		"text-anchor": "middle",
		fill: "black"
	});

	t.innerHTML = "" + n;

	g.appendChild(t);

	var l = elm("text", {
		id: "nl-" + n,
		x: 0,
		y: LABEL_POSITION,
		"font-size": CIRCLE_SIZE,
		"text-anchor": "middle",
		fill: "black"
	});

	g.appendChild(l);

	ROOT.appendChild(g);

	return g;
}

function setNodeContent(n, t){
	document.querySelector("#n1-" + n).innerHTML = t;
}

function addEdgeDOM(edge) {
	var n1 = edge.source.id;
	var n2 = edge.target.id;

	var l = elm("line", {
		x1: 0,
		x2: 0,
		y1: 0,
		y2: 0,
		style: `stroke: hsl(${n1 / NUM_NODES * 360}, 70%, 50%); z-index:${n1}`,
		"stroke-width": EDGE_SIZE,
		class: edgeID(n1, n2)
	});

	ROOT.appendChild(l);

	return l;
}

function removeEdgeDOM(edge) {
	var n1 = edge.source.id;
	var n2 = edge.target.id;

	Array.from(document.querySelectorAll(edgeSelector(n1, n2)))
		.forEach(l => l.parentElement.removeChild(l));
}

function elm(name, attributes) {
	var e = document.createElementNS(SVGNS, name);

	updateElm(e, attributes);

	return e;
}

function updateElm(e, attributes) {
	for (var key in attributes)
		e.setAttribute(key, attributes[key]);

	return e;
}

function clearLines() {
	Array.from(document.querySelectorAll("line")).forEach(function (line) {
		line.parentElement.removeChild(line);
	});
}