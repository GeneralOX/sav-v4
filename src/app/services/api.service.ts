import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    apiUrl = "http://127.0.0.1:3000/api";
    constructor(private http: HttpClient) { }

    // AUTH
    login(data: any) {
        return this.http.post(`${this.apiUrl}/login`, data);
    }
    register(data: any) {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    // Search
    searshForIMEI(_imei: String) {
        return this.http.get(`${this.apiUrl}/getByImei/${_imei}`);
    }
    createFicheIntervention(_imei: String, data: any) {
        return this.http.post(`${this.apiUrl}/createIntervention/${_imei}`, data);
    }

    // SUIVI REPA
    getAllInvoice() {
        return this.http.get(`${this.apiUrl}/interventions`);
    }
}