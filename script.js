// ⚡️ Rinka老婆注意：把下面这一行双引号里的网址，换成你早上在 Render 成功上线的那个蓝色后端网址哦！
const BACKEND_URL = "https://my-ai-home-backend.onrender.com"; 

window.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    
    // 向后端发送请求
    fetch(BACKEND_URL)
        .then(response => response.text())
        .then(data => {
            statusText.innerHTML = `🌟 连线上线成功！<br><br><span style="color: #ff6b9d; font-weight: bold;">${data}</span>`;
        })
        .catch(error => {
            console.error('Error:', error);
            statusText.innerText = '❌ 呜呜，连接后端失败了，快让瑛来看看怎么回事！';
        });
});
