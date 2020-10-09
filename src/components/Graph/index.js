import Element from '../Element';
import "jointjs/dist/joint.css";
require('jquery');
require('lodash');
require('backbone');
window.joint = require('jointjs');
var joint = window.joint;

joint.V.matrixToTransformString = function (matrix) {
    // eslint-disable-next-line
    matrix || (matrix = true);
    return 'matrix(' + [
        matrix.a || 1,
        matrix.b || 0,
        matrix.c || 0,
        matrix.d || 1,
        matrix.e || 0,
        matrix.f || 0
    ] + ')';
};

joint.V.prototype.transform = function (matrix, opt) {
    var node = this.node;
    if (joint.V.isUndefined(matrix)) {
        return node.parentNode ?
            this.getTransformToElement(node.parentNode) :
            node.getScreenCTM();
    }
    if (opt && opt.absolute) {
        return this.attr('transform', joint.V.matrixToTransformString(matrix));
    }
    var svgTransform = joint.V.createSVGTransform(matrix);
    node.transform.baseVal.appendItem(svgTransform);
    return this;
};

/**
 * @name Graph
 * @classdesc Represents a graph.
 * @mixes pcui.IFocusable
 */
class Graph extends Element {
    /**
     * Creates a new Graph.
     *
     * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
     * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the text. Otherwise textContent will be used instead.
     * @param {number} [args.nodeCount=100] - Amount of nodes to render (each node contains 8-24 links depending on it's position)
     */
    constructor(args) {
        if (!args) args = {};

        super(args.dom ? args.dom : document.createElement('div'), args);
        var els = [];
        var graph = new joint.dia.Graph();

        var paper = new joint.dia.Paper({
            el: this.dom,
            model: graph,
            width: this.dom.offsetWidth,
            height: this.dom.offsetWidth * 0.6,
            gridSize: 10,
            drawGrid: true,
            defaultConnector: {
                name: 'smooth'
            },
            background: {
                color: 'rgba(0, 255, 0, 0.3)'
            }
        });
        window.parent.parent.paper = paper;
        window.parent.parent.graph = graph;
        window.parent.parent.dom = this.dom;

        const nodeCount = args.nodeCount || 100;

        var nodes = {};
        var i, j;
        for (i = 0; i < Math.floor(Math.sqrt(nodeCount)); i++) {
            for (j = 0; j < Math.floor(Math.sqrt(nodeCount)); j++) {
                var rect = new joint.shapes.standard.Rectangle();
                rect.position(i * 90, j * 70);
                rect.resize(50, 30);
                rect.attr({
                    body: {
                        fill: 'blue'
                    },
                    label: {
                        text: 'node',
                        fill: 'white'
                    }
                });
                nodes[`${i}-${j}`] = rect;
                els.push(rect);
            }
        }

        for (i = 1; i < Math.floor(Math.sqrt(nodeCount)); i++) {
            for (j = 1; j < Math.floor(Math.sqrt(nodeCount)); j++) {
                var link;
                link = new joint.shapes.standard.Link();
                link.target(nodes[`${i - 1}-${j - 1}`]);
                link.source(nodes[`${i}-${j}`]);
                link.attr({
                    line: {
                        strokeWidth: 1,
                        sourceMarker: null,
                        targetMarker: null
                    }
                });
                els.push(link);
                link = new joint.shapes.standard.Link();
                link.target(nodes[`${i}-${j - 1}`]);
                link.source(nodes[`${i}-${j}`]);
                link.attr({
                    line: {
                        strokeWidth: 1,
                        sourceMarker: null,
                        targetMarker: null
                    }
                });
                els.push(link);
                link = new joint.shapes.standard.Link();
                link.target(nodes[`${i - 1}-${j}`]);
                link.source(nodes[`${i}-${j}`]);
                link.attr({
                    line: {
                        strokeWidth: 1,
                        sourceMarker: null,
                        targetMarker: null
                    }
                });
                els.push(link);
                if (i < Math.floor(Math.sqrt(nodeCount)) - 1) {
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i + 1}-${j - 1}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                }

                if (i < Math.floor(Math.sqrt(nodeCount)) - 1 && i > 1 && j < Math.floor(Math.sqrt(nodeCount)) - 1 && j > 1) {
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i - 1}-${j - 2}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i + 1}-${j - 2}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i - 2}-${j - 1}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i - 2}-${j + 1}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                }
                if (i < Math.floor(Math.sqrt(nodeCount)) - 1 && i > 2 && j < Math.floor(Math.sqrt(nodeCount)) - 1 && j > 2) {
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i - 1}-${j - 3}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i + 1}-${j - 3}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i - 3}-${j - 1}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                    link = new joint.shapes.standard.Link();
                    link.target(nodes[`${i - 3}-${j + 1}`]);
                    link.source(nodes[`${i}-${j}`]);
                    link.attr({
                        line: {
                            strokeWidth: 1,
                            sourceMarker: null,
                            targetMarker: null
                        }
                    });
                    els.push(link);
                }
            }
        }
        graph.addCells(els);
        var scale = 1.0;
        paper.el.addEventListener('mousewheel', e => {
            e.preventDefault();
            scale -= e.deltaY * 0.01;
            if (scale < 0.25) scale = 0.25;
            if (scale > 1.5) scale = 1.5;
            paper.scale(scale);
        });
    }
}

export default Graph;
