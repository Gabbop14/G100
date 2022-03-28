import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService, Media } from 'src/app/services/breakpoint.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

interface DrinkNode {
  name: string;
  children?: DrinkNode[];
  icon?: string;
  omited?: string;
}

const TREE_DATA = [
  {
    name: 'DESTACADOS',
    icon: 'whatshot',
    omited: 'yes',
  },
  {
    name: 'OFERTAS',
    icon: 'regalo',
  },
  {
    name: 'Cervezas',
    icon: 'etiqueta',
    children: [
      {
        name: 'Latas 473cc'
      },
      {
        name: 'Botellas',
        children: [
          {
            name: 'Botella 1L',
          }
        ]
      }
    ]
  },
  {
    name: 'Vinos',
    icon: 'etiqueta',
    children: [
      {
        name: 'Malbec'
      }
    ]
  },
  {
    name: 'Champagne',
    icon: 'etiqueta',
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
    icon: 'etiqueta',
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

  generalSubscriptions = new Subscription();

    media: Observable<Media>; 

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

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,

    private breakpointService: BreakpointService
  ) {
    this.media = this.breakpointService.currentMediaQuery;

    this.categorias = TREE_DATA;

    //* Registro de iconos
    this.matIconRegistry
    .addSvgIcon(
      'etiqueta',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tag.svg')
    )

    .addSvgIcon(
      'regalo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gift.svg')
    )

    .addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg')
    )

    .addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    )
   }

   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  panelOpenState = false;

}

