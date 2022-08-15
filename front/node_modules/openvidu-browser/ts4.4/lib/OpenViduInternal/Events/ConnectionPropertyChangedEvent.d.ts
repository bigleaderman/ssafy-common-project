import { Connection } from '../../OpenVidu/Connection';
import { Session } from '../../OpenVidu/Session';
import { Event } from './Event';
/**
 * **This feature is part of OpenVidu Pro tier** <a href="https://docs.openvidu.io/en/stable/openvidu-pro/" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-right: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif">PRO</a>
 *
 * Triggered by [[connectionPropertyChanged]]
 */
export declare class ConnectionPropertyChangedEvent extends Event {
    /**
     * The Connection whose property has changed
     */
    connection: Connection;
    /**
     * The property of the stream that changed. This value is either `"role"` or `"record"`
     */
    changedProperty: string;
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
    constructor(target: Session, connection: Connection, changedProperty: string, newValue: Object, oldValue: Object);
    /**
     * @hidden
     */
    callDefaultBehavior(): void;
}
