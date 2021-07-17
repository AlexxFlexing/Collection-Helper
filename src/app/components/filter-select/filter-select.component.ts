import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';

export interface SelectFilter {
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html'
})
export class FilterSelectComponent implements OnInit {

  @Output() emitter = new EventEmitter<string[]>()
  public filters: SelectFilter[] = []
  public placeHolder = "Custom Filters"

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filters = this.filterService.getFilters().filter(filter => filter.isCached).map((filter): SelectFilter => {
      return {text: filter.name, selected: false}
    })
  }

  onChange() {
    let selected = this.filters.filter(item => item.selected).map(filter => filter.text)

    if (selected.length) {
      this.placeHolder = selected.toString()
    } else {
      this.placeHolder = "Custom Filters"
    }

    this.emitter.emit(selected)
  }

}