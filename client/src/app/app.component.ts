import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mimea-frontend';

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/').subscribe((data: any) => {
      this.title = data.msg;
    })
  }
}
