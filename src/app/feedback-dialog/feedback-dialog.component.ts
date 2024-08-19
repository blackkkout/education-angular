import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackDialogService } from './feedback-dialog.service';

@Component({
  selector: 'feedback-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIcon,
  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
})
export class FeedbackDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FeedbackDialogComponent>);
  readonly snackBar = inject(MatSnackBar);
  readonly feedbackService = inject(FeedbackDialogService);

  readonly status = signal<'initial' | 'pending' | 'success' | 'error'>(
    'initial'
  );

  readonly feedbackForm = new FormGroup({
    feedback: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    satisfaction: new FormControl(''),
  });

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.status.set('pending');
      this.feedbackService
        .sendFeedback(
          this.feedbackForm.value.feedback!,
          this.feedbackForm.value.satisfaction!
        )
        .subscribe((response) => {
          if (response.status === 'success') {
            this.status.set('success');
            this.dialogRef.close(this.status());
            this.snackBar.open('Thank you for your feedback!');
          } else {
            this.status.set('error');
            this.dialogRef.close(this.status());
            this.snackBar.open(
              'An error occurred while sending your feedback.'
            );
          }
        });
    }
  }
}
