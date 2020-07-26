import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchedCountry:any;
  searchedName:string;
  searchForm = new FormGroup({});
  countrys: any;
  titles:any;
  constructor(private httpClient:HttpClient, private fb: FormBuilder){}

  ngOnInit(): void {
    this.getCountrys().subscribe(data=>{
      if(data){
        this.countrys = data
        data.forEach(element => {
          this.titles = Object.keys(element);
        });

      }
    })
    this.searchForm = this.fb.group({
      searchCountry:["",]
    })

  }

  findCountry(controlName:string){
    if(this.searchForm.get(controlName).value){
      this.searchedName = this.searchForm.get(controlName).value
    }
    this.searchedCountry = this.countrys.filter(value => value.alpha2Code === this.searchedName ||
                                                value.alpha2Code === this.searchedName.toUpperCase() ||
                                                value.capital === this.searchedName ||
                                                value.capital.toLowerCase() === this.searchedName ||
                                                value.name.toLowerCase() === this.searchedName ||
                                                value.name === this.searchedName)
    console.log("country name:",this.searchedCountry);
    if(this.searchedCountry.length === 0){
      console.log("no Such Country Found");

    }

  }

  cleanCountry(controlName:string){
    this.searchedCountry = null;
    this.searchForm.get('searchCountry').setValue("");
    this.searchedName = "";
  }

  getCountrys():Observable<any>{
    let headers = new HttpHeaders({
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": ["your api key"]
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
