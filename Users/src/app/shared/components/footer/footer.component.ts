import { Component , OnInit} from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
constructor(public Sha:SharedService){}

ngOnInit(): void {
  // this.Sha.name
}

}
