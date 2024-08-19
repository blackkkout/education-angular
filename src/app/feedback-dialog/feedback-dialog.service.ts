import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type FeedbackResponse = {
  status: 'success' | 'error';
};

@Injectable({ providedIn: 'root' })
export class FeedbackDialogService {
  readonly http = inject(HttpClient);

  sendFeedback({
    name,
    feedback,
    satisfaction,
  }: {
    name: string;
    feedback: string;
    satisfaction: string;
  }): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>('/feedback', {
      name,
      feedback,
      satisfaction,
    });
  }
}
