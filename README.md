# Cadastro de carros

**RF** => Requisitos Funcionais
 - Deve ser possível cadastrar um novo carro.
 - Deve ser possível listar todas as categorias.

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio
 - Não deve ser possível cadastrar carro com uma placa já existente.
 - Não deve ser possível alterar a placa de um carro já cadastrado.
 - O carro deve ser cadastrado como disponível por padrão.
 - O usuário resonsável pelo cadastro deve ser um usuário administrador.

 # Listagem de carros

**RF**
- Deve ser possível listar todos os carros disponiveis.
- Deve ser possível listar todos os carros disponiveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponiveis pelo nome da marca.
- Deve ser possível listar todos os carros disponiveis pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- deve ser possível listar todos os carros.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo caddstro deve ser um usuário administrador.

# Cadastro de Especificação no carro

**RF**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros

**RNF**
- Utilizar o mulçter para upload dos arquivos

**RN**
- O usuário pode casdastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.