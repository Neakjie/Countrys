import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countrys: any;
  titles:any;
  constructor(private httpClient:HttpClient){}

  ngOnInit(): void {
    this.getCountrys().subscribe(data=>{
      if(data){
        this.countrys = data
        data.forEach(element => {
          this.titles = Object.keys(element);
        });

      }
    })

  }

  getCountrys():Observable<any>{
    let headers = new HttpHeaders({
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": [yourApiKey:"https://rapidapi.com/apilayernet/api/rest-countries-v1"]
    })
    let options = { headers: headers,
                  body:{}
                };
    return this.httpClient.get("https://restcountries-v1.p.rapidapi.com/all", options)
}

translationObjectItem(objectItems:Object){
  let items = [];
  if(objectItems){
    Object.values(objectItems).forEach(data=>{
      if(data){
        items.push(data)
      }
    })
    return items
  }
}

}
