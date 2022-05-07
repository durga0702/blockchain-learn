import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * app component
 */
export class AppComponent implements OnInit {
  public ethereum:any = window['ethereum'];
  public walletAddress:any;
  public chainNetwork:any;
  public netId:any;
  public changedChainId:any;
  public findingChainNetwork:any;
 public id:any;
 public net:any;
  /**
   * wallet connect
   */


  public connectWallet(){
    this.ethereum = window['ethereum']
    this.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any)=>{
      console.log(res)
      this.walletAddress = res[0];
    }),
    (err: any)=>{
      console.log(err)
    }
    this.networkChangeListener()
   }
  /**
   * get chain id
   */
  public getChainId(){
    this.ethereum.request({ method: 'eth_chainId' }).then((res)=>{
      console.log(res);
      const networkId = res;
      this.netWork(networkId);
    })
   
  }
  /**
   * 
   * @param {string} id find network
   */
  public netWork(id){
    console.log('entered')
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
  /**
   * get net id
   * @param {any} event 
   */
  public changeNetworkId(event){
    console.log(event.target.value)
     this.netId = event.target.value;
     this.changeNetwork()
  }
  /**
   * network change 
   
   */
async changeNetwork(){
  this.ethereum = window['ethereum']
  try {
    this.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: this.netId }],
    });
    
  } catch (err) {
    console.log(err);
  }
}
  /**
   * network change listener
   */
  networkChangeListener(){
    this.ethereum.on('chainChanged', (chain) => {
     setTimeout(() => {
      this.changedChainId = chain;
      console.log("check",this.changedChainId)
      this.netWork(chain);
     }, 1000);
        
     
     });
    }
  /**
   * store data
   */
   storeNetWorkData(id,net){
     localStorage.setItem('id',id);
     localStorage.setItem('network',net);
    }
    /**
     * add new network
     */
     addNewNetWork(){
       console.log('clicked')
      this.ethereum.request({
        method: 'wallet_addEthereumChain',
         params: [
          {
            chainId: '0x64',
            chainName: ' xDai MainNet',
            rpcUrls: ['https://rpc.xdaichain.com/'] /* ... */,
          },
        ],
       });
    }
 
  ngOnInit(): void {
      console.log(window['ethereum']);
      
      setInterval(() => {
        this.networkChangeListener();
      },1000)
     }
}
