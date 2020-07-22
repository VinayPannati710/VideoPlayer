import { Observable, pipe, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from './video';
import { map, catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private _getUrl = "/api/videos"
  private _postUrl = '/api/video'
  private _putUrl = "/api/video/"
  private _deleteUrl = "/api/video/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private _http: HttpClient) { }


  getVideos() {
    return this._http.get<Video>(this._getUrl)
      .pipe(map(response => response))
  }
  /** POST: add a new video to the database */
  addVideo(video: Video): Observable<Video> {
    return this._http.post<Video>(this._postUrl, JSON.stringify(video), this.httpOptions)
      .pipe(map(response => response))
  }
  /** PUT: update the video on the server. Returns the updated video upon success. */
  updateVideo(video: Video) {
    return this._http.put(this._putUrl + video._id, video, this.httpOptions)
      .pipe(map(response => response))
}
deleteVideo(video: Video) {
  return this._http.delete(this._deleteUrl + video._id)
    .pipe(map(response => response))
}
}
