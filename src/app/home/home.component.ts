import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  readonly dialogResult = signal<'success' | 'error' | null>(null);

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '340px',
    });

    dialogRef.afterClosed().subscribe((result: 'success' | 'error') => {
      this.dialogResult.set(result);
    });
  }

  get isDialogSuccess(): boolean {
    return this.dialogResult() === 'success';
  }

  get isDialogError(): boolean {
    return this.dialogResult() === 'error';
  }
}
