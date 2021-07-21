import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraing = false;
  suscription = new Subscription();
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.suscription = this.trainingService.excercisedChanged.subscribe(
      excercise => {
        if (excercise){
          this.ongoingTraing = true;
        }else{
          this.ongoingTraing = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
