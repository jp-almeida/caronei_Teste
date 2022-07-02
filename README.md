## SUMÁRIO
- [Rodando o projeto](#rodando-o-projeto) -> depois do <code>git pull</code>
- [Configurações iniciais](#configurações-iniciais) -> depois do <code>git clone</code>
- [Solução de problemas](#solução-de-problemas) -> algumas soluções para problemas durante o desenvolvimento
- [Links importantes](#links-importantes) -> alguns links úteis de dependências


## Rodando o projeto
Fazer esse passo a passo sempre que der <code>git pull</code>. Tudo deve ser feito dentro do diretório <code>caronei-app</code>, que é a pasta do nosso projeto.

### 1º passo - Atualizar as dependências
Verifica se houve alguma mudança nas dependências
- <code>yarn</code>
- <code>npm install</code>

### 2º passo - Inicializar o XAMPP
Inicializar o servidor apache e o banco de dados mysql
- Abrir o aplicativo (pesquisar por "XAMPP" na busca)
- Na coluna **actions** clicar em **start** tanto na linha do **apache** quanto na linha do **mysql**
- Esperar inicializar e ver se foi bem sucedido

### 3º passo - Migrar o banco de dados
Verifica que se foi feita alguma alteração no banco de dados (não nos dados e sim no seu formato, por exemplo, inserção de uma nova tabela ou mudança de coluna)
- Rodar o comando <code>npm run migrate</code>

### 4º passo - Rodar a aplicação
Inicializa a aplicação de fato
- Para rodar o react <code>npm run android</code> (ou outro comando que preferir utilizar, como <code>expo start</code> e depois <code>a</code>)
- Rodar o back <code>npm run back</code>

### Passo temporário - mudar o endereço IP [em progresso de achar solução]
- Acessar o arquivo de configurações <code>caronei-app/config/config.js</code>
- Achar o atributo <code>urlRootNode</code> e mudar seu valor para o endereço IP que está sendo utilizado
> O endereço IP é informado quando o expo é inicializado ou no navegador na tela de dev tools do expo


## Configurações iniciais
> A parte do XAMPP e do banco de dados foi retirada [deste vídeo](https://www.youtube.com/watch?v=KEZ1lDWSSAo)
### Instalar o XAMPP
Instalar o [XAMPP](https://www.apachefriends.org/pt_br/download.html). O local de instalação não pode ter espaços no diretório. Por exemplo, não pode ser instalado dentro da pasta <code>/Program Files</code> do Windows.

### Inicializar o XAMPP
- Inicializar o XAMPP como no 2º passo
- O apache (servidor do xampp) fica no endereço <code>localhost</code>. O banco de dados fica no <code>localhost/phpmyadmin</code>

### Abrir a tela do mysql
- Ainda no aplicativo do XAMPP, clicar em **admin** na linha do **mysql**.
- Ele irá abrir o endereço <code>localhost/phpmyadmin</code> no navegador, onde está rodando o banco de dados

### Criar o banco de dados
- Do lado superior esquerdo, clicar em **novo** para criar um novo banco de dados
- Escrever <code>banco</code> no campo de nome
- Verificar se o segundo campo já está na opção <code>utf8mb4_general_ci</code>


## Solução de problemas
Alguns problemas podem ocorrer.
- Fechar tudo do emulador/celular
- Finalizar o back com <code>ctrl + c</code> no terminal que ele está rodando
- Finalizar o react com <code>ctrl + c</code> no terminal que ele está rodando
- Reiniciar o react com <code>expo r -c</code> (limpa o cache) -> depois tem que escrever <code>a</code> para abrir com o android
- Reiniciar o back normalmente



## Links importantes
- [Star rating](https://github.com/djchie/react-native-star-rating)
- [Collapsible](https://www.npmjs.com/package/react-native-collapsible)
- [Icones compatíveis (material)](https://materialdesignicons.com/)
- [Date Picker](https://github.com/react-native-datetimepicker/datetimepicker)
