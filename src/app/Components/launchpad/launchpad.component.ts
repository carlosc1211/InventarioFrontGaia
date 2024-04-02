import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/Service/spinner.service';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css']
})
export class LaunchpadComponent implements OnInit{
showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService) {
    
  }

  ngOnInit(): void {
      this.spinnerService.spinnerSubject.subscribe((show: boolean) => {
      this.showSpinner = show;
    });
  }
}
