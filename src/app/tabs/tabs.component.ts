import { Component, OnInit, ViewChild, ViewChildren, QueryList, Directive, Input, Output, EventEmitter } from '@angular/core';

import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';


export interface ITab {
  id: string;
  name: string;
  unique: boolean;
  studId?: string;
}


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  public closableTabs: ITab[] = [];

  @ViewChild('tabs')
  public tabset: NgbTabset;

  constructor() {
  }

  ngOnInit() {
  }
  
  closeTab(tab: ITab, $event) {
    $event.preventDefault();
    this.closableTabs = this.closableTabs.filter(t => t.id !== tab.id);
  }
  
  createUniqueTab(id, name) {
    if (this.closableTabs.filter(tab => tab.id === id).length == 0) {
      this.closableTabs.push({id: id, name: name, unique: true});
      this.tabset.activeId = "ngb-tab-" + (this.closableTabs.length + 1);
    }
  }



}
