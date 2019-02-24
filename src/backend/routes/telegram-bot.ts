import TgBotApi from 'node-telegram-bot-api';
import * as Config from '@app/config';
import { Log } from '@modules/debug';
import { User} from '@models/user';

export const TgBot = new TgBotApi(Config.TgBotToken);

// @FIXME: I wonder whether we have to close webhook manually.
void TgBot
    .setWebHook(Config.TgBotWebookFullUrl, { allowed_updates: ['message']})
    .then(() => Log.info('Telegram bot webhook set'));


TgBot.onText(/\/start/, async msg => {
    const user = await User.findOne({tgName: msg.chat.username}).exec();
    if (user != null) {
        user.notification = true;
        user.tgChatId = msg.chat.id;
        await user.save();
        await TgBot.sendMessage(msg.chat.id, 'Wellcome to eco-help.');
    } else{
        await TgBot.sendMessage(msg.chat.id, 'Please register at the site.', {parse_mode: 'Markdown'});
    }

});

TgBot.onText(/\/stop/, async msg => {
    const user = await User.findOne({tgName: msg.chat.username}).exec();
    if(user == null){
        await TgBot.sendMessage(msg.chat.id, 'Please register at the site.', {parse_mode: 'Markdown'});
        return;
    }
    user.notification = false;
    await user.save();
    await TgBot.sendMessage(msg.chat.id, 'Goodbye ;(');
});

export async function sendNotification(chatId: number, message: string){
    await TgBot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
}

