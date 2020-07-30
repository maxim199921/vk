import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared/services/shared.service';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

    check: boolean;

    constructor(private shared: SharedService) {
    }

    ngOnInit() {

        this.shared.bool$.subscribe(res => {
            this.check = res;
        });

    }

}
