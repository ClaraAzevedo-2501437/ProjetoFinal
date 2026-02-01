-- Database Schema for Project Proposal Management System
-- Drop tables if they exist (for clean re-runs)
DROP TABLE IF EXISTS proposta_palavra_chave CASCADE;
DROP TABLE IF EXISTS proposta_coorientador CASCADE;
DROP TABLE IF EXISTS aluno CASCADE;
DROP TABLE IF EXISTS proposta CASCADE;
DROP TABLE IF EXISTS palavra_chave CASCADE;
DROP TABLE IF EXISTS docente CASCADE;

-- Table: docente (Professor)
CREATE TABLE docente (
    id_docente SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: palavra_chave (Keyword)
CREATE TABLE palavra_chave (
    id_palavra SERIAL PRIMARY KEY,
    palavra VARCHAR(100) NOT NULL UNIQUE
);

-- Table: proposta (Project Proposal)
CREATE TABLE proposta (
    id_proposta SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao_objetivos TEXT NOT NULL,
    id_orientador INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orientador FOREIGN KEY (id_orientador) 
        REFERENCES docente(id_docente) ON DELETE CASCADE
);

-- Table: aluno (Student)
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    numero VARCHAR(50) NOT NULL UNIQUE,
    id_proposta INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_proposta FOREIGN KEY (id_proposta) 
        REFERENCES proposta(id_proposta) ON DELETE SET NULL
);

-- Table: proposta_coorientador (Proposal Co-Advisor - Many-to-Many)
CREATE TABLE proposta_coorientador (
    id_proposta INTEGER NOT NULL,
    id_docente INTEGER NOT NULL,
    PRIMARY KEY (id_proposta, id_docente),
    CONSTRAINT fk_proposta_co FOREIGN KEY (id_proposta) 
        REFERENCES proposta(id_proposta) ON DELETE CASCADE,
    CONSTRAINT fk_docente_co FOREIGN KEY (id_docente) 
        REFERENCES docente(id_docente) ON DELETE CASCADE
);

-- Table: proposta_palavra_chave (Proposal Keywords - Many-to-Many)
CREATE TABLE proposta_palavra_chave (
    id_proposta INTEGER NOT NULL,
    id_palavra INTEGER NOT NULL,
    PRIMARY KEY (id_proposta, id_palavra),
    CONSTRAINT fk_proposta_kw FOREIGN KEY (id_proposta) 
        REFERENCES proposta(id_proposta) ON DELETE CASCADE,
    CONSTRAINT fk_palavra_kw FOREIGN KEY (id_palavra) 
        REFERENCES palavra_chave(id_palavra) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_proposta_orientador ON proposta(id_orientador);
CREATE INDEX idx_aluno_proposta ON aluno(id_proposta);
CREATE INDEX idx_proposta_co_proposta ON proposta_coorientador(id_proposta);
CREATE INDEX idx_proposta_co_docente ON proposta_coorientador(id_docente);
CREATE INDEX idx_proposta_kw_proposta ON proposta_palavra_chave(id_proposta);
CREATE INDEX idx_proposta_kw_palavra ON proposta_palavra_chave(id_palavra);
