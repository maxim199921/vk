import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatBadgeModule,
  MatCheckboxModule
} from '@angular/material';

const SHARED_MAT = [
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatTabsModule,
  MatBadgeModule,
  MatCheckboxModule
];
@NgModule({
  declarations: [],
  imports: [
    SHARED_MAT
  ],
  exports: [
    SHARED_MAT
  ]
})
export class MaterialModule { }
