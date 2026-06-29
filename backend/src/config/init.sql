CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Aluno (
    id_aluno SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    matricula VARCHAR(100) UNIQUE NOT NULL
);

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
