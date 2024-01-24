import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private router: Router, public dialog: MatDialog){}

  openDialog() {
    const dialogRef = this.dialog.open(UserRegistrationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openRegister(){
    this.router.navigate(['/user-registration'])
  }

}
