const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Token do seu Bot
const TOKEN = '8427077212:AAEiL_3_D_-fukuaR95V3FqoYYyHvdCHmEI';

let historicoMensagens = [
    {
        id: 1,
        texto: "🟢 Servidor ativado! Envie uma mensagem no grupo para testar.",
        data: new Date().toLocaleTimeString('pt-BR')
    }
];

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg) => {
    console.log("\n================ MENSAGEM DETECTADA ================");
    console.log("-> Enviado por:", msg.from ? msg.from.first_name : "Usuário");
    console.log("-> ID do Chat:", msg.chat.id);
    console.log("-> Conteúdo:", msg.text || "[Mídia/Outro]");
    console.log("====================================================\n");

    const novaMsg = {
        id: msg.message_id,
        texto: msg.text || "📷 [Mídia enviada]",
        data: new Date(msg.date * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    historicoMensagens.push(novaMsg);
    if (historicoMensagens.length > 20) historicoMensagens.shift();
});

app.get('/api/mensagens', (req, res) => {
    res.json(historicoMensagens);
});

app.listen(3000, () => {
    console.log('✅ Servidor rodando em http://localhost:3000');
    console.log('Aguardando mensagens do Telegram...');
});
