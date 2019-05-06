import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public navLinks =
    [
      { label: 'Latest', path: 'sensor' },
      { label: 'Historical data', path: 'sensor_list' }];
  title = 'Cloud Fishtank';
}
