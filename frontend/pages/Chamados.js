document.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await fetch('/api/chamados');
                const { success, data: chamados } = await response.json();
                
                if (!success) throw new Error('Erro ao carregar chamados');
                
                const container = document.getElementById('chamados-container');
                
                if (chamados.length === 0) {
                    container.innerHTML = '<p>Nenhum chamado encontrado.</p>';
                    return;
                }
                
                container.innerHTML = chamados.map(chamado => `
                    <div class="chamado-card status-${chamado.status}">
                        <h3>${chamado.rua}, ${chamado.bairro}</h3>
                        <p>${chamado.relato}</p>
                        <p><strong>Status:</strong> ${formatStatus(chamado.status)}</p>
                        <p><small>Criado em: ${new Date(chamado.criadoEm).toLocaleString()}</small></p>
                        
                        ${chamado.midia ? `
                            <div>
                                <strong>Mídia:</strong><br>
                                ${chamado.midia.endsWith('.mp4') ? 
                                    `<video controls class="midia-preview">
                                        <source src="/${chamado.midia}" type="video/mp4">
                                    </video>` : 
                                    `<img src="/${chamado.midia}" class="midia-preview">`}
                            </div>
                        ` : ''}
                        
                        <div class="mt-3">
                            <button onclick="atualizarStatus('${chamado._id}', 'atendido')" 
                                    class="btn btn-success btn-sm ${chamado.status === 'atendido' ? 'disabled' : ''}">
                                Marcar como Atendido
                            </button>
                            <button onclick="atualizarStatus('${chamado._id}', 'nao-atendido')" 
                                    class="btn btn-danger btn-sm ms-2 ${chamado.status === 'nao-atendido' ? 'disabled' : ''}">
                                Marcar como Não Atendido
                            </button>
                        </div>
                    </div>
                `).join('');
                
            } catch (error) {
                console.error('Erro:', error);
                document.getElementById('chamados-container').innerHTML = 
                    `<div class="alert alert-danger">Erro ao carregar chamados: ${error.message}</div>`;
            }
        });
        
        function formatStatus(status) {
            const statusMap = {
                'pendente': 'Pendente',
                'atendido': 'Atendido',
                'nao-atendido': 'Não Atendido'
            };
            return statusMap[status] || status;
        }
        
        async function atualizarStatus(id, novoStatus) {
            try {
                const response = await fetch(`/api/chamados/${id}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: novoStatus })
                });
                
                const { success } = await response.json();
                
                if (success) {
                    location.reload(); // Recarrega a página para ver as atualizações
                } else {
                    alert('Erro ao atualizar status');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao atualizar status');
            }
        }