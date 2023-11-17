import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioServico } from './servicos/usuario.servico';
import { TransacaoController } from './controllers/transacao.controller';
import { TransacaoServico } from './servicos/transacao.servico'; 
import { ContaController } from './controllers/conta.controller';
import { ContaServico } from './servicos/conta.servico';
import { UsuarioRepositorio } from './repositorios/usuario.repositorio';
import { ContaRepositorio } from './repositorios/conta.repositorio';

@Module({
  imports: [],
  controllers: [
    AppController, 
    UsuarioController, 
    TransacaoController,
    ContaController
  ],
  providers: [ 
    AppService, 
    UsuarioServico, 
    TransacaoServico,
    ContaServico,
    UsuarioRepositorio,
    ContaRepositorio
  ],
})
export class AppModule {}
