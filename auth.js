// Arquivo: auth.js

// Função para registrar um novo usuário
export function registrarUsuario(nickname, senha) {
    if (!nickname || !senha) {
        console.error('Nickname e senha são obrigatórios.');
        return;
    }

    // Simula armazenamento em localStorage (ou pode ser alterado para backend futuramente)
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o nickname já existe
    if (usuarios.some(usuario => usuario.nickname === nickname)) {
        alert('Este nickname já está em uso. Escolha outro.');
        return;
    }

    // Adiciona novo usuário ao "banco de dados" local
    usuarios.push({ nickname, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário registrado com sucesso!');

    console.log('Usuários registrados:', usuarios);
}

// Função de autenticação do usuário
export function autenticarUsuario(nickname, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Busca o usuário no "banco de dados" local
    const usuario = usuarios.find(u => u.nickname === nickname && u.senha === senha);

    if (usuario) {
        alert('Autenticação bem-sucedida! Bem-vindo, ' + nickname);
        return true;
    } else {
        alert('Falha na autenticação. Verifique seu nickname e senha.');
        return false;
    }
}

// Função para obter a lista de usuários (apenas para debugging ou desenvolvimento)
export function listarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Lista de usuários registrados:', usuarios);
    return usuarios;
}

// Função para remover um usuário
export function removerUsuario(nickname) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Filtra usuários para remover o especificado
    const novoUsuarios = usuarios.filter(usuario => usuario.nickname !== nickname);

    if (usuarios.length === novoUsuarios.length) {
        alert('Usuário não encontrado. Nenhuma ação realizada.');
        return;
    }

    localStorage.setItem('usuarios', JSON.stringify(novoUsuarios));
    alert(`Usuário ${nickname} removido com sucesso.`);

    console.log('Usuários restantes:', novoUsuarios);
}

export function verificarLogin() {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
        return true;
    } else {
        alert("Você precisa estar logado para jogar!");
        return false;
    }
}

export function login(usuario) {
    localStorage.setItem("usuario", usuario);
    alert(`Bem-vindo, ${usuario}!`);
}

export function logout() {
    localStorage.removeItem("usuario");
    alert("Logout realizado com sucesso!");
}
