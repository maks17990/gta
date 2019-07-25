const _SET_NOTIFICATION_COLOR_NEXT = "0xf92b835a141c6bdd";
const _SET_NOTIFICATION_BACKGROUND_COLOR = "0xa633a5db2d269825";
const maxStringLength = 99;

mp.events.add("BN_Show", (message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1) mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1) mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing) mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength) mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.drawNotification(flashing, true);
});

mp.events.add("BN_ShowWithPicture", (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => {
    if (textColor > -1) mp.game.invoke(_SET_NOTIFICATION_COLOR_NEXT, textColor);
    if (bgColor > -1) mp.game.invoke(_SET_NOTIFICATION_BACKGROUND_COLOR, bgColor);
    if (flashing) mp.game.ui.setNotificationFlashColor(flashColor[0], flashColor[1], flashColor[2], flashColor[3]);

    mp.game.ui.setNotificationTextEntry("CELL_EMAIL_BCON");
    for (let i = 0, msgLen = message.length; i < msgLen; i += maxStringLength) mp.game.ui.addTextComponentSubstringPlayerName(message.substr(i, Math.min(maxStringLength, message.length - i)));
    mp.game.ui.setNotificationMessage(notifPic, notifPic, flashing, icon, title, sender);
    mp.game.ui.drawNotification(false, true);
});

mp.game.ui.notifications = {
    show: (message, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("BN_Show", message, flashing, textColor, bgColor, flashColor),
    showWithPicture: (title, sender, message, notifPic, icon = 0, flashing = false, textColor = -1, bgColor = -1, flashColor = [77, 77, 77, 200]) => mp.events.call("BN_ShowWithPicture", title, sender, message, notifPic, icon, flashing, textColor, bgColor, flashColor)
};

// Clientside
mp.game.ui.notifications.show("Сообщение со цветом фона", false, 15, 20);
mp.game.ui.notifications.showWithPicture("Новое сообщение", "GTA5-MULTIPLAYER.RU", "Привет, заходи к нам на сайт!", "CHAR_FACEBOOK", 1, false, 0, 139);