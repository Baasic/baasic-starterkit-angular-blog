import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IArticleTag } from 'baasic-sdk-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { TagService } from 'common/data';

@Component({
    selector: 'tags-autocomplete',
    templateUrl: 'tags-autocomplete.component.html',
    styleUrls: ['tags-autocomplete.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TagsAutocompleteComponent),
        multi: true
    }]
})
export class TagsAutocompleteComponent implements ControlValueAccessor {

    @Input('models') models: any[] = [];
    @ViewChild('searchInput') searchInput;

    searchForm: FormControl;
    searchFormSubscription: Subscription;

    items: any[] = [];

    isHidden: boolean = true;

    private propagateChange = (_: any) => { return; };
    private propagateTouched = () => { };

    constructor(private tagService: TagService) {
        this.searchForm = new FormControl(null);
     }

    ngOnInit(): void { 
        this.searchFormSubscription = this.searchForm
            .valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(async term => term ? (await this.tagService.search(term)) : [])
            .subscribe((data: any) => this.onSuccessful(data.item));
    }

    ngOnDestroy(): void {
        this.searchFormSubscription.unsubscribe();
    }

    writeValue(value: any): void {
        if (value != null) {
            this.models = value;
        } else {
            this.models = [];
        }
    }

    registerOnChange(fn: (_: any) => {}) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: () => {}) {
        this.propagateTouched = fn;
    }

   onSuccessful(models: any): void {
       this.items = [];
       let items = this.filterAdded(models);
       if (items.length > 0) {
        this.items = items;
        this.isHidden = false;
       } else {
           this.items = [];
           this.isHidden = true;
       }
   }

   filterAdded(models: any): any {
       for (let i in models) {
           for (let j in this.models) {
               if (models[i].id === this.models[j].id) {
                   models.splice(+i, 1);
                   break;
               }
           }
       }

       return models || [];
   } 

   onSelect(item: any): void {
       this.models.push(item);
       this.isHidden = true;
       this.items =  [];
       this.searchForm.reset();
       this.propagateChange(this.models);
   }

   removeTag(item: any): void {
       for (let i in this.models) {
           if (this.models[i].id === item.id) {
               this.models.splice(+i, 1);
               this.propagateChange(this.models);
               
               return;
           }
       }
   }

   onClick(event: any): void {
       this.searchInput.nativeElement.focus();
   }
}