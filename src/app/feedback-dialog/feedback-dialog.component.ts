import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeedbackDialogService } from './feedback-dialog.service';

@Component({
  selector: 'feedback-dialog',
  standalone: true,
  imports: [
    CommonModule,
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
})
export class FeedbackDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FeedbackDialogComponent>);
  readonly feedbackService = inject(FeedbackDialogService);

  readonly status = toSignal(this.feedbackService.getStatus());

  readonly feedbackForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    feedback: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    satisfaction: new FormControl(''),
  });

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.feedbackService
        .sendFeedback({
          name: this.feedbackForm.value.name!,
          feedback: this.feedbackForm.value.feedback!,
          satisfaction: this.feedbackForm.value.satisfaction!,
        })
        .pipe(tap(() => this.dialogRef.close(this.status())))
        .subscribe();
    }
  }
}
