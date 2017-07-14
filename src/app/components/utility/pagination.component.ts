import { 
    Component, 
    EventEmitter,
    Input, 
    OnChanges, 
    OnInit, 
    Output, 
    SimpleChanges 
} from '@angular/core';

@Component({
    selector: 'pager',
    template: `
        <div class="pager">
            <hr>
            <a href="javascript:void(0)" class="btn btn--light btn--med rounded" *ngIf="hasPrevious" (click)="prevEvent.emit()">Prev</a>
            <a href="javascript:void(0)" class="btn btn--light btn--med rounded" *ngIf="hasNext" (click)="nextEvent.emit()">Next</a>
        </div>
    `
})

export class PaginationComponent implements OnInit, OnChanges {

    @Input('pagerData') pagerData: any;

    @Output('onNext') nextEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output('onPrev') prevEvent: EventEmitter<void> = new EventEmitter<void>();

    hasPrevious: boolean;
    hasNext: boolean;
    hasPreviousGroup: boolean;
    hasNextGroup: boolean;
    numberOfPages: number;
    currentPage: number;
    currentGroupIndex: number;
    totalRecords: number;
    pages: number[]; 

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.pagerData.currentValue) {
            let currentPage = this.pagerData.currentPage || 1;
            let pageSize = this.pagerData.pageSize || 10;
            let pageGroupSize = this.pagerData.pageGroupSize || 10;
            let totalRecords = this.pagerData.totalRecords || 1;
            let numberOfPages = Math.ceil(totalRecords / pageSize);
            let numberOfGroups = Math.ceil(numberOfPages / pageGroupSize);
            let currentGroupIndex = this.pagerData.currentGroupIndex || Math.ceil(currentPage / pageGroupSize);
            let groupCeil = currentGroupIndex * pageGroupSize;
            let pages = [];

            for (let i = groupCeil - pageGroupSize + 1; i <= Math.min(numberOfPages, groupCeil); i++) {
                pages.push(i);
            }

            this.hasPrevious = currentPage > 1;
            this.hasNext = currentPage < numberOfPages;
            this.hasPreviousGroup = currentGroupIndex > 1;
            this.hasNextGroup = currentGroupIndex < numberOfGroups;
            this.numberOfPages = numberOfPages;
            this.currentPage = currentPage;
            this.currentGroupIndex = currentGroupIndex;
            this.totalRecords = totalRecords;
            this.pages = pages;
        }
    }
}