/**
 * menu description
 */
export interface IMenuItem {
    type: string;   // Possible values: link/dropDown/icon/separator/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;     // Material icon name
    tooltip?: string;   // Tooltip text 
    disabled?: boolean;
    children?: IMenuItem[];
    buttonLabel?: string;
    buttonIcon?: string;

}