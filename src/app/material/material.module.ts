import { NgModule } from '@angular/core';

import { MatButtonModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';

const Material = [
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }

