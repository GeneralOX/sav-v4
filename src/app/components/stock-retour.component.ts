import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-stockRetour',
    templateUrl: 'stock-retour.component.html',
})

export class StockRouterComponent {

    app: any = {
        optionList: ["TerminalMobile"],
        selectedOption: "TerminalMobile",

        screen1: true,
        screen2: false,
        showScreen1: () => { this.app.screen1 = true; this.app.screen2 = false; },
        showScreen2: () => { this.app.screen1 = false; this.app.screen2 = true; },

        swapItems: [],
        dechargeItems: [],
        shopId: 1,
        shop: "",
    }

    constructor(private apiService: ApiService) {
        var user = JSON.parse(localStorage.getItem("user")!) ?? { id: 1, name: "shop", prenom: "shop" }
        this.app.shop = `${user.nom} ${user.prenom}`;
        this.app.shopid = user.id ?? 1;
        this.search();
    }

    search() {
        this.apiService.getSwapPending(this.app.selectedOption).subscribe((res: any) => {
            this.app.swapItems = res.map((v: any) => { v.selected = false; return v; });
            this.app.showScreen1();
        });
    }
    selectAll() {
        this.app.swapItems = this.app.swapItems.map((v: any) => { v.selected = !v.selected; return v; });
    }
    decharge() {
        this.app.dechargeItems = this.app.swapItems.filter((v: any) => { if (v.selected) return v; });
        var interventions: any[] = [];
        this.app.dechargeItems.forEach((v: any) => interventions.push({ id: v.id, status: "Envoie vers Entrepot", device: v.device.imei }));

        this.apiService.createSwapDischarge({ userid: this.app.shopid, dechargeItems: interventions }).subscribe((res: any) => {
            this.app.invoice = {
                id: res.invoice.id,
                date: res.invoice.createdAt
            };
            this.app.showScreen2();
        });
    }
}