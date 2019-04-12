import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mimea-frontend';
  channels = '-blockchain offline-';

  constructor(private http: HttpClient,
              private router: Router) {
    this.http.get('http://localhost:3000/').subscribe((data: any) => {
      this.title = data.msg;
    });

    this.http.get('http://localhost:3000/channels').subscribe((data: any) => {
      console.log('Blockchain data:', data);
      this.channels = data;
    })
  }

  public sayHello(): void {
    console.log('Hello!');
  }
}
