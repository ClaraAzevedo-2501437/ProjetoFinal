-- ============================================
-- Dados de Teste Adicionais para Casos de Uso
-- ============================================
-- Este ficheiro adiciona mais dados para testar todos os casos de uso do sistema

-- Adicionar mais docentes para testar coorientações
INSERT INTO docente (nome, email, password_hash) VALUES
('Ana Costa', 'ana.costa@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq'),
('Pedro Martins', 'pedro.martins@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq'),
('Rita Ferreira', 'rita.ferreira@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq'),
('Carlos Sousa', 'carlos.sousa@university.edu', '$2b$10$RFVtWynKJ3qGDOSOkkpQpeF3/8fZRnd04AdMJ1..BgE9PS8ZKOnyq');

-- Adicionar mais propostas com diferentes características
-- Proposta sem coorientadores (do João Silva)
INSERT INTO proposta (titulo, descricao_objetivos, id_orientador) VALUES
('Sistema de Gestão de Inventário', 
 'Desenvolvimento de um sistema web para gestão de inventário empresarial. Objetivos: criar interface intuitiva, implementar controlo de stock em tempo real, gerar relatórios automáticos e integrar com sistemas ERP existentes.',
 1);

-- Proposta com 1 coorientador (da Maria Santos)
INSERT INTO proposta (titulo, descricao_objetivos, id_orientador) VALUES
('Aplicação Móvel para Saúde Mental',
 'Criar uma aplicação móvel para monitorização e suporte à saúde mental. Incluirá exercícios de mindfulness, registo de humor diário, dicas personalizadas e conexão com profissionais de saúde.',
 2);

-- Proposta com múltiplos coorientadores (do Pedro Oliveira)
INSERT INTO proposta (titulo, descricao_objetivos, id_orientador) VALUES
('Plataforma IoT para Smart Cities',
 'Desenvolvimento de uma plataforma IoT para gestão inteligente de recursos urbanos. Integração de sensores, análise de dados em tempo real, dashboard de visualização e sistema de alertas automáticos.',
 3);

-- Proposta da Ana Costa (nova docente)
INSERT INTO proposta (titulo, descricao_objetivos, id_orientador) VALUES
('Sistema de Recomendação com Machine Learning',
 'Implementação de um sistema de recomendação utilizando algoritmos de ML. Análise de comportamento do utilizador, collaborative filtering, deep learning e avaliação de métricas de performance.',
 5);

-- Proposta do Pedro Martins
INSERT INTO proposta (titulo, descricao_objetivos, id_orientador) VALUES
('Blockchain para Cadeia de Fornecimento',
 'Aplicação de tecnologia blockchain para rastreabilidade na cadeia de fornecimento. Smart contracts, transparência de transações, verificação de autenticidade e redução de fraudes.',
 6);

-- Proposta da Rita Ferreira
INSERT INTO proposta (titulo, descricao_objetivos, id_orientador) VALUES
('Chatbot com Processamento de Linguagem Natural',
 'Desenvolvimento de um chatbot inteligente usando NLP. Compreensão de contexto, respostas personalizadas, integração com bases de conhecimento e aprendizagem contínua.',
 7);

-- Adicionar coorientadores às propostas
-- Proposta 5 (Maria Santos) com Ana Costa como coorientadora
INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES (5, 5);

-- Proposta 6 (Pedro Oliveira) com João Silva e Maria Santos como coorientadores
INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES (6, 1);
INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES (6, 2);

-- Proposta 7 (Ana Costa) com Rita Ferreira como coorientadora
INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES (7, 7);

-- Proposta 8 (Pedro Martins) com Carlos Sousa e Ana Costa como coorientadores
INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES (8, 8);
INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES (8, 5);

-- Adicionar mais palavras-chave
INSERT INTO palavra_chave (palavra) VALUES
('Gestão'),
('Inventário'),
('ERP'),
('Saúde Mental'),
('Aplicação Móvel'),
('Mindfulness'),
('IoT'),
('Smart Cities'),
('Sensores'),
('Machine Learning'),
('Sistema de Recomendação'),
('Deep Learning'),
('Blockchain'),
('Smart Contracts'),
('Cadeia de Fornecimento'),
('Chatbot'),
('NLP'),
('Processamento de Linguagem');

