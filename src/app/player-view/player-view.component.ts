import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { selectRequiredValidator } from '../Shared/custom-validators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team } from '../team.model';


@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {

  PlayerInfo :FormGroup;
  Teams:Team[];

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PlayerViewComponent>, private fb:FormBuilder) { }

  ngOnInit() {
    this.Teams = this.data.teams;    
    this.formInit();
    if(this.data.player != undefined){
      this.setData();
    }
  }

  formInit(){
    this.PlayerInfo=this.fb.group({
      _id: null,
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      TeamName: [null, selectRequiredValidator(/null/)], 
      TShirtNumber: ['', Validators.required], 
      Goals: ['', Validators.required],
      RedCards: ['', Validators.required],
      YellowCards: ['', Validators.required],
      Phone: ['', Validators.required],
      Coordinator: [null, selectRequiredValidator(/null/)],
      CreationDate: new Date().toLocaleString()
    });
  }

  setData(){
    this.PlayerInfo.patchValue(this.data.player);
  }

  onSubmit(){ 
    this.dialogRef.close(this.PlayerInfo.value);
  }

  onCloseSelect(){
    this.dialogRef.close();
  }

  //Getters
  get FirstName(){
    return this.PlayerInfo.get('FirstName');
  }
  get LastName(){
    return this.PlayerInfo.get('LastName');
  }
  get TeamName(){
    return this.PlayerInfo.get('TeamName');
  }
  get TShirtNumber(){
    return this.PlayerInfo.get('TShirtNumber');
  }
  get Goals(){
    return this.PlayerInfo.get('Goals');
  }
  get RedCards(){
    return this.PlayerInfo.get('RedCards');
  }
  get YellowCards(){
    return this.PlayerInfo.get('YellowCards');
  }
  get Phone(){
    return this.PlayerInfo.get('Phone');
  }
  get Coordinator(){
    return this.PlayerInfo.get('Coordinator');
  }
}
