import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { IPerson } from 'src/app/interfaces/IPerson';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink]
})
export class PersonDetailComponent  implements OnInit {

	@Input() person! : IPerson;
	
  constructor() { }

  ngOnInit() {console.log(this.person)}

  private platform = inject(Platform);
  isIos() {
    return this.platform.is('ios')
  }
}
