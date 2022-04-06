import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})

export class SearchComponent {

  deviceRequstInfo: any = {
    isSearch: false,
    isFound: false,
    haveMsg: false,
    msg: ""
  };
  myDevice: any = {
    imei: '',
    status: '',
    purchase_date: '22/01/2020',
    nb_return_sav: '',
    insured: '',
    guarantee: '',
    rest_guarantee: 1,
    client_id: '',
  };

  createWorkflowFile = false;
  workflowFile: any = {
    client: {
      nom: "ladhari",
      prenom: "rym",
      numTel1: "50015001",
      numTel2: "",
      numCinPassport: "08439671",
      email: ""
    },
    marque: "Portable Samsung",
    model: "Samsung j2 black",
    battery: 1,
    imei: "35798456128315",
    status: "Bon etat",
    Accessoires: [],
    Panne: [],
    terminal: 1,
    Description: "",
    workflow: "Reparateur externe",
  };

  toAddAccess: Array<String> = [];
  toRemoveAccess: Array<String> = [];
  toAddPanne: Array<String> = [];
  toRemovePanne: Array<String> = [];

  invoice: any = {
    shown: false,
    id: 0,
    date: '',
    shop: '',
  };

  constructor(private apiService: ApiService) {
    var user = JSON.parse(localStorage.getItem("user")!)
    this.invoice.shop = `${user.nom} ${user.prenom}`;
  }

  // Search
  searchForIMEI() {
    this.deviceRequstInfo.isSearch = true;
    if (this.myDevice.imei != '')
      this.apiService.searshForIMEI(this.myDevice.imei).pipe().subscribe((data: any) => {
        if ((data as Array<any>).length > 0) {
          var result = (data as Array<any>)[0];

          var _purAt = new Date(result.purchase_date);
          var v1 = new Date(`${_purAt.getMonth() + 1}/${_purAt.getDate()}/${_purAt.getFullYear() + 1}`);
          var v2 = new Date();
          var duration = Math.round((v1.valueOf() - v2.valueOf()) / (1000 * 60 * 60 * 24));
          this.myDevice = {
            imei: result.imei,
            status: result.status,
            purchase_date: (`${_purAt.getFullYear()}-${_purAt.getMonth() + 1}-${_purAt.getDate()}`),
            nb_return_sav: result.nb_return_sav,
            insured: result.insured,
            guarantee: result.guarantee,
            rest_guarantee: duration,
            client_id: result.client_id,
          };
          this.workflowFile.client = {
            nom: result.Nom,
            prenom: result.Prenom,
            numTel1: result.num_tel1,
            numTel2: result.num_tel2,
            numCinPassport: result.cin_passport,
            email: result.email
          }
          this.workflowFile.marque = result.marque;
          this.workflowFile.model = result.model;
          this.workflowFile.imei = this.myDevice.imei;
          this.deviceRequstInfo.isFound = true;
          this.createWorkflowFile = false;
        }
        else {
          this.deviceRequstInfo.haveMsg = true;
          this.deviceRequstInfo.msg = "Not found device";
          setTimeout(() => { this.deviceRequstInfo.haveMsg = false; }, 5000);
        }
      });
    else {
      this.deviceRequstInfo.haveMsg = true;
      this.deviceRequstInfo.msg = "Please insert IMEI number.";
      setTimeout(() => { this.deviceRequstInfo.haveMsg = false; }, 5000);

    }
  }

  // Workflow
  createFile() {
    this.createWorkflowFile = true;
    this.deviceRequstInfo.isFound = false;
  }
  addAccessoires() {
    this.toAddAccess.forEach((e: String) => {
      if (!this.workflowFile.Accessoires.includes(e)) {
        (this.workflowFile.Accessoires as Array<String>).push(e);
      }
    });
    console.log(this.toAddAccess)
  }
  removeAccessoires() {
    this.toRemoveAccess.forEach((e: String) => {
      this.workflowFile.Accessoires = (this.workflowFile.Accessoires).filter((v: String) => (e == v) ? "" : v);
    });
  }
  addPanne() {
    this.toAddPanne.forEach((e: String) => {
      if (!this.workflowFile.Panne.includes(e)) {
        (this.workflowFile.Panne).push(e);
      }
    });
  }
  removePanne() {
    this.toRemovePanne.forEach((e: String) => {
      this.workflowFile.Panne = (this.workflowFile.Panne).filter((v: String) => (e == v) ? "" : v);
    });
  }

  // INVOICE
  submitFile() {
    this.apiService
      .createFicheIntervention(this.workflowFile.imei, {
        accessoires: (this.workflowFile.Accessoires as Array<string>).join(","),
        type_panne: (this.workflowFile.Panne as Array<string>).join(","),
        terminal_pret: this.workflowFile.terminal,
        description: this.workflowFile.Description,
        workflow: this.workflowFile.workflow
      })
      .subscribe((data: any) => {
        console.log(data);
        this.invoice.id = data.insertId;
      });

    this.createWorkflowFile = false;
    this.invoice.shown = true;
    this.invoice.date = this.dateFormat(new Date());
  }
  PrintElem() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=1000')!;

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('<link rel="stylesheet" href="styles.css">');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById("invoice")!.innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    setTimeout(() => {
      mywindow.print();
      mywindow.close();
    }, 1000);


    return true;
  }

  dateFormat(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

}