import { Subject } from 'rxjs';
import { Excercise } from './excercise.model';

export class TrainingService{
    private availableExcercise: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private excercises: Excercise[] = [];
    excercisedChanged = new Subject<Excercise>();
    private runningExcercise: Excercise;

    getAvailableExcercise(): Excercise[]{
        return this.availableExcercise.slice();
    }

    startExcercise(selectedId: string): void{
        this.runningExcercise = this.availableExcercise.find(ex => ex.id === selectedId);
        this.excercisedChanged.next({ ...this.runningExcercise });
    }
    completeExcercise(): void{
        this.excercises.push({
            ...this.runningExcercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExcercise = null;
        this.excercisedChanged.next(null);
    }

    cancelExcercise(progress: number): void{
        console.log(progress);
        this.excercises.push({
            ...this.runningExcercise,
            duration: this.runningExcercise.duration * (progress / 100),
            calories: this.runningExcercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
            });
        this.runningExcercise = null;
        this.excercisedChanged.next(null);
    }

    getCompletedOrCancelledExcercise(): Excercise[]{
        return this.excercises.slice();
    }

    getRunningExcercise(): Excercise{
        return {...this.runningExcercise};
    }
}
