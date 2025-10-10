import { Component } from '@angular/core';
import { RedirectUrlService } from '../service/redirect-url.service';

@Component({
  selector: 'app-redirect-url',
  standalone: false,
  templateUrl: './redirect-url.component.html',
  styleUrl: './redirect-url.component.css'
})
export class RedirectUrlComponent {

  shortUrl: string = '';
  redirectUrl: string = ''; 

  constructor(private service: RedirectUrlService){}

   redirectToUrl() {
    console.log(this.shortUrl)
    if (this.shortUrl) {
      this.service.redirectUrl(this.shortUrl).subscribe(
        {next:data => {
          this.redirectUrl = data.url;  
          if (this.redirectUrl) {
            window.open(data.url, '_blank');
            
          } else {
            alert('No redirect URL found in the response.');
          }
      },
      error:error=>{
        alert(error.error.message || 'An unknown error occurred');
      }
    });
    }
    else {
      alert('Please paste a valid Short URL!');
    }
  }

}
