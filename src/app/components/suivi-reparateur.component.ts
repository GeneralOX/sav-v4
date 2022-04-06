import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-suviRepa',
    templateUrl: 'suivi-reparateur.component.html',
})

export class SuiviReparateurComponent {
    invoiceList: any[] = [];
    selectedSuplier = "One Tel";
    constructor(private apiService: ApiService) {
        this.apiService.getAllInvoice().subscribe((result: any) => {
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
}