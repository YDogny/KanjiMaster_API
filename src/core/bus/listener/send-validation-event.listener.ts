import { eventEmitter } from '../event.emitter.js';
import { EVENTS } from '../event.name.js';

export const envoiMailListener = (): void => {
    eventEmitter.on(EVENTS.USER_CREATED, (email: string) => {
        console.log(`[MAIL] Email envoyé à: ${email}`);
    });
};