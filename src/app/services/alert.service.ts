import { Injectable } from '@angular/core';
declare let alertify : any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { 
    alertify.set('notifier','position', 'bottom-center');
  }

  confirm(message: string, okCallback: () => any, cancelCallBack: () => any) {
    alertify.confirm("F.M.S.",'<p class="text-justify">'+message+'</p>', okCallback, cancelCallBack);
  }

  alert(message: string) {
    alertify.alert("F.M.S.",'<p class="text-justify">'+message+'</p>');
  }

  success(message: string) {
    
    alertify.success('<p class="text-justify">'+message+'</p>');
  }

  error(message: string) {
    alertify.error('<p class="text-justify">'+message+'</p>');
  }

  warning(message: string) {
    alertify.warning('<p class="text-justify">'+message+'</p>');
  }

  message(message: string) {
    alertify.message('<p class="text-justify">'+message+'</p>');
  }
}
