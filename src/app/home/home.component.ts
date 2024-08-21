import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';

type DialogStatus = 'success' | 'error' | null;

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  readonly dialogResult = signal<DialogStatus>(null);

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '340px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        map((status) => ({
          status,
          message:
            status === 'success'
              ? 'Thank you for your feedback!'
              : 'An error occurred while sending your feedback.',
        }))
      )
      .subscribe(({ status, message }) => {
        if (status === 'success') {
          this.dialogResult.set(status);
          this.snackBar.open(message, 'Hide', { duration: 3000 });
        }
      });
  }

  get isDialogSuccess(): boolean {
    return this.dialogResult() === 'success';
  }

  get isDialogError(): boolean {
    return this.dialogResult() === 'error';
  }
}
