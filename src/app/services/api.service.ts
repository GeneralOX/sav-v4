import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    apiUrl = "http://127.0.0.1:3000/api";
    constructor(private http: HttpClient) { }
    login(data: any) {
        return this.http.post(`${this.apiUrl}/login`, data);
    }
    register(data: any) {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    searshForIMEI(_imei: String) {
        return this.http.get(`${this.apiUrl}/getByImei/${_imei}`);
    }
    createFicheIntervention(_imei: String, data: any) {
        return this.http.post(`${this.apiUrl}/createIntervention/${_imei}`, data);
    }

}