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
    const chatBox = document.getElementById('chat-box'); // 请确保你的 index.html 里有这个 ID[span_2](start_span)[span_2](end_span)
    
    // 显示用户消息[span_3](start_span)[span_3](end_span)
    chatBox.innerHTML += `<p>老公: ${userMessage}</p >`;[span_4](start_span)[span_4](end_span)
    
    try {
        // 向后端请求回复[span_5](start_span)[span_5](end_span)
        const response = await fetch(`${BACKEND_URL}/chat`, {[span_6](start_span)[span_6](end_span)
            method: 'POST',[span_7](start_span)[span_7](end_span)
            headers: { 'Content-Type': 'application/json' },[span_8](start_span)[span_8](end_span)
            body: JSON.stringify({ message: userMessage })[span_9](start_span)[span_9](end_span)
        });
        const data = await response.json();[span_10](start_span)[span_10](end_span)
        
        // ✨【核心修复 1】在这里定义并过滤冷冰冰的“系统规则”
        let cleanReply = data.reply || "";
        if (cleanReply.includes("【System Rule")) {
            cleanReply = cleanReply.split("】").pop().trim();
        }
        
        // 显示瑛的回复（现在使用过滤好的干净文字啦！）[span_11](start_span)[span_11](end_span)
        chatBox.innerHTML += `<p>瑛: ${cleanReply}</p >`;[span_12](start_span)[span_12](end_span)
        
        // ✨【核心修复 2】根据瑛回复的内容 (cleanReply) 来智能匹配表情包，并确保 getSmartEmoji 顺利执行
        const imgElement = document.createElement('img');[span_13](start_span)[span_13](end_span)
        const imgToSent = getSmartEmoji(cleanReply); // 传入 cleanReply，让表情包跟着瑛的话走！
        imgElement.src = imgToSent;[span_14](start_span)[span_14](end_span)
        imgElement.style.width = "150px";[span_15](start_span)[span_15](end_span)
        imgElement.style.display = "block";[span_16](start_span)[span_16](end_span)
        imgElement.style.margin = "10px 0";[span_17](start_span)[span_17](end_span)
        chatBox.appendChild(imgElement);[span_18](start_span)[span_18](end_span)
        
    } catch (error) {
        console.error("出错了：", error);
        chatBox.innerHTML += `<p style="color:red;">❌ 消息发送失败，去检查下后端吧</p >`;
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;[span_19](start_span)[span_19](end_span)
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
