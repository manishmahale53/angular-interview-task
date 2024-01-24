import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  totalUsers:any = []

  constructor(private service: DataService){

  }

  ngOnInit(): void {
    this.getData();
  }
 
  fileToUpload: any = null
  imageUrl: string = ''

  handleFileInput(files: any){
    console.log(files.target.files.item(0))
     this.fileToUpload = files.target.files.item(0)

     const reader = new FileReader();
     reader.onload = (event: any) => {
      console.log(event)
      this.imageUrl = event.target.result
    }
     reader.readAsDataURL(this.fileToUpload)
  }


  getData(){
    this.service.getUserData().subscribe((res)=>{
      if(res){
        this.totalUsers = res
        console.log('total users', this.totalUsers)
      }
    })
  }

}