-- Associar palavras-chave às novas propostas
-- Proposta 4: Sistema de Gestão de Inventário
INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES 
(4, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Gestão')),
(4, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Inventário')),
(4, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'ERP')),
(4, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Web'));

-- Proposta 5: Aplicação Móvel para Saúde Mental
INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES 
(5, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Saúde Mental')),
(5, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Aplicação Móvel')),
(5, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Mindfulness'));

-- Proposta 6: Plataforma IoT para Smart Cities
INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES 
(6, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'IoT')),
(6, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Smart Cities')),
(6, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Sensores')),
(6, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Data Science'));

-- Proposta 7: Sistema de Recomendação com Machine Learning
INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES 
(7, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Machine Learning')),
(7, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Sistema de Recomendação')),
(7, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Deep Learning')),
(7, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Python'));

-- Proposta 8: Blockchain para Cadeia de Fornecimento
INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES 
(8, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Blockchain')),
(8, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Smart Contracts')),
(8, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Cadeia de Fornecimento'));

-- Proposta 9: Chatbot com Processamento de Linguagem Natural
INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES 
(9, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Chatbot')),
(9, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'NLP')),
(9, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Processamento de Linguagem')),
(9, (SELECT id_palavra FROM palavra_chave WHERE palavra = 'Python'));

-- Adicionar mais alunos
INSERT INTO aluno (nome, email, numero) VALUES
('Sofia Rodrigues', 'sofia.rodrigues@student.university.edu', '20220002'),
('Miguel Alves', 'miguel.alves@student.university.edu', '20220003'),
('Beatriz Carvalho', 'beatriz.carvalho@student.university.edu', '20220004'),
('Gonçalo Pereira', 'goncalo.pereira@student.university.edu', '20220005'),
('Inês Ribeiro', 'ines.ribeiro@student.university.edu', '20220006');

-- Associar alunos a propostas
UPDATE aluno SET id_proposta = 4 WHERE numero = '20220002';  -- Sofia -> Inventário
UPDATE aluno SET id_proposta = 5 WHERE numero = '20220003';  -- Miguel -> Saúde Mental
UPDATE aluno SET id_proposta = 7 WHERE numero = '20220004';  -- Beatriz -> ML
-- Gonçalo e Inês ficam sem proposta (disponíveis)

-- ============================================
-- RESUMO DOS DADOS DE TESTE
-- ============================================

-- DOCENTES (8 total):
-- ID 1: João Silva (joao.silva@university.edu) - 2 propostas (IA e Inventário)
-- ID 2: Maria Santos (maria.santos@university.edu) - 2 propostas (E-commerce e Saúde Mental)
-- ID 3: Pedro Oliveira (pedro.oliveira@university.edu) - 2 propostas (Learning e IoT)
-- ID 4: Teresa Fernandes (teresa.fernandes@university.edu) - 0 propostas
-- ID 5: Ana Costa (ana.costa@university.edu) - 1 proposta (ML)
-- ID 6: Pedro Martins (pedro.martins@university.edu) - 1 proposta (Blockchain)
-- ID 7: Rita Ferreira (rita.ferreira@university.edu) - 1 proposta (Chatbot)
-- ID 8: Carlos Sousa (carlos.sousa@university.edu) - 0 propostas

-- PROPOSTAS (9 total):
-- ID 1: Sistema de IA (João) - 2 coorientadores, 1 aluno, 4 palavras-chave
-- ID 2: E-commerce (Maria) - 1 coorientador, 0 alunos, 4 palavras-chave
-- ID 3: Learning Platform (Pedro) - 2 coorientadores, 0 alunos, 3 palavras-chave
-- ID 4: Inventário (João) - 0 coorientadores, 1 aluno, 4 palavras-chave
-- ID 5: Saúde Mental (Maria) - 1 coorientador, 1 aluno, 3 palavras-chave
-- ID 6: IoT Smart Cities (Pedro) - 2 coorientadores, 0 alunos, 4 palavras-chave
-- ID 7: ML Recomendação (Ana) - 1 coorientador, 1 aluno, 4 palavras-chave
-- ID 8: Blockchain (Pedro M.) - 2 coorientadores, 0 alunos, 3 palavras-chave
-- ID 9: Chatbot NLP (Rita) - 0 coorientadores, 0 alunos, 4 palavras-chave

-- ALUNOS (6 total):
-- 3 com propostas atribuídas
-- 3 sem proposta (disponíveis para atribuição)

-- CREDENCIAIS DE LOGIN:
-- Todos os docentes: password123
-- Emails: [nome].[apelido]@university.edu
