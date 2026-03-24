import { Component, OnInit } from '@angular/core';
import { Item } from '../../item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items-list',
  standalone: false,
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent implements OnInit {

  items: Item[] = [];
  loading = true;

  constructor(private itemService: ItemService){}

  ngOnInit(): void{
    this.itemService.getItmes().subscribe(data => {
      this.items = data;
      this.loading = false;
    })
  }
}
