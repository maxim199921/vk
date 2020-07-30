import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from "./staticComponent/chat/chat.component";
import {HeaderComponent} from "./staticComponent/header/header.component";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {ChatService} from "./services/chat.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ChatComponent, HeaderComponent],
  imports: [
    CommonModule, RouterModule, MaterialModule, FormsModule
  ],
  providers: [ ChatService ],
  exports: [ChatComponent, HeaderComponent]
})
export class SharedModule { }
