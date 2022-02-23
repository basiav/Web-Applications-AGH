import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  persistencyModel!: string;
  models = ['LOCAL', 'SESSION', 'NONE'];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  setModel(model: string): void {
    
  }

}
