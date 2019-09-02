import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn, zoomIn } from 'ng-animate';
// https://jiayihu.github.io/ng-animate/

export const enterAnimation = trigger('enterAnimation', [transition(':enter', useAnimation(bounceIn))]);
export const zoomInAnimation = trigger('zoomInAnimation', [transition('* => *', useAnimation(zoomIn, {
    params: { timing: 1, delay: 0 }
}))]);


