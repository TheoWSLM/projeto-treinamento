import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoGetService } from 'src/app/services/produto-get.service';

@Component({
  selector: 'app-pagina-produtos',
  templateUrl: './pagina-produtos.component.html',
  styleUrls: ['./pagina-produtos.component.css']
})
export class PaginaProdutosComponent {
  produtos: Produto[] = [];
  error: Error[] = [];
  private produtosSubscription: Subscription | undefined;
  modoCards$: BehaviorSubject<boolean> = new BehaviorSubject(true); // Inicializa com true
  modoCardsObservable$: Observable<boolean> = this.modoCards$.asObservable();
  constructor(private produtoGetService: ProdutoGetService) {}

  ngOnInit(): void {
    this.atualizar();
}

  atualizar(){
    this.produtosSubscription = this.produtoGetService.getProdutos().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error) => {
        this.error.push(error);
        console.log(error);
      }
    );
  }

  alternarLista() {
    this.modoCards$.next(!this.modoCards$.value); 
  }
}
