import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../service/spotify/authorization/authorization.service';
import { WebAPIService } from '../../service/spotify/web-api/web-api.service';
import { WindowRefService } from '../../service/window/window-ref.service';
import User from '../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthorizationService, WebAPIService]
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private authorizationService: AuthorizationService, private webAPIService: WebAPIService,
    private windowRefService: WindowRefService) {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user')) || {};
      }
  }

  ngOnInit() {
  }

  getAuthorizationPage() {
    this.authorizationService.getAuthorizationPage().subscribe(data => {
        const {nativeWindow} = this.windowRefService;
        nativeWindow.location.href = data.text();
      },
      error => console.log(error)
    );
  }

  openProfile() {
    const {nativeWindow} = this.windowRefService;
    const {externalURLs: {spotify: spotifyURL}} = this.user;

    nativeWindow.open(spotifyURL);
  }

  search = (searchTerm) => {
    return this.webAPIService.search(searchTerm);
  }

  getPlaylistFromTopArtists() {
    this.webAPIService.getPlaylistFromTopArtists().subscribe(data => {
        const {playlistTracks} = JSON.parse(data.text());
        const arr = [];
        playlistTracks.forEach(track => {
          arr.push({artist: track.artists[0].name, trackName: track.name});
        });
        console.table(arr);
      },
      error => console.log(error)
    );
  }
}
