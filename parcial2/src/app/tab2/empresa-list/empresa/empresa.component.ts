import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, Platform, RefresherCustomEvent } from '@ionic/angular';
import { IEmpresa } from 'src/app/interfaces/IEmpresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, EmpresaComponent, IonicModule],
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent  implements OnInit {

	@Input() empresa!: IEmpresa;

  constructor() { }

  ngOnInit() {}

  private platform = inject(Platform);
  isIos() {
    return this.platform.is('ios')
  }


}
