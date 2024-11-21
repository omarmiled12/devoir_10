import { Component, OnInit } from '@angular/core';
import { TvService } from '../services/tv.service';
import { Tv } from '../model/tv.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tvs',
  templateUrl: './tvs.component.html',
})
export class TvsComponent implements OnInit {
  tvs: Tv[]; 

  constructor(private tvService: TvService,
    public authService: AuthService
  ) {
    this.tvs = tvService.listeTvs(); 
    
  }

  ngOnInit(): void {}

  supprimerTv(t: Tv) {
    let conf = confirm('Etes-vous sûr ?'); // Confirm deletion
    if (conf) {
      this.tvService.supprimerTv(t); // Call service to delete the TV
      this.tvs = this.tvService.listeTvs(); // Refresh the list after deletion
    }
  }
}
