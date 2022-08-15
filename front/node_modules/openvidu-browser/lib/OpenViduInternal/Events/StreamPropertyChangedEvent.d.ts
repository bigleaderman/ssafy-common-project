import { Event } from './Event';
import { Session } from '../../OpenVidu/Session';
import { Stream } from '../../OpenVidu/Stream';
import { StreamManager } from '../../OpenVidu/StreamManager';
/**
 * Triggered by `streamPropertyChanged` (available for [Session](/en/stable/api/openvidu-browser/interfaces/SessionEventMap.html#streamPropertyChanged) and [StreamManager](/en/stable/api/openvidu-browser/interfaces/StreamManagerEventMap.html#streamPropertyChanged) objects)
 */
export declare class StreamPropertyChangedEvent extends Event {
    /**
     * The Stream whose property has changed. You can always identify the user publishing the changed stream by consulting property [[Stream.connection]]
     */
    stream: Stream;
    /**
     * The property of the stream that changed. This value is either `"videoActive"`, `"audioActive"`, `"videoDimensions"` or `"filter"`
     */
    changedProperty: string;
    /**
     * Cause of the change on the stream's property:
     * - For `videoActive`: `"publishVideo"`
     * - For `audioActive`: `"publishAudio"`
     * - For `videoDimensions`: `"deviceRotated"`, `"screenResized"` or `"trackReplaced"`
     * - For `filter`: `"applyFilter"`, `"execFilterMethod"` or `"removeFilter"`
     */
    reason: string;
    /**
     * New value of the property (after change, current value)
     */
    newValue: Object;
    /**
     * Previous value of the property (before change)
     */
    oldValue: Object;
    /**
     * @hidden
     */
    constructor(target: Session | StreamManager, stream: Stream, changedProperty: string, newValue: Object, oldValue: Object, reason: string);
    /**
     * @hidden
     */
    callDefaultBehavior(): void;
}
