CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Aluno (
    id_aluno SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario) ON DELETE SET NULL,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    matricula VARCHAR(100) UNIQUE NOT NULL
);

ALTER TABLE Aluno
    ADD COLUMN IF NOT EXISTS id_usuario INT REFERENCES Usuario(id_usuario) ON DELETE SET NULL;

ALTER TABLE Aluno
    ADD COLUMN IF NOT EXISTS nome VARCHAR(255);

ALTER TABLE Aluno
    ADD COLUMN IF NOT EXISTS email VARCHAR(255);

ALTER TABLE Aluno
    ALTER COLUMN id_usuario DROP NOT NULL;

UPDATE Aluno a
SET nome = u.nome
FROM Usuario u
WHERE a.id_usuario = u.id_usuario
  AND a.nome IS NULL;

UPDATE Aluno a
SET email = u.email
FROM Usuario u
WHERE a.id_usuario = u.id_usuario
  AND a.email IS NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'aluno_email_key'
    ) THEN
        ALTER TABLE Aluno ADD CONSTRAINT aluno_email_key UNIQUE (email);
    END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS usuario_email_lower_key
ON Usuario (LOWER(email));

CREATE UNIQUE INDEX IF NOT EXISTS aluno_email_lower_key
ON Aluno (LOWER(email))
WHERE email IS NOT NULL;

CREATE TABLE IF NOT EXISTS Disciplina (
    id_disciplina SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    creditos INT NOT NULL,
    departamento VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Turma (
    id_turma SERIAL PRIMARY KEY,
    id_disciplina INT NOT NULL REFERENCES Disciplina(id_disciplina) ON DELETE CASCADE,
    codigo_turma VARCHAR(50) NOT NULL,
    periodo_letivo VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Pre_Matricula (
    id_pre_matricula SERIAL PRIMARY KEY,
    id_aluno INT NOT NULL REFERENCES Aluno(id_aluno) ON DELETE CASCADE,
    id_turma INT NOT NULL REFERENCES Turma(id_turma) ON DELETE CASCADE,
    data_solicitacao DATE DEFAULT CURRENT_DATE,
    UNIQUE(id_aluno, id_turma)
);

INSERT INTO Usuario (nome, email, senha, tipo_usuario)
VALUES (
    'admin1',
    'admin1@admin.com',
    '$2b$10$W7F3mu4AEwfELtJfJAogZOTuPOA8fAGnc8/DZA1woZloRcvI0YBDq',
    1
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO Usuario (nome, email, senha, tipo_usuario)
VALUES
(
    'Ana Souza',
    '202210561@uesb.edu.br',
    '$2b$10$W7F3mu4AEwfELtJfJAogZOTuPOA8fAGnc8/DZA1woZloRcvI0YBDq',
    2
),
(
    'Carlos Oliveira',
    '202310845@uesb.edu.br',
    '$2b$10$W7F3mu4AEwfELtJfJAogZOTuPOA8fAGnc8/DZA1woZloRcvI0YBDq',
    2
),
(
    'Mariana Santos',
    '202410921@uesb.edu.br',
    '$2b$10$W7F3mu4AEwfELtJfJAogZOTuPOA8fAGnc8/DZA1woZloRcvI0YBDq',
    2
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO Aluno (id_usuario, nome, email, matricula)
SELECT
    id_usuario,
    nome,
    email,
    matricula
FROM (
    SELECT
        id_usuario,
        nome,
        email,
        '202210561' AS matricula
    FROM Usuario
    WHERE email = '202210561@uesb.edu.br'

    UNION ALL

    SELECT
        id_usuario,
        nome,
        email,
        '202310845' AS matricula
    FROM Usuario
    WHERE email = '202310845@uesb.edu.br'

    UNION ALL

    SELECT
        id_usuario,
        nome,
        email,
        '202410921' AS matricula
    FROM Usuario
    WHERE email = '202410921@uesb.edu.br'

) AS alunos
ON CONFLICT (matricula) DO NOTHING;


INSERT INTO Disciplina
(codigo, nome, creditos, departamento)
VALUES
(
    'COMP101',
    'Programação I',
    4,
    'Departamento de Ciências Exatas e da Terra (DCET)'
),
(
    'COMP202',
    'Banco de Dados',
    4,
    'Departamento de Ciências Exatas e da Terra (DCET)'
),
(
    'COMP303',
    'Desenvolvimento Web',
    4,
    'Departamento de Ciências Exatas e da Terra (DCET)'
),
(
    'COMP404',
    'Engenharia de Software',
    3,
    'Departamento de Ciências Exatas e da Terra (DCET)'
)
ON CONFLICT (codigo) DO NOTHING;


INSERT INTO Turma
(id_disciplina, codigo_turma, periodo_letivo)

SELECT
    id_disciplina,
    codigo_turma,
    periodo_letivo
FROM (

    SELECT
        id_disciplina,
        'T01' AS codigo_turma,
        '2026.1' AS periodo_letivo
    FROM Disciplina
    WHERE codigo = 'COMP101'


    UNION ALL


    SELECT
        id_disciplina,
        'T01',
        '2026.1'
    FROM Disciplina
    WHERE codigo = 'COMP202'


    UNION ALL


    SELECT
        id_disciplina,
        'T02',
        '2026.1'
    FROM Disciplina
    WHERE codigo = 'COMP303'


    UNION ALL


    SELECT
        id_disciplina,
        'T01',
        '2026.1'
    FROM Disciplina
    WHERE codigo = 'COMP404'

) AS turmas;