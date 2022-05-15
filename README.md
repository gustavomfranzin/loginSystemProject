# # loginSystemProject!

Sistema de cadastro de usuário desenvolvido em JavaScript, usando TypeScript, express, jwt, bcrypt com nodejs e handles bar, armazenando os usuários cadastrados em um banco de dados MySQL rodando em um container Docker. 


# # Executando o banco de dados
Com o Docker iniciado, vá até seu terminal e dentro do diretório do projeto execute o comando, 

"**docker-compose -f stack.yml up**"

Após criar o banco, você precisa criar a tabela de usuários.

Você pode realizar a criação acessando o endereço: http://localhost:8081/

Será solicitado usuário e senha para acesso ao phpAdmin. 

Por padrão neste repositório: (root - rootPassword)

Script SQL para criação da tabela: 

     "CREATE TABLE users 
     (
	      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 	
	      name VARCHAR(50) NOT NULL,
	      login VARCHAR(50) NOT NULL UNIQUE,
	      password VARCHAR(255) NOT NULL,
	      created_at DATETIME DEFAULT CURRENT_TIMESTAMP 
     );"


# # Executando a aplicação

Primeiro comando necessário é instalar todas dependências da aplicação, digite em seu terminal:

"**npm install**"

Após instalada as dependências, ao alterar os arquivos .ts no diretório "*/src/..*"

você precisa construir a aplicação em JavaScript rodando o comando

"**npm run build**"

Após compilado de TypeScript para JavaScript, você precisa então rodar a aplicação. digite o comando

"**npm run start**"

em ambiente de desenvolvimento você pode utilizar o nodemon para construir e executar em tempo real a cada alteração.

Para que ele recompile e inicie automaticamente após alteração você precisa executar os comandos,

"**npm run build:watch**"

(comando responsável por recompilar em tempo assistido)

Para reinicializar juntamente após cada alteração,

"**npm run dev**".