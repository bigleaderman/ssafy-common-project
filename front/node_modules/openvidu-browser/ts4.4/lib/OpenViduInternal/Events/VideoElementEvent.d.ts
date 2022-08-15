import { Event } from './Event';
import { StreamManager } from '../../OpenVidu/StreamManager';
/**
 * Triggered by:
 * - [[videoElementCreated]]
 * - [[videoElementDestroyed]]
 */
export declare class VideoElementEvent extends Event {
    /**
     * Video element that was created or destroyed
     */
    element: HTMLVideoElement;
    /**
     * @hidden
     */
    constructor(element: HTMLVideoElement, target: StreamManager, type: string);
    /**
     * @hidden
     */
    callDefaultBehavior(): void;
}
