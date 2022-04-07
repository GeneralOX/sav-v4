import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-suviRepa',
    templateUrl: 'suivi-reparateur.component.html',
})

export class SuiviReparateurComponent {
    invoiceList: any[] = [];
    dechargeItems: any[] = [];
    selectedSuplier = "One Tel";
    invoice: any = {
        id: "",
        shop: "",
        date: ""
    };

    constructor(private apiService: ApiService) {
        var user = JSON.parse(localStorage.getItem("user")!)
        this.invoice.shop = `${user.nom} ${user.prenom}`;

        this.apiService.getAllInvoice("").subscribe((result: any) => {
            this.invoiceList = (result as any[]).map((val) => {
                val.selected = false;
                return val;
            });
        });
    }

    selectAll() {
        console.log(this.invoiceList);

        this.invoiceList = this.invoiceList.map((v) => { v.selected = !v.selected; return v; });
    }
    decharge() {
        this.dechargeItems = this.invoiceList.filter((v) => { if (v.selected) return v; });
    }
}