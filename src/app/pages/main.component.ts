import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
})
export class MainComponent {
  title = 'sav-v4';
  navItems = [
    { name: "Rechercher", link: "/search", haveSub: false },
    { name: "Consulter Fiche SAV", link: "/consult/savfile", haveSub: false },
    { name: "Consulter Fiche Sinistre", link: "/consult/sinifile", haveSub: false },
    { name: "Consulter bon sav", link: "/consult/bonsav", haveSub: false },
    { name: "Consulter Assurance", link: "/consult/assurance", haveSub: false },
    { name: "Recherche Decharge", link: "/recherche/decharge", haveSub: false },
    { name: "Suivi Stock Retour", link: "/suivi/stockretour", haveSub: false },
    { name: "Go For Swap", link: "/goforswap", haveSub: false },
    { name: "Suivi Fiche Sinistre", link: "/suivi/sinifile", haveSub: false },
    {
      name: "Suivi Retour Réparateurs", haveSub: true, subOpen: false, sub: [
        { name: "Expedier reparateur interne", link: ["/suivi/reparateur", "interne"] },
        { name: "Expedier reparateur externe", link: ["/suivi/reparateur", "externe"] },
        { name: "Recu reparateur interne", link: ["/recu/reparateur", "interne"] },
        { name: "Recu reparateur externe", link: ["/recu/reparateur", "externe"] },
      ]
    },
    { name: "Notification", link: "/notification", haveSub: false },
    { name: "Alerts", link: "/alerts", haveSub: false },
  ];
  constructor(private router: Router) { }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }


}

