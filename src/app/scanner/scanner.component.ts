import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  constructor(
    private alert:AlertService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(){

  }

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }
  onCodeResult(resultString: string) {
    this.beep();
    if(this.auth.getRole() == 2){
      this.router.navigateByUrl(`misequipos/${resultString}`);
    }else{
      this.router.navigateByUrl(`equipos/equipos/${resultString}`);
    }
  }
  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }
  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }
  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }
  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }
  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
  beep() {
    const audio = new Audio('assets/beep.mp3');
    audio.play();
  }
}
