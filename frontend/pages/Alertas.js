document.getElementById('formChamado').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            
            try {
                const response = await fetch('http://localhost:5000/api/chamados', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                document.getElementById('resultado').innerHTML = 
                    `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            } catch (error) {
                document.getElementById('resultado').innerHTML = 
                    `<p style="color:red">Erro: ${error.message}</p>`;
            }
});