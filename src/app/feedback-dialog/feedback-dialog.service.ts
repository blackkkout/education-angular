import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

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
  }): Observable<void> {
    this.status$.next('pending');

    return this.http
      .post<FeedbackResponse>('/feedback', { name, feedback, satisfaction })
      .pipe(
        map((response) => {
          if (response.status === 'success') {
            this.status$.next('success');
          } else {
            this.status$.next('error');
          }
        }),
        catchError(() => {
          this.status$.next('error');
          return of();
        })
      );
  }
}
