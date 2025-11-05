import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../servicios/post-service';
import { User } from '../../modelos/user';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  dataService = inject(PostService);

  favoriteColorControl = new FormControl('');

  perfilUsusario = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    website: new FormControl(''),
  })

  cambiaColor() {
    if(this.favoriteColorControl.value === 'Rojo'){
      this.favoriteColorControl.setValue('Verde');
    } else {
      this.favoriteColorControl.setValue('Rojo');
    }
  }

  ngOnInit() {
    this.dataService.getItem<User>('users', 1).subscribe((data: User) => {
      this.perfilUsusario.setValue({
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,
      });
    });
  }

  onSubmit() {
    console.log(this.perfilUsusario.value);
  }
}
