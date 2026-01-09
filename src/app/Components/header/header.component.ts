import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
userData:any;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
     this.userData =  this.authservice.getCurrentUserData()();
  }
}
