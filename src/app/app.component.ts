import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('home', { static: false }) home: ElementRef;
  @ViewChild('project', { static: false }) project: ElementRef;
  @ViewChild('about', { static: false }) about: ElementRef;
  moveFromHome: boolean = false;
  moveFromProject: boolean = false;
  moveFromAbout: boolean = false;
  searchedCountry:any;
  searchedName:string;
  searchForm = new FormGroup({});
  countrys: any;
  titles:any;
  subsciptions:Subscription;
  noCapital:string;
  constructor(private httpClient:HttpClient, private fb: FormBuilder,@Inject(DOCUMENT) private document){}

  ngOnInit(): void {
    this.noCapital = "This country has no capital";
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

navigateToNewPage(url:string,name:string){
  if(name){
    window.open(url+name, "_blank");
  }
}

hover(event: string) {
  const properwidth = this.project.nativeElement.offsetWidth;
  if (event === 'home') {
    this.sizeWidth(properwidth, 0, '-', 'about-remove', 'unset', '0');
    // let childs= document.getElementsByClassName('about-remove') as HTMLCollectionOf<HTMLElement>;
    // let curWidth = properwidth;
    //   while(curWidth != 0){
    //     curWidth--;
    //     for(let i=0;i<childs.length;i++){
    //       childs[i].style.right = '0';
    //       childs[i].style.left = 'unset';
    //     childs[i].style.width = curWidth.toString() + "px"
    //   }
    // }
    this.sizeWidth(properwidth, 0, '-', 'project-remove', '0', 'unset');
    if (this.home) {
      if (this.moveFromProject && !this.moveFromHome && !this.moveFromAbout) {
        this.sizeWidth(0, properwidth, '+', 'move-part', 'unset', '0');
        // let curWidth = 0;
        // let childs= document.getElementsByClassName('move-part') as HTMLCollectionOf<HTMLElement>;
        // for(let i=0;i<childs.length;i++){
        //   childs[i].style.right = '0';
        //   childs[i].style.left = 'unset';
        // while( curWidth != properwidth){
        //   curWidth++;

        //     childs[i].style.width = curWidth.toString() + "px";
        //   }
        // }
      } else if (
        this.moveFromAbout &&
        !this.moveFromProject &&
        !this.moveFromHome
      ) {
        this.sizeWidth(0, properwidth, '+', 'move-part', '0', 'unset');
      } else if (
        this.moveFromAbout == false &&
        this.moveFromHome == false &&
        this.moveFromProject == false
      ) {
        this.sizeWidth(0, properwidth, '+', 'move-part', '0', 'unset');
      }
    }
  } else if (event === 'project') {
    this.sizeWidth(properwidth, 0, '-', 'about-remove', '0', 'unset');
    this.sizeWidth(properwidth, 0, '-', 'home-remove', 'unset', '0');
    if (this.project) {
      if (this.moveFromHome) {
        this.sizeWidth(
          0,
          properwidth,
          '+',
          'project-move-part',
          '0',
          'unset'
        );
      } else if (this.moveFromAbout) {
        this.sizeWidth(
          0,
          properwidth,
          '+',
          'project-move-part',
          'unset',
          '0'
        );
      } else if (
        !this.moveFromAbout &&
        !this.moveFromHome &&
        !this.moveFromProject
      ) {
        this.sizeWidth(
          0,
          properwidth,
          '+',
          'project-move-part',
          '0',
          'unset'
        );
      }
    }
  } else if (event === 'about') {
    this.sizeWidth(properwidth, 0, '-', 'home-remove', '0', 'unset');
    this.sizeWidth(properwidth, 0, '-', 'project-remove', 'unset', '0');
    if (this.about) {
      if (this.moveFromHome) {
        this.sizeWidth(0, properwidth, '+', 'about-move-part', 'unset', '0');
      } else if (this.moveFromProject) {
        this.sizeWidth(0, properwidth, '+', 'about-move-part', '0', 'unset');
      } else if (
        !this.moveFromAbout &&
        !this.moveFromHome &&
        !this.moveFromProject
      ) {
        this.sizeWidth(0, properwidth, '+', 'about-move-part', '0', 'unset');
      }
    }
  }
}

sizeWidth(
  curWidth: number,
  properWidth: number,
  operator: string,
  className: string,
  left: string,
  right: string
) {
  let childs = document.getElementsByClassName(className) as HTMLCollectionOf<
    HTMLElement
  >;
  let curwidth = curWidth;
  childs[0].style.left = left;
  childs[0].style.right = right;
  while (curwidth != properWidth) {
    if (operator === '+') {
      curwidth++;
    } else {
      curwidth--;
    }
    childs[0].style.width = curwidth.toString() + 'px';
  }
}

remove(name: string) {
  if (name === 'home') {
    this.moveFromHome = true;
    this.moveFromAbout = false;
    this.moveFromProject = false;
  } else if (name === 'project') {
    this.moveFromHome = false;
    this.moveFromAbout = false;
    this.moveFromProject = true;
  } else if (name === 'about') {
    this.moveFromHome = false;
    this.moveFromAbout = true;
    this.moveFromProject = false;
  }
}

}
