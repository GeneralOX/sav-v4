import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
})
export class MainComponent {
  title = 'sav-v4';
  navItems = [
    { name: "Rechercher", link: "/search" },
    { name: "Consulter Fiche SAV", link: "/consult/savfile" },
    { name: "Consulter Fiche Sinistre", link: "/consult/sinifile" },
    { name: "Consulter bon sav", link: "/consult/bonsav" },
    { name: "Consulter Assurance", link: "/consult/assurance" },
    { name: "Recherche Decharge", link: "/recherche/decharge" },
    { name: "Suivi Stock Retour", link: "/suivi/stockretour" },
    { name: "Go For Swap", link: "/goforswap" },
    { name: "Suivi Fiche Sinistre", link: "/suivi/sinifile" },
    { name: "Suivi Retour Réparateurs", link: "/suivi/retourrepa" },
    { name: "Notification", link: "/notification" },
    { name: "Alerts", link: "/alerts" },
  ];
  constructor(private router: Router) { }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }


}

