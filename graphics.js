function addNode(n) {
	var p = nodePosition(n);

	var c = elm("circle", {
		cx: p.x,
		cy: p.y,
		r: CIRCLE_SIZE,
		style: `fill: hsl(${n / NUM_NODES * 360}, 80%, 50%)`
	});

	ROOT.appendChild(c);

	var t = elm("text", {
		x: p.x * 1.1,
		y: p.y * 1.1,
		"font-size": 0.05,
		"text-anchor": "middle",
		fill: "black"
	});

	t.innerHTML = "" + n;

	ROOT.appendChild(t);

	var l = elm("text", {
		id: "nl-" + n,
		x: p.x,
		y: p.y - 0.025,
		"font-size": 0.05,
		"text-anchor": "middle",
		fill: "black"
	});

	ROOT.appendChild(l);
}

function setNodeContent(n, t){
	document.querySelector("#n1-" + n).innerHTML = t;
}

function addEdge(n1, n2) {
	var p1 = nodePosition(n1);
	var p2 = nodePosition(n2);

	var l = elm("line", {
		x1: p1.x,
		x2: p2.x,
		y1: p1.y,
		y2: p2.y,
		style: `stroke: hsl(${n1 / NUM_NODES * 360}, 70%, 50%); z-index:${n1}`,
		"stroke-width": 0.005,
		class: `edge e${n1} e${n2}`
	});

	ROOT.appendChild(l);
}

function removeEdge(n1, n2) {
	Array.from(document.querySelectorAll(`.edge.e${n1}.e{n2}`))
		.forEach(l => l.parentElement.removeChild(l));
}

function makeNodes(n) {
	while (n--)
		addNode(n);
}

function nodePosition(n) {
	var percent = n / NUM_NODES;
	var rad = PERCENT_TO_RAD * percent;
	var x = Math.sin(rad);
	var y = Math.cos(rad);
	var w = Math.sin(rad * WOBBLE) * WOBBLE_RAD;

	return {
		x: x * CENTER_RAD + x * w,
		y: y * CENTER_RAD + y * w
	};
}

function elm(name, attributes) {
	var e = document.createElementNS(SVGNS, name);

	for (var key in attributes)
		e.setAttribute(key, attributes[key]);

	return e;
}

function clearLines() {
	Array.from(document.querySelectorAll("line")).forEach(function (line) {
		line.parentElement.removeChild(line);
	});
}