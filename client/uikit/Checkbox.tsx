import * as React from "react";
import * as classNames from "classnames";

import * as styles from "./Checkbox.scss";

export const CheckboxStyles = {
    small: styles.small,
};

type Props = {
    className?: string;
    value: boolean;
    onToggle: () => void;
    label?: string;
};

export class Checkbox extends React.Component<Props> {
    render() {
        const { className, value, onToggle, label } = this.props;
        return (
            <div className={classNames(styles.checkbox, className, { [styles.on]: value, [styles.withLabel]: label })}>
                {label && <span>{label}</span>}
                <input type="checkbox" checked={value} onChange={onToggle} />
            </div>
        );
    }
}
