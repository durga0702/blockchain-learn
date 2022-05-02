import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public ethereum:any;
  public walletAddress:any;
  public chainNetwork:any;

  
  public connectWallet(){
    this.ethereum = window['ethereum']
    this.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any)=>{
      console.log(res)
      this.walletAddress = res[0]
    }),
    (err: any)=>{
      console.log(err)
    }
   
  }
  public chainId(){
    this.ethereum.request({ method: 'eth_chainId' }).then((res)=>{
      console.log(res);
      const networkId = res;
      this.netWork(networkId);
    })
   
  }
  public netWork(id){
    switch(id) {
      case '0x1':
        this.chainNetwork = 'Ethereum Main Network (Mainnet)';
        break;
      case '0x3':
        this.chainNetwork = 'Ropsten Test Network';
        break;
        case '0x4':
          this.chainNetwork = 'Rinkeby Test Network';
          break;
        case '0x5':
          this.chainNetwork = 'Goerli Test Network';
          break;
          case '0x2a':
            this.chainNetwork = 'Kovan Test Network';
             break;
          default:
            this.chainNetwork = 'unknown';
    }
     
  }
//  public changeNetwork(event){
//    console.log(event.target.value)

//   }
 ngOnInit(): void {
      console.log(window['ethereum']);
     }
}
