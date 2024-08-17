import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '340px',
    });
  }
}
