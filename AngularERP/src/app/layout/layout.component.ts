import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
  // styles: [':host { display: block; }', ':host /deep/ .layout-loading .sidenav-link { transition: none !important; }']
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  // Prevent "blink" effect
  moduleId=-1;
  public initialized = false;

  constructor(private layoutService: LayoutService,private route:ActivatedRoute) {
    this.moduleId = route.snapshot.data['moduleId'];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
      this.layoutService.init();
      this.layoutService.update();
      this.layoutService.setAutoUpdate(true);
    });
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.layoutService.destroy();
    });
  }

  closeSidenav() {
    setTimeout(() => {
      this.layoutService.setCollapsed(true);
    });
  }
}
