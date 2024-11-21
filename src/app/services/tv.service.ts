import { Injectable } from '@angular/core';
import { Tv } from '../model/tv.model';
import { Marque } from '../model/marque.model';

@Injectable({
  providedIn: 'root',
})
export class TvService {


  tvs: Tv[];
  tv!: Tv;
  marques : {idMar: number;nomMar:string}[];
  tvsRecherche!:Tv[];
  

  

  constructor() {
    this.marques = [ {idMar : 1, nomMar : "Samsung"},
      {idMar : 2, nomMar : "Saba"},
      {idMar : 3, nomMar : "LG"},
      {idMar : 4, nomMar : "Sony"}];
    this.tvs = [
      {
        idTv: 1,
        nomTv :'LG C3 OLED TV',
        prixTv: 2600,
        dateCreation: new Date('01/04/2023'),
        marque : {idMar : 3, nomMar : "LG"},
        email:"mail1@gmail.com"
      },
      {
        idTv: 2,
        nomTv: 'Samsung QN90C Neo QLED TV',
        prixTv: 3000 ,
        dateCreation: new Date('12/03/2023'),
        marque : {idMar : 1, nomMar : "Samasung"},
        email:"mail3@gmail.com"},
      {
        idTv: 3,
        nomTv: 'Sony A95L QD-OLED TV',
        prixTv: 3300,
        dateCreation: new Date('02/08/2023'),
        marque : {idMar : 4, nomMar : "Sony"},
        email:"mail2@gmail.com"
      },
    ];
  }

  listeTvs(): Tv[] {
    return this.tvs;
  }

  ajouterTv(tv: Tv) {
    if (!tv.idTv) {
      const maxId = this.tvs.reduce((max, item) => (item.idTv && item.idTv > max ? item.idTv : max), 0);
      tv.idTv = maxId + 1;
    }

    this.tvs.push(tv);
  }


  supprimerTv(t: Tv) {
    const index = this.tvs.indexOf(t, 0);
    if (index > -1) {
      this.tvs.splice(index, 1);
    }
  }

  consulterTv(id: number): Tv {
    this.tv = this.tvs.find((p) => p.idTv == id)!;
    return this.tv;
  }


  updateTv(tvv: Tv) {

    this.supprimerTv(tvv);

    this.ajouterTv(tvv);
  }
  listeMarques():Marque[] {
    return this.marques;
    }
    consulterMarque(id:number): Marque{
      return this.marques.find(mar => mar.idMar == id)!;
      }
rechercherParMarque(idMar: number): Tv[]{

        this.tvsRecherche = [];
        this.tvs.forEach((cur, index) => {
       
          if(idMar == cur.marque.idMar) {
        console.log("cur "+cur);
        this.tvsRecherche.push(cur);
        }
        });
        return this.tvsRecherche;
        }
        rechercherParNom(nom: string): Tv[] {
          return this.tvs.filter(supp => 
            supp.nomTv && supp.nomTv.toLowerCase().includes(nom.toLowerCase())
          );
        }
        ajouterMarque(nt: Marque): Marque {
          const id = this.marques.length > 0 
            ? Math.max(...this.marques.map(nutritional => nutritional.idMar ?? 0)) + 1 
            : 1;
            
          nt.idMar = id;
          this.marques.push(nt);
          return nt;
        }
}
