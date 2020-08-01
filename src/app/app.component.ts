import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
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
  subsciptions:Subscription;
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
   this.findCountry()
  }

  findCountry(){
    this.subsciptions = this.searchForm.valueChanges.subscribe(data=>{
      if(data){
        let result = []
        this.countrys.forEach(value => {
          if(value.name.toLowerCase().includes(data.searchCountry)){
            result.push(value)
          }
          return result
          });
          this.searchedCountry = result
      }
    })
  }
  cleanCountry(controlName:string){
    if(this.searchForm.get(controlName)){
      this.searchForm.get(controlName).setValue('')
    }
    this.searchedCountry = [];
    this.searchedName = "";

  }

  getCountrys():Observable<any>{
    let headers = new HttpHeaders({
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": "your api key"
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
