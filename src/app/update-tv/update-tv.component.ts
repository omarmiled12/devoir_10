import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvService } from '../services/tv.service';
import { Tv } from '../model/tv.model';
import { Marque } from '../model/marque.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email-validator'; 

@Component({
  selector: 'app-update-tv',
  templateUrl: './update-tv.component.html',
  styleUrls: ['./update-tv.component.css']
})
export class UpdateTvComponent implements OnInit {
  marques!: Marque[];
  updatedMarId!: number;
  currentTv = new Tv();
  updateTvForm!: FormGroup; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tvService: TvService,
    private fb: FormBuilder 
  ) { }

  ngOnInit() {
    this.marques = this.tvService.listeMarques();
    this.currentTv = this.tvService.consulterTv(this.activatedRoute.snapshot.params['id']);
    this.updatedMarId = this.currentTv.marque.idMar;

    this.updateTvForm = this.fb.group({
      email: [this.currentTv.email, [Validators.required, emailValidator()]],
      nomTv: [this.currentTv.nomTv, [Validators.required, Validators.minLength(3)]],
      prixTv: [this.currentTv.prixTv, [Validators.required]],
      dateCreation: [this.currentTv.dateCreation, [Validators.required]],
    });
  }

  emailInvalid(): boolean {
    const email = this.updateTvForm.get('email')?.value;
    return email && !(email.includes('@') && email.includes('.com'));
  }

  updateTv() {
    if (this.updateTvForm.invalid) {
      return; 
    }
    this.currentTv.marque = this.tvService.consulterMarque(this.updatedMarId);
    this.currentTv.email = this.updateTvForm.get('email')?.value;
    this.tvService.updateTv(this.currentTv);
    this.router.navigate(['tvs']);
  }
}
