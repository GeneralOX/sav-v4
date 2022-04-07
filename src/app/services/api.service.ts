import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    apiUrl = "http://127.0.0.1:3000/api";
    constructor(private http: HttpClient) { }

    // AUTH
    login(data: any) {
        return this.http.post(`${this.apiUrl}/auth/login`, data);
    }
    register(data: any) {
        return this.http.post(`${this.apiUrl}/auth/register`, data);
    }

    // Search
    searshForIMEI(_imei: String) {
        return this.http.get(`${this.apiUrl}/device/search?imei=${_imei}`);
    }
    createFicheIntervention(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/create`, data);
    }

    // SUIVI REPA
    getAllInvoice(data: any) {
        return this.http.post(`${this.apiUrl}/intervention/withstatus`, data);
    }
}