USE servidor_local;

ALTER TABLE tbl_prestadores
DROP COLUMN taxaUrgencia,
ADD COLUMN taxa_urgencia DECIMAL(10, 3) AFTER profissao,
DROP COLUMN minimaDesconto,
ADD COLUMN minimo_desconto DECIMAL(10, 3) AFTER taxa_urgencia,
DROP COLUMN percentagemDesconto,
ADD COLUMN percentagem_desconto DECIMAL(10, 3) AFTER minimo_desconto,
DROP COLUMN precoHora
;

CREATE TABLE tbl_utilisadores(
id VARCHAR(255) PRIMARY KEY NOT NULL,
nome VARCHAR(50) NOT NULL,
numaro_identificado VARCHAR(100) NOT NULL,
data_nascimento DATE NOT NULL,
email VARCHAR(255) NOT NULL,
telefone VARCHAR(13),
pais VARCHAR(100) NOT NULL,
localidade VARCHAR(100)NOT NULL,
`password` VARCHAR(255),
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

CREATE TABLE tbl_orcamento(
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
total DOUBLE NOT NULL,
id_utilizador VARCHAR(255) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
updated_at  DATETIME NOT NULL
);

CREATE TABLE tbl_servico(
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
nome VARCHAR(50) NOT NULL,
discricao  VARCHAR(255),
categoria  VARCHAR(20) NOT NULL,
enabled BOOLEAN NOT NULL,
creatd_at DATETIME NOT NULL,
update_at DATETIME NOT NULL
);

CREATE TABLE tbl_prestacao_servico(
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
designacao VARCHAR(255) NOT NULL,
subtotal DOUBLE NOT NULL,
hora_estimados INTEGER,
id_prestador VARCHAR(255) NOT NULL,
id_servico INTEGER NOT NULL,
id_orcamento INTEGER,
preco_hora DOUBLE,
estado ENUM('pendente', 'em_progresso', 'finalizado', 'cancelado') NOT NULL,
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

CREATE TABLE tbl_proposta(
i INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
id_prestacao_servico INTEGER NOT NULL,
preco_hora DOUBLE NOT NULL,
hora_estimadas DOUBLE NOT NULL,
estado ENUM('pendeste', 'aceito', 'recusado') NOT NULL,
enabled BOOLEAN NOT NULL,
criated_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_empresa(
	id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    designacao VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    localizacao VARCHAR (100) NOT NULL,
	nif DOUBLE NOT NULL UNIQUE,
    icone VARCHAR(255),
    enabled BOOLEAN,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL 
    );
   
CREATE TABLE tbl_categoria (
	id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    designacao VARCHAR (255) NOT NULL,
    icone VARCHAR (255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
    );

ALTER TABLE tbl_empresa
    ADD COLUMN id_utilizador VARCHAR(255) NOT NULL AFTER icone,
	ADD CONSTRAINT fk_utilizador_empresa
    FOREIGN KEY (id_utilizador)
    REFERENCES tbl_utilizadores(id)
    ;
    
  ALTER TABLE tbl_servico
    DROP COLUMN categoria,
    ADD COLUMN id_categoria INTEGER AFTER descricao,
	ADD CONSTRAINT fk_categoria_servico
    FOREIGN KEY (id_categoria)
    REFERENCES tbl_categoria(id)
    ;
    
    
ALTER TABLE tbl_proposta
ADD CONSTRAINT fk_prestacao_servico_propasta
FOREIGN KEY (id_prestacao_servico) 
REFERENCES tbl_prestacao_servico(id)
;
ALTER TABLE tbl_prestacao_servico
ADD CONSTRAINT fk_prestadores_prestacao_servico
FOREIGN KEY (id_prestador)
REFERENCES tbl_prestadores(id),
ADD CONSTRAINT fk_servico_prestacao
FOREIGN KEY (id_servico)
REFERENCES tbl_servico(id)
;
ALTER TABLE tbl_utilisadores
ADD CONSTRAINT fk_orcamento_utilisadores
FOREIGN KEY (id_utilisador)
REFERENCES tbl_orcamento(id)
;

ALTER TABLE tbl_servico
ADD CONSTRAINT fk_prestacao_servico_servico
FOREIGN KEY (id_servico)
REFERENCES tbl_prestacao_servico(id)
;

ALTER TABLE tbl_orcamento
ADD CONSTRAINT fk_prestacao_servico_orcamento
FOREIGN KEY (id_orcamento)
REFERENCES tbl_prestacao_servico(id)
;

ALTER TABLE tbl_prestadores
ADD CONSTRAINT fk_prestacao_servico_prestadores
FOREIGN KEY tbl_prestacao_servico(id)
;
ALTER TABLE tbl_prestadores
ADD COLUMN id_empresa INTEGER,
ADD CONSTRAINT fK_empresa_prestadores
FOREIGN KEY (id_empresa)
REFERENCES tbl_empresa(id)
;
ALTER TABLE tbl_prestacao_servico
ADD COLUMN id_empresa INTEGER,
ADD COLUMN tipo_prestador ENUM("EMPRESA", "particular"),
ADD CONSTRAINT fk_empresa_prestacao_servico
FOREIGN KEY (id_empresa)
REFERENCES tbl_empresa(id)
;
ALTER TABLE tbl_utilizadores
ADD COLUMN `role` ENUM("cliente", "admin", "prestador", "empresa") default "cliente"
;