import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import { Injectable } from "@angular/core";

@Injectable()
export class GuardaRota {

    constructor(private router: Router){

    }

    canActivate(): boolean {
        
        var podeAcessar = AppComponent.usuarioLogado != undefined;

        if(!podeAcessar){
          this.router.navigate(['']);
        }

        return podeAcessar;

      }
}