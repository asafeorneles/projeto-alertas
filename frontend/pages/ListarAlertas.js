async function carregarAlertas(filtro = {}) {
            try {
                const response = await fetch('/api/alertas');
                const { data } = await response.json();
                
                const lista = document.getElementById('lista-alertas');
                lista.innerHTML = data.map(alerta => `
                    <div class="alerta ${alerta.gravidade}">
                        <h3>${alerta.tipo.toUpperCase()} - ${alerta.localizacao.bairro}</h3>
                        <p>${alerta.descricao}</p>
                        <p><strong>Gravidade:</strong> ${alerta.gravidade}</p>
                        ${alerta.imagem ? `<img src="/uploads/${alerta.imagem}" alt="Imagem do alerta">` : ''}
                        <small>${new Date(alerta.criadoEm).toLocaleString()}</small>
                    </div>
                `).join('');
            } catch (error) {
                console.error('Erro ao carregar alertas:', error);
                document.getElementById('lista-alertas').innerHTML = 
                    '<p style="color:red">Erro ao carregar alertas</p>';
            }
        }

        // Filtros
        document.getElementById('btn-atualizar').addEventListener('click', () => {
            const gravidade = document.getElementById('filtro-gravidade').value;
            carregarAlertas(gravidade ? { gravidade } : {});
        });

        // Carrega os alertas quando a página é aberta
        window.addEventListener('DOMContentLoaded', carregarAlertas);