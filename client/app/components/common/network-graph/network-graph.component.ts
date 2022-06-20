import { Component, OnInit, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataSet, Network } from "vis-network/standalone";

import { Settings } from '../../../app.settings';

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss']
})
export class NetworkGraphComponent implements OnInit, AfterViewInit {
  @Input() label = '';
  @Input() data = {
    nodes: [],
    edges: []
  };
  @Input() options = {};

  network: any;
  protectedData: {
    nodes: any,
    edges: any
  };
  protectedOptions = {
    autoResize: true,
    height: '600px',
    width: '600px',
    locale: 'en',
    clickToUse: false,
    interaction: {hover: true},
    layout: {
      improvedLayout: false
    },
    nodes: {
        shape: 'dot',
        font: {
            color: '#000000',
            face: Settings.bodyFont
        },
        borderWidth: 2,
        scaling: {
          label: {
            min: 8,
            max: 20
          }
        },
        shadow: true
    },
    edges: {
        width: 2,
        shadow: true,
        font: {
            color: '#000000',
            face: Settings.bodyFont
        },
    },
    groups: {
      inscriptions: {
        color: {border: '#003B1F', background: '#76B295'},
        shape: 'hexagon',
        size: 40
      },
      institutions: {
          color: {border:'#0D083B', background: '#383276'},
          shape: 'square'
      },
      people: {
          shape: 'dot',
          color: {border: '#551600', background: '#AA5639'}
      },
      honors: {
          shape: 'diamond',
          color: {border: '#554200', background: '#AA9139'}
      }
    }
  };

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    // update with any specific different options
    this.protectedOptions = Object.assign(this.options, this.protectedOptions);
  }

  ngAfterViewInit(): void {
    const container = document.getElementById("vis-network");
    const data = {
      nodes: new DataSet<any>(this.protectedData.nodes),
      edges: new DataSet<any>(this.protectedData.edges)
    };
    this.network = new Network(container, data, this.protectedOptions);
    this.network.on('click', (properties: any) => {
      const ids = properties.nodes;
      const clickedNodes = data.nodes.get(ids);
      const firstNode = clickedNodes [0];
      this._router.navigate(['/' + firstNode.group + '/' + firstNode.id]);
    });
    this.network.on("stabilizationProgress", (params: any) => {
      var maxWidth = 496;
      var minWidth = 20;
      var widthFactor = params.iterations/params.total;
      var width = Math.max(minWidth,maxWidth * widthFactor);
      document.getElementById('vis-bar').style.width = width + 'px';
      document.getElementById('vis-text').innerHTML = Math.round(widthFactor*100) + '%';
    });
    this.network.on("stabilizationIterationsDone", () => {
      document.getElementById('vis-text').innerHTML = '100%';
      document.getElementById('vis-bar').style.width = '496px';
      document.getElementById('vis-loading-bar').style.opacity = '0';
      // really clean the dom element
      setTimeout(function () {document.getElementById('vis-loading-bar').style.display = 'none';}, 500);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // copy new data
    this.protectedData = changes['data'].currentValue;
    // update with any specific different options
    this.protectedOptions = Object.assign(this.protectedOptions, changes['options'].currentValue);
  }

}
