import { eventEmitter } from '../event.emitter.js';
import { EVENTS } from '../event.name.js';

export const registerSendValidationEmailListener = (): void => {
    eventEmitter.on(EVENTS.USER_CREATED, (email: string) => {
        //simulation de l'envoye du mail par un console.log
        console.log(`[MAIL] Envoi du mail de validation Ã ${email}`);
    });
};