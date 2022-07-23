import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'da-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  @Output() cancelRegisterEvent = new EventEmitter();
  errorText = '';
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.user).subscribe(
      {
        next: () => {},
        error: error => this.errorText = error.error,
        complete: () => this.cancel()
      }
    );
  }

  cancel() {
    this.cancelRegisterEvent.emit(false);
  }

}
