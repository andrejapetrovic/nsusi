import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ITab } from '../view-models/ITab';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  closableTabs: ITab[] = [];

  @ViewChild('tabs')
  tabset: NgbTabset;

  constructor() {

  }

  ngOnInit() {
  }
  
  closeTab(tab: ITab, $event) {
    $event.preventDefault();
    let idx = this.closableTabs.indexOf(this.closableTabs.find(t => t.id === tab.id));
    this.closableTabs.splice(idx, 1);
 
  }
  
  createUniqueTab(newTab: ITab) {
    let tab = this.closableTabs.find( tab => tab.id === newTab.id);
    if (!tab) {
      tab = newTab;
      let idx = this.tabset.tabs.last.id.split('-')[2];
      tab.position = (parseInt(idx)+1).toString();
      this.closableTabs.push(tab);
    }
    this.tabset.activeId = "ngb-tab-" + tab.position;
  }
}
