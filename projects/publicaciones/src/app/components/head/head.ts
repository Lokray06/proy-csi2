import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-head',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './head.html',
  styleUrl: './head.css'
})
export class Head {

}
