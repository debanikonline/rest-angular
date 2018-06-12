import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
declare var $:any;
import swal from 'sweetalert2';
import { APP_ID_RANDOM_PROVIDER } from '@angular/core/src/application_tokens';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  selectedfile: File=null;
  constructor(public service:AuthService) { }
  public update_trigger=false;
  public allproducts=[];
  public updatename;
  public updateprice;
  public updateimage;
  public updateid;
  public insertbtn=true;
  public cancelbtn=false;
  public ImageSelection=true;
  public ImageActionText;
  public imageAction=true;
  public seletedImageName;
  public url="";
  ngOnInit() {
    
    this.showall()
    if(this.imageAction==true)
    {
      this.ImageActionText="Choose Image";
    }
    else
    {
      this.ImageActionText='Change Image';
    }
   
  }
  onFileSlected(event)
  {
   // console.log(event.target.files);
    this.selectedfile=event.target.files[0];
    this.seletedImageName=this.selectedfile.name;
   // console.log(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(reader,"reader");
      this.url = reader.result;
      console.log(this.url,"preview path");
      reader.onload = (e) => { // called once readAsDataURL is completed
       // console.log(e,"just e");
        //this.url = e.target.result;
      }
    }
  } 
  insert(data)
  {
   // console.log(data);
    const fd=new FormData();
    fd.append('productImage',this.selectedfile, this.selectedfile.name);
    fd.append('name',data.name);
    fd.append('price',data.price);
    //console.log(fd);
    
    this.service.insert_into_db(fd).subscribe((res:any)=>{
     
      var newdata =res.data;
      if(res.status==true)
      {
        this.allproducts.push(newdata);
        this.updatename='';
        this.updateprice='';
        this.updateimage='';
        this.url='';
        swal({
          type:'success',
          text: "Details Updated",
          title: "Success",
          confirmButtonText:"cool",
          timer:1000
        })
      }
    })
  }
  showall()
  {
    this.service.show_all().subscribe((res:any)=>{
      console.log(res);
      this.allproducts=res.alldata;
    })
  }
  deletethis(data,i)
  { 
   
    swal({
      type:'question',
      text:"Cannot be Undone",
      title:"Sure you want to delete this entry?",
      confirmButtonText:"Yes",
      showCancelButton:true,
      cancelButtonText:"Cancel this event"
    }).then(datareq =>{
      console.log(datareq,"datareq");
      if(datareq.value==true)
      {
        this.service.deleteone(data).subscribe((res:any)=>{
          if(res.status==true)
          {
            this.allproducts.splice(i,1);
            this.toggle("","","","");
            console.log(this.url,'url url');
            swal({
              type:'success',
              text:'Entry Deleted',
              title:"Success",
             
              timer:2000
            })
          }
          else
          {
            swal('Data Not Deleted');
          }
        })
      }
    })
  }
  toggle(id,name,price,image)
  {
    this.ImageActionText="Change";
    console.log(id,'id from toggle',this.ImageActionText);
    $('#update_trigger').addClass('disabled');
    this.updatename=name;
    this.updateprice=price;
    this.updateid=id;
    this.updateimage="http://localhost:3000/" + image;
    this.update_trigger=!this.update_trigger;
    this.insertbtn=!this.insertbtn;
    this.cancelbtn=!this.cancelbtn;
  }
  toggle2()
  {
    this.ImageActionText="Choose";
  }
  updatefunc(data)
  {
    this.ImageActionText='CHANGE';
    console.log(data._id);
    const fd=new FormData();
    fd.append("id",data._id);
    fd.append('productImage',this.selectedfile, this.selectedfile.name);
    fd.append('name',data.name);
    fd.append('price',data.price);
    this.service.updateone(fd).subscribe((res:any)=>{
      console.log(res,"thiss data");
      if(res.status==true)
      {
        this.showall();
        this.updatename="";
        this.updateprice="";
        this.updateid="";
        this.url='';
        this.update_trigger=!this.update_trigger;
        this.insertbtn=!this.insertbtn;
        this.cancelbtn=!this.cancelbtn;
        this.showall();
        swal({
          type:'success',
          text: "Details Updated",
          title: "Success",
          confirmButtonText:"cool"
        })
      }
    })
  }
  mypopover()
  {
    console.log("hit");
  $('[data-toggle="popover"]').popover('toggle');
  
  $('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});
  
  }
}

 