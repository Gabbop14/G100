import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';

interface DrinkNode {
  name: string;
  children?: DrinkNode[];
  icon?: string;
}

const TREE_DATA = [
  {
    name: 'DESTACADOS',
  },
  {
    name: 'OFERTAS',
  },
  {
    name: 'Cervezas',
    children: [
      {
        name: 'Latas 473cc'
      },
      {
        name: 'Botellas'
      }
    ]
  },
  {
    name: 'Vinos',
    children: [
      {
        name: 'Malbec'
      }
    ]
  },
  {
    name: 'Champagne',
    children: [
      {
        name: 'Jasmine Monet'
      },
      {
        name: 'Nieto Senetiner'
      }
    ]
  },
  {
    name: 'Aperitivos',
    children: [
      {
        name: 'Todos'
      }
    ]
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  private _transformer = (node: DrinkNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  categorias: any; 

  constructor() {
    this.categorias = TREE_DATA;
   }

   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  panelOpenState = false;

}

