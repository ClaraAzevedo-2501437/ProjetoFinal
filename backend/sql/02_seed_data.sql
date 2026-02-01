-- Seed Data for Development and Testing
-- Note: Passwords are hashed using bcrypt with 10 rounds
SET CLIENT_ENCODING TO 'UTF8';

-- Insert sample professors (password for all: "password123")
INSERT INTO docente (nome, email, password_hash, role) VALUES
('Dr. João Silva', 'joao.silva@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq', 'DOCENTE'),
('Dr. Maria Santos', 'maria.santos@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq', 'DOCENTE'),
('Dr. Pedro Costa', 'pedro.costa@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq', 'DOCENTE'),
('Dr. Ana Rodrigues', 'ana.rodrigues@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq', 'DOCENTE');

-- Insert admin user (password: "admin123")
INSERT INTO docente (nome, email, password_hash, role) VALUES
('Admin Sistema', 'admin@university.edu', '$2b$10$vDDRO8ZyTmKz5MtVSXYTbeoCVLTbx.8gcFUnBgLCaU0BJV22QwRLm', 'ADMIN');

-- Insert sample keywords
INSERT INTO palavra_chave (palavra) VALUES
('Machine Learning'),
('Web Development'),
('Data Science'),
('Artificial Intelligence'),
('Mobile Development'),
('Cloud Computing'),
('Cybersecurity'),
('IoT'),
('Blockchain'),
('Computer Vision');

-- Insert sample proposals
INSERT INTO proposta (titulo, descricao_objetivos, id_orientador) VALUES
(
    'Sistema de Recomendação Baseado em IA',
    'Desenvolver um sistema de recomendação utilizando algoritmos de machine learning para melhorar a experiência do usuário em plataformas de e-commerce.',
    1
),
(
    'Aplicação Web para Gestão de Projetos',
    'Criar uma aplicação web moderna utilizando Vue.js e Node.js para gestão colaborativa de projetos em equipas de desenvolvimento.',
    2
),
(
    'Análise de Sentimentos em Redes Sociais',
    'Implementar uma ferramenta de análise de sentimentos utilizando processamento de linguagem natural para avaliar opiniões em redes sociais.',
    3
);

-- Insert sample students
INSERT INTO aluno (nome, email, numero, id_proposta) VALUES
('Carlos Mendes', 'carlos.mendes@student.edu', '2021001', 1),
('Sofia Ferreira', 'sofia.ferreira@student.edu', '2021002', 2),
('Miguel Oliveira', 'miguel.oliveira@student.edu', '2021003', NULL),
('Beatriz Almeida', 'beatriz.almeida@student.edu', '2021004', NULL);

-- Insert co-advisors for proposals
INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES
(1, 4),  -- Proposal 1 has Dr. Ana as co-advisor
(2, 1);  -- Proposal 2 has Dr. João as co-advisor

-- Insert keywords for proposals
INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES
(1, 1),  -- Proposal 1: Machine Learning
(1, 4),  -- Proposal 1: Artificial Intelligence
(2, 2),  -- Proposal 2: Web Development
(3, 1),  -- Proposal 3: Machine Learning
(3, 3);  -- Proposal 3: Data Science
