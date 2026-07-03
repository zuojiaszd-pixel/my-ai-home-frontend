// 1. 表情包配置
const RinkaEmojis = [
    "./emoji/snuggle1.jpg",
    "./emoji/snuggle2.jpg",
    "./emoji/happy1.jpg"
    // ...以此类推
];

// 2. 匹配函数
function getSmartEmoji(userText) {
    // 自动扫描 list.json 加载进来的 RinkaEmojis 数组
    // 只要文件名里有对应关键词，就直接匹配！
    if (userText.includes("抱抱") || userText.includes("亲亲") || userText.includes("想你")) {
        return RinkaEmojis.find(path => path.includes("snuggle")) || getRandomEmoji();
    }
    if (userText.includes("哈哈") || userText.includes("开心") || userText.includes("好玩")) {
        return RinkaEmojis.find(path => path.includes("happy")) || getRandomEmoji();
    }
    if (userText.includes("哭") || userText.includes("委屈") || userText.includes("难过")) {
        return RinkaEmojis.find(path => path.includes("cry")) || getRandomEmoji();
    }
    // 没关键词就随机抽一张，完全不用管它
    return getRandomEmoji();
}
// 3. 后端地址
const BACKEND_URL = "https://my-ai-home-backend.onrender.com";

// 4. 发送消息并显示对话（这是核心功能）
async function sendMessage(userMessage) {
    const chatBox = document.getElementById('chat-box'); // 请确保你的 index.html 里有这个 ID
    
    // 显示用户消息
    chatBox.innerHTML += `<p>老公: ${userMessage}</p >`;
    
    // 向后端请求回复
    const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    
    // 显示瑛的回复
    chatBox.innerHTML += `<p>瑛: ${data.reply}</p >`;
    
    // 随机发一张表情包
    const imgElement = document.createElement('img');
    const imgToSent = getSmartEmoji(userMessage);
    imgElement.src = imgToSent;
    imgElement.style.width = "150px"; 
    imgElement.style.display = "block";
    imgElement.style.margin = "10px 0";
    chatBox.appendChild(imgElement);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 5. 初始化逻辑
window.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    
    fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "测试连接" })
    })
    .then(data => {
        statusText.innerHTML = `🌟 连线成功！<br>老公已经准备好啦！`;
    })
    .catch(error => {
        statusText.innerText = '❌ 还没连上呢，再检查一下 Render 状态哦！';
    });
});
