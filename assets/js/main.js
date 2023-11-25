class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    createError(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

    validaCPF(campo){
        let valid= true

        const cpf= new ValidaCPF(campo.value)
        if(!cpf.valida()){
            this.createError(campo, 'CPF inválido!!');
            return false
        }

        return valid
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12){
            this.createError(campo, 'Usuario precisa ter entre 3 e 12 caracteres');
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(campo, 'Usuário só pode conter letras e/ou números');
            valid = false;
        }
        return valid
    }

    isValid(){

        let valid = true;

        for(let errortext of this.formulario.querySelectorAll('.error-text')){
            errortext.remove()
        }

        for (let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;

            if(!campo.value){
                this.createError(campo, `O campo ${label} não pode estar vazio!`)
                valid = false;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }

        }
        return valid
    }
    
    passworldIsValid(){
        let valid = true

        const senha = this.formulario.querySelector('.senha')
        const repetirSenha = this.formulario.querySelector('.repetir-senha')
        
        if(senha.value.length < 6 || senha.value.length > 12){
            this.createError(senha, 'senha precisa ter entre 6 e 12 caracteres')
            valid = false
        }

        if(senha.value !== repetirSenha.value){
            this.createError(senha, 'As senhas tem que ser iguais')
            this.createError(repetirSenha, 'As senhas tem que ser iguais')
            valid= false
        }

        return valid

    }
    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.isValid();
        const senhasValidas = this.passworldIsValid();
        console.log(camposValidos)
        console.log(senhasValidas)


        if(camposValidos && senhasValidas) {
            alert('Formulário enviado.');
            this.formulario.submit();
        }
        
    }
    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        })
    }
}

const valida = new ValidaFormulario();