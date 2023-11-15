import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioServico } from './servicos/usuario.servico';
import { trasacaoController } from './controllers/transacao.controller';
import { TransacaoServico } from './servicos/transacao.servico'; 

@Module({
  imports: [],
  controllers: [AppController, UsuarioController, trasacaoController],
  providers: [ AppService, UsuarioServico, TransacaoServico ],
})
export class AppModule {}
