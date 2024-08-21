import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  Observable,
  tap,
} from 'rxjs';

type Status = 'initial' | 'pending' | 'success' | 'error';
type FeedbackResponse = { status: 'success' | 'error' };

@Injectable({ providedIn: 'root' })
export class FeedbackDialogService {
  readonly http = inject(HttpClient);

  private status$ = new BehaviorSubject<Status>('initial');

  getStatus(): Observable<Status> {
    return this.status$.asObservable();
  }

  sendFeedback({
    name,
    feedback,
    satisfaction,
  }: {
    name: string;
    feedback: string;
    satisfaction: string;
  }): Observable<FeedbackResponse> {
    this.status$.next('pending');

    return this.http
      .post<FeedbackResponse>('/feedback', { name, feedback, satisfaction })
      .pipe(
        delay(2000),
        tap(() => this.status$.next('success')),
        catchError(() => {
          this.status$.next('error');
          return EMPTY;
        })
      );
  }
}
