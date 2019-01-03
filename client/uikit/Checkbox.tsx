import * as React from "react";
import * as classNames from "classnames";

import * as styles from "./Checkbox.scss";

type Props = {
    value: boolean;
    onToggle: () => void;
    label?: string;
};

export class Checkbox extends React.Component<Props> {
    render() {
        const { value, onToggle, label } = this.props;
        return (
            <div className={classNames(styles.checkbox, { [styles.on]: value, [styles.withLabel]: label })}>
                {label && <span>{label}</span>}
                <input type="checkbox" checked={value} onChange={onToggle} />
            </div>
        );
    }
}
