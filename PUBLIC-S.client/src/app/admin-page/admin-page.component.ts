import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as d3 from 'd3';
import { User } from '../models/User.model';
import { ArticlesService} from '../services/articles.service';
import { UsersService } from '../services/users.service';

export interface UserData {
  id: String |undefined;
  firstName: String;
  lastName: String;
  email: String;
  writer: boolean;
  admin: boolean;
  country: String;
}
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public averageWords= 0;
  public averageCities= 0;
  
  private users : UserData[] = [];

  private data = [
    {"_id": "none", "count": "1"}
  ];
  private svg: any;
  private margin = 20;
  private width = 300;
  private height = 300;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  dataSource: MatTableDataSource<UserData>;
  markers: any[] = []; 

  constructor(private articleService:ArticlesService, 
    private usersService: UsersService,
    ) {
      this.dataSource= new MatTableDataSource(this.users);
  }
  private createSvg(): void {
    this.svg = d3.select("figure#pieGroupBy")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.count.toString()))
  .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}


private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.count));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(50)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text((d: { data: { _id: any; }; }) => d.data._id)
  .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}

   async ngOnInit() {
    await this.articleService.getArticlesAverageWord().subscribe(num => {
      this.averageWords = num.average
      })

     await this.usersService.getUsersAverageCities().subscribe(
       num =>{ 
       this.averageCities = num.estimated
       }
     )

   await this.articleService.getArticlesByField().subscribe(articleObject => {
      if (articleObject) {
        this.data = articleObject;
        // await this.articleService.getWriter(articleObject.)
        this.createSvg();

        this.createColors();
        this.drawChart();
      };
  })
  
  await this.usersService.getUsers().subscribe(
    usersT =>{
    usersT.forEach((user: User) => {
      this.users.push(  {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      writer: user.isWriter,
      admin: user.isAdmin,
      country: user.country,
    });
    });
    this.dataSource= new MatTableDataSource(this.users);
    this.getCountries()

   } )
}

public async getCountries(){
  this.users.forEach(async user => {

    await this.usersService.getUserCountry(user.country).subscribe(
      country => {
        this.markers.push({
          position: 
            { lat: country.latitude, lng: country.longitude },
          label: {
            text: country.country ,
          },
          title: user.firstName + " " + user.lastName ,
        })
    })
  })
}

  displayedColumns: string[] = [ 'name', 'email', 'writer', 'admin', 'delete'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  async onClickedDelete(id: string){
    await this.usersService.deleteUser(id).subscribe()
      for(let i = 0; i < this.users.length; ++i){
        if (this.users[i].id === id) {
          this.users.splice(i,1);
        }
    }
      this.dataSource = new MatTableDataSource(this.users);   
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  async onClickedAdmin(id: String, user: any){
    let tmp = {"isAdmin": !user.admin }
    
    await this.usersService.updateUser(id, tmp ).subscribe()
      for(let i = 0; i < this.users.length; ++i){
        if (this.users[i].id === user.id) {
          this.users[i].admin = !user.admin;
        }
    }
      this.dataSource = new MatTableDataSource(this.users);   
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  
  async onClickedWriter(id: String, user: any){
    let tmp = {"isWriter": !user.writer }
    
    await this.usersService.updateUser(id, tmp ).subscribe()
      for(let i = 0; i < this.users.length; ++i){
        if (this.users[i].id === user.id) {
          this.users[i].writer = !user.writer;
        }
    }
      this.dataSource = new MatTableDataSource(this.users);   
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
}