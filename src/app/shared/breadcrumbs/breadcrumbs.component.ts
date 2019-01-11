import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  title: string;
  constructor( private router: Router,
               private metaTitle: Title,
               private meta: Meta) {
    this.getDataRouter()
      .subscribe( data => {
        /*console.log(data);*/
        this.title = data.title;
        this.metaTitle.setTitle(data.title);
        const metaTag: MetaDefinition = {
          name: 'description',
          content: data.description
        };
        this.meta.updateTag(metaTag);
      });
  }

  ngOnInit() {
  }

  getDataRouter() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data )
    );
  }

}
